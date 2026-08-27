package br.com.nisaba.api.simulation.core;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import br.com.nisaba.api.common.domain.CalculationStatus;
import br.com.nisaba.api.simulation.api.PriorityMetric;

public record SimulationResult(
        CalculationStatus status,
        int targetYear,
        String calculationId,
        PriorityMetric priorityMetric,
        Map<String, BigDecimal> userAssumptions,
        Totals totals,
        List<ItemResult> items,
        List<String> warnings
) {
    public record Totals(
            BigDecimal currentRevenue,
            BigDecimal projectedRevenue,
            BigDecimal currentMargin,
            BigDecimal projectedMargin,
            BigDecimal marginImpact
    ) {
    }

    public record ItemResult(
            String itemId,
            String description,
            CalculationStatus status,
            BigDecimal currentMargin,
            BigDecimal projectedMargin,
            BigDecimal marginImpact,
            int priority,
            Trace trace
    ) {
    }

    public record Trace(
            Map<String, BigDecimal> inputsUsed,
            List<String> assumptions,
            String formula,
            List<String> sourceRefs
    ) {
    }
}
