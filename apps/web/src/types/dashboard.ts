/**
 * Contrato de dados que o frontend espera para o dashboard.
 *
 * Isto NÃO é um contrato de API definitivo — o backend ainda está sendo
 * desenvolvido (ver AGENTS.md/ARCHITECTURE.md). Estes tipos existem para que
 * a UI, o hook e o mock conversem por uma interface única e para que, quando
 * o endpoint real existir, só o `dashboardService` precise mudar.
 *
 * Endpoint proposto (não implementado, não validado com o backend):
 *   GET /api/companies/:companyId/dashboard-summary
 *   -> DashboardSummary
 *
 * Qualquer mudança real de contrato deve ser negociada com quem define os
 * contratos técnicos (ver docs/team/WORKING_AGREEMENT.md) e registrada aqui.
 */

export type Prioridade = "Alta" | "Média" | "Baixa";

export interface KpiSummary {
  impactoTributarioLabel: string;
  impactoTributarioDelta: string;
  produtosAtencao: number;
  produtosCriticos: number;
  economiaPotencialLabel: string;
  economiaPotencialDelta: string;
  ultimaSimulacaoLabel: string;
}

export interface ImpactoMensal {
  mes: string;
  cargaAtual: number;
  cargaSimulada: number;
}

export interface DistribuicaoImpacto {
  categoria: string;
  quantidade: number;
  tom: "destructive" | "warning" | "success" | "primary";
}

export interface MargemComparativa {
  categoria: string;
  margemAntes: number;
  margemDepois: number;
}

export interface AlertaPrioridade {
  id: string;
  titulo: string;
  descricao: string;
  prioridade: Prioridade;
}

export interface DashboardSummary {
  empresa: string;
  cenarioLabel: string;
  kpis: KpiSummary;
  impactoMensal: ImpactoMensal[];
  distribuicaoImpacto: DistribuicaoImpacto[];
  margemComparativa: MargemComparativa[];
  alertas: AlertaPrioridade[];
  /** true enquanto a fonte dos dados for fixture local, não o backend real. */
  isDemoData: boolean;
}
