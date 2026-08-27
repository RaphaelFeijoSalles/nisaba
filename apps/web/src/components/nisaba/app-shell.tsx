import { Link, useLocation } from "react-router";
import { LayoutDashboard, FlaskConical, Building2, Search, Bell, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import { NisabaLogo } from "./logo";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

/**
 * Navegação do shell autenticado.
 *
 * Só ficam aqui rotas que já existem em src/App.tsx. Não adicionamos itens
 * de produto (Fornecedores, Legislação, Relatórios...) que ainda não têm
 * página real — SCOPE.md é explícito em não prometer feature fora do MVP.
 */
const nav = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/onboarding", label: "Perfil da empresa", icon: Building2 },
  { to: "/app/simulations/new", label: "Simulações", icon: FlaskConical },
] as const;

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();

  return (
    <nav className="flex flex-col gap-1">
      <p className="px-3 pb-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60">
        Plataforma
      </p>
      {nav.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200",
              active
                ? "bg-primary-soft text-foreground shadow-[inset_0_0_0_1px_var(--border)]"
                : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
            )}
          >
            <Icon
              className={cn(
                "h-[18px] w-[18px] transition-colors",
                active ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
              )}
            />
            {label}
            {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="dark flex min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-border bg-sidebar px-4 py-5 lg:flex">
        <Link to="/app" className="px-1">
          <NisabaLogo />
        </Link>
        <div className="mt-8 flex-1">
          <NavList />
        </div>
        <div className="mt-4 rounded-xl border border-border bg-surface-2 p-3">
          <p className="text-xs font-medium text-foreground">Reforma Tributária</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            Acompanhe como as mudanças pressionam a margem antes de decidir.
          </p>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col border-r border-border bg-sidebar px-4 py-5">
            <div className="flex items-center justify-between px-1">
              <NisabaLogo />
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-surface-2 hover:text-foreground"
                aria-label="Fechar menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-8 flex-1">
              <NavList onNavigate={() => setOpen(false)} />
            </div>
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-40 border-b border-border bg-background">
          <div className="flex flex-wrap items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setOpen(true)}
              className="rounded-md p-2 text-muted-foreground hover:bg-surface-2 hover:text-foreground lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-lg font-semibold text-foreground sm:text-xl">{title}</h1>
              {subtitle && (
                <p className="mt-0.5 truncate text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
            <div className="relative hidden xl:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar produtos, cenários…"
                className="h-9 w-64 bg-surface pl-9 text-sm"
              />
            </div>
            <button
              className="relative rounded-lg border border-border bg-surface p-2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Notificações"
            >
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
            </button>
            {actions}
          </div>
        </header>

        <main className="fade-up flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
