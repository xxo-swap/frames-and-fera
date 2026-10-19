// components/SocialFloatingPopup.tsx
"use client";

// Authentic, fully visible WhatsApp vector mark (bubble + receiver)
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.2.301-.778.978-.954 1.179-.176.2-.351.226-.652.075s-1.272-.469-2.424-1.496c-.896-.799-1.501-1.787-1.677-2.088-.176-.301-.019-.464.132-.614.135-.135.301-.351.452-.527.151-.176.201-.301.301-.502.1-.2.05-.376-.025-.527-.075-.15-.678-1.634-.929-2.239-.244-.588-.493-.509-.678-.519l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.511 1.079 2.912 1.23 3.113c.151.2 2.124 3.243 5.145 4.549.718.311 1.279.497 1.716.636.721.23 1.377.197 1.896.12.578-.087 1.78-.727 2.031-1.429.251-.702.251-1.303.176-1.429-.075-.126-.276-.201-.577-.351z" />
      <path d="M12.004 2C6.48 2 2 6.478 2 12c0 1.954.563 3.778 1.536 5.323L2 22l4.814-1.503A9.957 9.957 0 0 0 12.004 22C17.524 22 22 17.52 22 12s-4.476-10-9.996-10zm0 18.2c-1.628 0-3.14-.49-4.408-1.331l-.316-.21-2.859.893.906-2.77-.229-.338A8.175 8.175 0 0 1 3.8 12c0-4.524 3.68-8.2 8.204-8.2 4.52 0 8.196 3.676 8.196 8.2s-3.676 8.2-8.196 8.2z" />
    </svg>
  );
}

export default function SocialFloatingPopup() {
  // wa.me requires country code + digits without spaces, hyphens, or '+'
  const rawNumber = "+91 8789069866";
  const sanitizedNumber = rawNumber.replace(/[^0-9]/g, "");

  const defaultMessage = encodeURIComponent(
    "Hello Frames & Fera, I would like to inquire about wedding cinematography and photography availability."
  );
  const whatsappUrl = `https://wa.me/${sanitizedNumber}?text=${defaultMessage}`;

  return (
    <aside
      aria-label="Connect on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 font-sans select-none"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Connect with us on WhatsApp"
      >
        {/* Editorial Text Label */}
        

        {/* WhatsApp Icon Circle */}
        <div className="relative flex h-15 w-15 items-center justify-center rounded-full border border-brand-accent/50 bg-brand-bg text-brand-text transition-colors duration-300 group-hover:border-brand-text group-hover:bg-brand-text group-hover:text-brand-bg">
          <WhatsAppIcon className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />

          {/* Active Studio Pulse Dot */}
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-text/30 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-brand-bg bg-brand-text group-hover:border-brand-text group-hover:bg-brand-bg" />
          </span>
        </div>
      </a>
    </aside>
  );
}