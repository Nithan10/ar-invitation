/**
 * Single source of truth for every piece of invitation content.
 * Edit values here — components read from this file only.
 */

export const HOST = {
  initials: "AR",
  name: "ARUN R",
  firstName: "Arun",
  /**
   * Host photo shown in the gold frame. Put the image in /public/images/
   * and set the path, e.g. "/images/ar-photo.jpg".
   * While this is null, the section offers an "Add Your Photo" preview instead
   * (processed only in the viewer's browser, never uploaded).
   */
  photoSrc: "/images/ar-photo.jpg",
  photoAlt: "ARUN R",
} as const;

export const EVENT = {
  dateISO: "2026-11-27T19:30:00+05:30",
  day: "27",
  month: "NOVEMBER",
  year: "2026",
  weekday: "FRIDAY",
  time: "7:30 PM",
} as const;

export const VENUE = {
  displayName: "Arabian Majlis LYF",
  addressLines: [
    "Arabian Majlis, Lakshmi Mills,",
    "Avinashi Road, Coimbatore,",
    "Tamil Nadu 641037",
  ],
  address:
    "Arabian Majlis, Lakshmi Mills, Avinashi Road, Coimbatore, Tamil Nadu 641037",
  /** Exact URL encoded in the QR code and used by the directions button. */
  mapsUrl: "https://www.google.com/maps/place/Arabian+majlis/@11.01255,76.9833989,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba8595a19858c7d:0x4630405ea26f3942!8m2!3d11.01255!4d76.9859738!16s%2Fg%2F11nqs4z_8j?entry=ttu&g_ep=EgoyMDI2MTExNy4wIKXMDSoASAFQAw%3D%3D",
} as const;

export const RSVP = {
  /**
   * WhatsApp number in international format, digits only (e.g. "919876543210").
   * Leave empty to let guests choose the chat themselves in WhatsApp.
   */
  whatsappNumber: "",
  message: `Hi Arun! I'd love to join the dinner at ${"Arabian Majlis"} on Friday, 27 November 2026 at 7:30 PM. Count me in! ✨`,
} as const;

export function whatsappRsvpUrl(): string {
  const text = encodeURIComponent(RSVP.message);
  return RSVP.whatsappNumber
    ? `https://wa.me/${RSVP.whatsappNumber}?text=${text}`
    : `https://wa.me/?text=${text}`;
}
