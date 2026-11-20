import { QRCodeSVG } from "qrcode.react";

/** Real, scannable QR code encoding the exact Google Maps destination URL. */
export default function LocationQRCode({ url }: { url: string }) {
  return (
    <figure className="flex flex-col items-center">
      <div className="relative rounded-[8px] bg-white p-3.5 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.6)] ring-2 ring-gold/70">
        <div className="pointer-events-none absolute -inset-1.5 rounded-[11px] border border-gold/50" />
        <QRCodeSVG
          value={url}
          size={168}
          level="M"
          marginSize={2}
          bgColor="#FFFFFF"
          fgColor="#1a0f14"
          title="QR code: open Arabian Majlis in Google Maps"
          className="h-[140px] w-[140px] sm:h-[168px] sm:w-[168px]"
          data-qr-value={url}
        />
      </div>
      <figcaption className="mt-3.5 font-royal text-[11px] font-semibold tracking-[0.35em] text-[#ffd778]">
        SCAN TO FIND US
      </figcaption>
    </figure>
  );
}
