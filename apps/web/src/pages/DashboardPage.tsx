import { Link } from "react-router";
import { AlertTriangle, ArrowRight, Coins, Package, PiggyBank, Clock3 } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AppShell } from "@/components/nisaba/app-shell";
import {
  DemoDataNotice,
  ErrorState,
  Panel,
  PriorityBadge,
  StatCard,
} from "@/components/nisaba/ui-bits";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardSummary } from "@/hooks/useDashboardSummary";

const tooltipStyle = {
  backgroundColor: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "10px",
  fontSize: "12px",
  color: "var(--foreground)",
};

const axis = {
  stroke: "var(--muted-foreground)",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
};

const distribuicaoCorPorTom: Record<string, string> = {
  destructive: "var(--destructive)",
  warning: "var(--warning)",
  success: "var(--success)",
  primary: "var(--primary)",
};

export function DashboardPage() {
  const { data, isLoading, isError, refetch } = useDashboardSummary();

  return (
    <AppShell
      title="Mapa de impacto"
      subtitle={data ? `${data.empresa} · ${data.cenarioLabel}` : undefined}
      actions={
        <Button asChild>
          <Link to="/app/simulations/new">
            Novo cenário <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      }
    >
      {isLoading && <DashboardSkeleton />}

      {isError && !isLoading && (
        <ErrorState
          description="Não foi possível carregar o resumo do dashboard agora. Tente novamente em instantes."
          onRetry={() => refetch()}
        />
      )}

      {data && !isLoading && !isError && (
        <div className="space-y-6">
          {data.isDemoData && <DemoDataNotice />}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              style={{ "--stagger-index": 0 } as React.CSSProperties}
              label="Impacto tributário estimado"
              value={data.kpis.impactoTributarioLabel}
              delta={data.kpis.impactoTributarioDelta}
              deltaTone="up"
              hint="vs. carga atual"
              icon={Coins}
            />
            <StatCard
              style={{ "--stagger-index": 1 } as React.CSSProperties}
              label="Produtos com atenção"
              value={String(data.kpis.produtosAtencao)}
              delta={`${data.kpis.produtosCriticos} críticos`}
              deltaTone="up"
              icon={Package}
            />
            <StatCard
              style={{ "--stagger-index": 2 } as React.CSSProperties}
              label="Economia potencial"
              value={data.kpis.economiaPotencialLabel}
              delta={data.kpis.economiaPotencialDelta}
              deltaTone="down"
              hint="com ações sugeridas"
              icon={PiggyBank}
            />
            <StatCard
              style={{ "--stagger-index": 3 } as React.CSSProperties}
              label="Última simulação"
              value={data.kpis.ultimaSimulacaoLabel}
              delta="Concluída"
              deltaTone="down"
              icon={Clock3}
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <Panel
              title="Impacto financeiro ao longo do tempo"
              description="Carga tributária mensal em R$ milhões"
              className="lg:col-span-2"
            >
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.impactoMensal} margin={{ left: -18, right: 8, top: 8 }}>
                    <defs>
                      <linearGradient id="gAtual" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gSim" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="mes" {...axis} />
                    <YAxis {...axis} />
                    <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "var(--border)" }} />
                    <Legend wrapperStyle={{ fontSize: 11, color: "var(--muted-foreground)" }} />
                    <Area
                      name="Carga atual"
                      type="monotone"
                      dataKey="cargaAtual"
                      stroke="var(--chart-2)"
                      strokeWidth={2}
                      fill="url(#gAtual)"
                    />
                    <Area
                      name="Carga simulada"
                      type="monotone"
                      dataKey="cargaSimulada"
                      stroke="var(--primary)"
                      strokeWidth={2}
                      fill="url(#gSim)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Panel>

            <Panel
              title="Distribuição dos produtos afetados"
              description={`${data.distribuicaoImpacto.reduce((sum, d) => sum + d.quantidade, 0)} produtos analisados`}
            >
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.distribuicaoImpacto}
                      dataKey="quantidade"
                      nameKey="categoria"
                      innerRadius={52}
                      outerRadius={82}
                      paddingAngle={3}
                      stroke="none"
                    >
                      {data.distribuicaoImpacto.map((d) => (
                        <Cell key={d.categoria} fill={distribuicaoCorPorTom[d.tom]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="mt-3 space-y-2">
                {data.distribuicaoImpacto.map((d) => (
                  <li key={d.categoria} className="flex items-center gap-2 text-xs">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: distribuicaoCorPorTom[d.tom] }}
                    />
                    <span className="text-muted-foreground">{d.categoria}</span>
                    <span className="ml-auto text-foreground">{d.quantidade}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <Panel
              title="Margem antes e depois da simulação"
              description="Percentual por categoria"
              className="lg:col-span-2"
            >
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.margemComparativa} margin={{ left: -18, right: 8, top: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="categoria" {...axis} />
                    <YAxis {...axis} />
                    <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--surface-2)" }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar name="Antes" dataKey="margemAntes" fill="var(--secondary)" radius={[4, 4, 0, 0]} />
                    <Bar name="Depois" dataKey="margemDepois" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Panel>

            <Panel title="Alertas" description="Pontos que merecem atenção agora">
              <ul className="space-y-3">
                {data.alertas.map((a) => (
                  <li
                    key={a.id}
                    className="rounded-xl border border-border bg-surface-2 p-3 transition-colors hover:border-primary/40"
                  >
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                      <div className="min-w-0">
                        <p className="text-sm text-foreground">{a.titulo}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {a.descricao}
                        </p>
                        <div className="mt-2">
                          <PriorityBadge prioridade={a.prioridade} />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
      )}
    </AppShell>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-xl bg-surface" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Skeleton className="h-80 rounded-xl bg-surface lg:col-span-2" />
        <Skeleton className="h-80 rounded-xl bg-surface" />
      </div>
    </div>
  );
}
