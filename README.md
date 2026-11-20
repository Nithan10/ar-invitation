# AR — Royal Sealed Dinner Invitation

Next.js (App Router) · TypeScript · Tailwind v4 · Framer Motion · GSAP/ScrollTrigger · qrcode.react · Lucide

## Run
    npm install
    npm run dev            # http://localhost:3000
    npm run build && npm start

Deploy to Vercel as-is, or `STATIC_EXPORT=1 npm run build` for a static site in `out/`.

## Edit content — `src/lib/invitation.ts`
- `HOST.photoSrc` — put your photo in `public/images/` and set e.g. `"/images/ar-photo.jpg"`.
  While null, guests see an "Add Your Photo" preview (stays in their browser).
- `RSVP.whatsappNumber` — digits with country code, e.g. `"919876543210"`.
  Empty = WhatsApp opens and the guest picks the chat.
- `VENUE.mapsUrl` — the exact URL encoded in the QR code and the directions button.

## Components
EnvelopeLanding → Envelope → WaxSeal (opening timeline in `src/lib/useEnvelopeOpening.ts`),
InvitationLetter, DateReveal, VenueSection + LocationQRCode, PhotoUpload, ClosingNote, FinalFooter.
Fonts are self-hosted in `src/app/fonts` (no Google Fonts requests).
