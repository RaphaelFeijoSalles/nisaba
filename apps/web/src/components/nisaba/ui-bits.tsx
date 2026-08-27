import type { LucideIcon } from "lucide-react";
import { FlaskConical } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type Prioridade = "Alta" | "Média" | "Baixa";

export const prioridadeTone: Record<Prioridade, string> = {
  Alta: "border-destructive/40 bg-destructive/15 text-destructive",
  Média: "border-warning/40 bg-warning/15 text-warning",
  Baixa: "border-success/40 bg-success/15 text-success",
};

export function StatCard({
  label,
  value,
  delta,
  deltaTone = "neutral",
  icon: Icon,
  hint,
  style,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: "up" | "down" | "neutral";
  icon: LucideIcon;
  hint?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="panel fade-up-stagger group relative overflow-hidden p-5 transition-transform duration-300 hover:-translate-y-0.5"
      style={style}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <span className="rounded-lg bg-primary-soft p-2 text-primary transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-3 font-display text-2xl font-semibold text-foreground">{value}</p>
      <div className="mt-2 flex items-center gap-2 text-xs">
        {delta && (
          <span
            className={cn(
              "rounded-md border px-1.5 py-0.5 font-medium",
              deltaTone === "up" && "border-destructive/40 bg-destructive/15 text-destructive",
              deltaTone === "down" && "border-success/40 bg-success/15 text-success",
              deltaTone === "neutral" && "border-border bg-surface-2 text-muted-foreground",
            )}
          >
            {delta}
          </span>
        )}
        {hint && <span className="text-muted-foreground">{hint}</span>}
      </div>
    </div>
  );
}

export function Panel({
  title,
  description,
  actions,
  children,
  className,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("panel fade-up p-5", className)}>
      {(title || actions) && (
        <header className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            {title && <h2 className="text-sm font-semibold text-foreground">{title}</h2>}
            {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
          </div>
          {actions}
        </header>
      )}
      {children}
    </section>
  );
}

export function PriorityBadge({ prioridade }: { prioridade: Prioridade }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium",
        prioridadeTone[prioridade],
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {prioridade}
    </span>
  );
}

export function Tone({
  tone,
  children,
}: {
  tone: "success" | "warning" | "danger" | "neutral" | "primary";
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium",
        tone === "success" && "border-success/40 bg-success/15 text-success",
        tone === "warning" && "border-warning/40 bg-warning/15 text-warning",
        tone === "danger" && "border-destructive/40 bg-destructive/15 text-destructive",
        tone === "primary" && "border-primary/40 bg-primary-soft text-primary",
        tone === "neutral" && "border-border bg-surface-2 text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}

/**
 * Aviso obrigatório sempre que a tela exibir dados de fixture/mock.
 * Ver AGENTS.md §2: "apresentar dados de demonstração como resultados
 * fiscais reais" é uma proibição explícita — este banner existe para
 * que nenhuma tela quebre essa regra silenciosamente.
 */
export function DemoDataNotice({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-2 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-xs text-warning",
        className,
      )}
    >
      <FlaskConical className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <span>
        Dados demonstrativos (fixture local). Nenhum número desta tela representa uma regra
        fiscal validada.
      </span>
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="panel flex flex-col items-center gap-3 p-10 text-center">
      <span className="rounded-full bg-primary-soft p-3 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

export function ErrorState({
  title = "Não foi possível carregar os dados",
  description,
  onRetry,
}: {
  title?: string;
  description: string;
  onRetry?: () => void;
}) {
  return (
    <div className="panel flex flex-col items-center gap-3 border-destructive/30 p-10 text-center">
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-md border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-surface"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
