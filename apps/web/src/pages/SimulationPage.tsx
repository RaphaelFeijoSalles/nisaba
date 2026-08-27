import { Link } from "react-router";
import { SlidersHorizontal } from "lucide-react";

import { AppShell } from "@/components/nisaba/app-shell";
import { DemoDataNotice, Panel } from "@/components/nisaba/ui-bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SimulationPage() {
  return (
    <AppShell title="Simular uma decisão" subtitle="Cenário · premissas do usuário">
      <div className="mx-auto max-w-xl space-y-6">
        <DemoDataNotice />

        <Panel
          title="Ajuste de premissas"
          description="Alterações feitas aqui são premissas suas, separadas das regras oficiais versionadas."
        >
          <div className="flex items-center gap-3 rounded-lg border border-border bg-surface-2 p-3">
            <span className="rounded-lg bg-primary-soft p-2 text-primary">
              <SlidersHorizontal className="h-4 w-4" />
            </span>
            <label className="flex flex-1 flex-col gap-2 text-sm font-semibold">
              Ajuste de preço (%)
              <Input type="number" defaultValue={5} className="bg-surface" />
            </label>
          </div>
        </Panel>

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/app">Simular</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/app">Cancelar</Link>
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
