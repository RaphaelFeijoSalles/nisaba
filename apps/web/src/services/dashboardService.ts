import type { DashboardSummary } from "@/types/dashboard";
import { dashboardMock } from "@/mocks/dashboardMock";

/**
 * Camada de serviço do dashboard.
 *
 * A UI nunca importa o mock diretamente — sempre passa por aqui (ou por um
 * hook em src/hooks). Isso mantém um único ponto de troca quando o endpoint
 * real existir:
 *
 *   GET /api/companies/:companyId/dashboard-summary -> DashboardSummary
 *
 * Esse endpoint ainda não existe no backend. O contrato acima é uma proposta
 * do frontend, não uma definição fechada — precisa ser validada com quem
 * define os contratos técnicos (docs/team/WORKING_AGREEMENT.md).
 */
export async function getDashboardSummary(
  _companyId?: string,
): Promise<DashboardSummary> {
  // TODO(backend): substituir por fetch(`/api/companies/${companyId}/dashboard-summary`)
  // quando o endpoint existir. Manter o mesmo shape de DashboardSummary.
  await simulateNetworkDelay();
  return dashboardMock;
}

function simulateNetworkDelay(ms = 650) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
