import { cn } from "@/lib/utils";

/**
 * Marca da Nisaba: uma "tábua" (o registro) atravessada por um traço
 * diagonal (o estilete/a escrita). Geometria discreta, sem literalidade
 * de civilização antiga — ver docs/brand/NISABA_BRAND_MANIFESTO.md.
 */
export function NisabaLogo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="3" className="stroke-primary" strokeWidth="1.6" />
          <path d="M7.5 16.5L16.5 7.5" className="stroke-primary" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="16.5" cy="7.5" r="1.4" className="fill-primary" />
        </svg>
      </span>
      {showWordmark && (
        <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
          Nisaba
        </span>
      )}
    </div>
  );
}
