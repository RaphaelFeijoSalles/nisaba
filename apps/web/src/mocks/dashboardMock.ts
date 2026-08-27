import type { DashboardSummary } from "@/types/dashboard";

/**
 * Fixture local do dashboard. Serve só para desenvolver a UI antes do
 * backend existir — nenhum valor aqui é uma regra fiscal calculada.
 * Ver AGENTS.md §2 (proibido apresentar dado de demonstração como real).
 */
export const dashboardMock: DashboardSummary = {
  empresa: "Nortec Distribuidora Ltda",
  cenarioLabel: "Cenário base · transição 2027",
  isDemoData: true,
  kpis: {
    impactoTributarioLabel: "R$ 1,84 mi",
    impactoTributarioDelta: "+12,4%",
    produtosAtencao: 27,
    produtosCriticos: 12,
    economiaPotencialLabel: "R$ 412 mil",
    economiaPotencialDelta: "-3,1 p.p.",
    ultimaSimulacaoLabel: "hoje, 14:32",
  },
  impactoMensal: [
    { mes: "Jan", cargaAtual: 1.42, cargaSimulada: 1.58 },
    { mes: "Fev", cargaAtual: 1.38, cargaSimulada: 1.61 },
    { mes: "Mar", cargaAtual: 1.51, cargaSimulada: 1.72 },
    { mes: "Abr", cargaAtual: 1.47, cargaSimulada: 1.69 },
    { mes: "Mai", cargaAtual: 1.55, cargaSimulada: 1.81 },
    { mes: "Jun", cargaAtual: 1.6, cargaSimulada: 1.84 },
    { mes: "Jul", cargaAtual: 1.58, cargaSimulada: 1.79 },
    { mes: "Ago", cargaAtual: 1.64, cargaSimulada: 1.88 },
  ],
  distribuicaoImpacto: [
    { categoria: "Impacto alto", quantidade: 27, tom: "destructive" },
    { categoria: "Impacto moderado", quantidade: 46, tom: "warning" },
    { categoria: "Sem impacto", quantidade: 71, tom: "success" },
    { categoria: "Ganho de crédito", quantidade: 19, tom: "primary" },
  ],
  margemComparativa: [
    { categoria: "Bebidas", margemAntes: 22, margemDepois: 16 },
    { categoria: "Alimentos", margemAntes: 18, margemDepois: 17 },
    { categoria: "Higiene", margemAntes: 26, margemDepois: 21 },
    { categoria: "Serviços", margemAntes: 34, margemDepois: 27 },
    { categoria: "Embalagens", margemAntes: 15, margemDepois: 18 },
  ],
  alertas: [
    {
      id: "a1",
      titulo: "Produto Refrigerante 2L pode perder margem",
      descricao: "Estimativa de -6,2% na margem após a transição para IBS/CBS.",
      prioridade: "Alta",
    },
    {
      id: "a2",
      titulo: "Revisar fornecedor com crédito reduzido",
      descricao: "Regime tributário do fornecedor reduz o crédito aproveitável.",
      prioridade: "Alta",
    },
    {
      id: "a3",
      titulo: "Nova regulamentação disponível",
      descricao: "Ajuste nas alíquotas de referência publicado recentemente.",
      prioridade: "Média",
    },
    {
      id: "a4",
      titulo: "Cadastro fiscal incompleto em 4 produtos",
      descricao: "NCM ausente impede o cálculo preciso do impacto.",
      prioridade: "Baixa",
    },
  ],
};
