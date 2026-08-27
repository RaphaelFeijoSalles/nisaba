import { useQuery } from "@tanstack/react-query";

import { getDashboardSummary } from "@/services/dashboardService";

export function useDashboardSummary(companyId?: string) {
  return useQuery({
    queryKey: ["dashboard-summary", companyId ?? "default"],
    queryFn: () => getDashboardSummary(),
  });
}
