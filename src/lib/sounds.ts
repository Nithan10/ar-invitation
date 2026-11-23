/**
 * Sound effects for the envelope opening (Web Audio API).
 *
 * Real recordings (public domain, Wikimedia Commons), trimmed for this page:
 *  - public/sounds/seal-crack.wav  — from "Snapping twig" by stephan: a light
 *    pre-crack, then the main splintering snap 0.25s later.
 *  - public/sounds/flash-chime.wav — from "Windchimes" by Esc861: a bright
 *    wind-chime shimmer for the golden flash.
 * The soft paper swish of the flap is synthesised.
 *
 * Mobile browsers only allow audio that starts from a user gesture, so
 * `unlockAudio()` must be called synchronously inside the click/tap handler.
 * The later effects can then be played from animation callbacks.
 */

type Ctx = AudioContext;

let ctx: Ctx | null = null;
let noiseBuffer: AudioBuffer | null = null;

const SAMPLES = {
  crack: "/sounds/seal-crack.wav",
  flash: "/sounds/flash-chime.wav",
} as const;
type SampleName = keyof typeof SAMPLES;

const buffers: Partial<Record<SampleName, AudioBuffer>> = {};
const loading: Partial<Record<SampleName, Promise<void>>> = {};

/**
 * Fetch + decode the recordings ahead of time (no user gesture needed —
 * decoding happens in an OfflineAudioContext, and AudioBuffers can be played
 * by any context later), so they fire exactly on cue.
 */
export function preloadSounds(): void {
  if (typeof window === "undefined") return;
  const OAC =
    window.OfflineAudioContext ??
    (window as unknown as { webkitOfflineAudioContext?: typeof OfflineAudioContext })
      .webkitOfflineAudioContext;
  if (!OAC) return;
  for (const name of Object.keys(SAMPLES) as SampleName[]) {
    if (loading[name]) continue;
    loading[name] = fetch(SAMPLES[name])
      .then((r) => r.arrayBuffer())
      .then((data) => new OAC(1, 1, 44100).decodeAudioData(data))
      .then((buf) => {
        buffers[name] = buf;
      })
      .catch(() => {
        delete loading[name]; // allow a retry on the next mount
      });
  }
}

export function unlockAudio(): Ctx | null {
  if (typeof window === "undefined") return null;
  try {
    if (!ctx) {
      const AC =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") void ctx.resume();
    // iOS Safari: playing a silent buffer inside the gesture fully unlocks output
    const silent = ctx.createBuffer(1, 1, ctx.sampleRate);
    const src = ctx.createBufferSource();
    src.buffer = silent;
    src.connect(ctx.destination);
    src.start(0);
    return ctx;
  } catch {
    return null;
  }
}

/**
 * Play a preloaded recording. If it hasn't finished decoding (very slow
 * network), play only if it lands quickly — otherwise skip rather than sound
 * long after the moment it belongs to.
 */
function playSample(name: SampleName, volume: number, route?: (c: Ctx, src: AudioNode) => AudioNode) {
  const c = ctx;
  if (!c) return;
  const play = () => {
    const buf = buffers[name];
    if (!buf) return;
    const src = c.createBufferSource();
    src.buffer = buf;
    const g = c.createGain();
    g.gain.value = volume;
    (route ? route(c, src) : src).connect(g).connect(c.destination);
    src.start();
  };
  if (buffers[name]) {
    play();
  } else if (loading[name]) {
    const asked = performance.now();
    void loading[name].then(() => {
      if (performance.now() - asked < 200) play();
    });
  }
}

/**
 * The real wax-seal crack: light pre-crack on tap, main splintering snap
 * ~0.25s later — timed to the crack line drawing and the wax splitting.
 */
export function playSealCrack() {
  playSample("crack", 1, (c, src) => {
    // gentle body EQ so the twig snap reads as thick wax rather than wood
    const lows = c.createBiquadFilter();
    lows.type = "peaking";
    lows.frequency.value = 220;
    lows.gain.value = 4;
    lows.Q.value = 0.8;
    return src.connect(lows);
  });
}

/** The golden flash: a real wind-chime shimmer. */
export function playFlash() {
  playSample("flash", 0.9);
}

function noise(c: Ctx): AudioBuffer {
  if (noiseBuffer && noiseBuffer.sampleRate === c.sampleRate) return noiseBuffer;
  const len = Math.floor(c.sampleRate * 1.5);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  noiseBuffer = buf;
  return buf;
}

/** Paper flap swishing open as the envelope unfolds. */
export function playFlapSwish() {
  const c = ctx;
  if (!c) return;
  const t = c.currentTime + 0.01;
  const swish = c.createBufferSource();
  swish.buffer = noise(c);
  const sf = c.createBiquadFilter();
  sf.type = "bandpass";
  sf.Q.value = 0.9;
  sf.frequency.setValueAtTime(500, t);
  sf.frequency.exponentialRampToValueAtTime(2200, t + 0.45);
  const sg = c.createGain();
  sg.gain.setValueAtTime(0.0001, t);
  sg.gain.exponentialRampToValueAtTime(0.18, t + 0.23);
  sg.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
  swish.connect(sf).connect(sg).connect(c.destination);
  swish.start(t);
  swish.stop(t + 0.65);
}
