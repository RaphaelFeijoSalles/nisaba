package br.com.nisaba.api.simulation.core;

import static org.assertj.core.api.Assertions.assertThat;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.Test;

import br.com.nisaba.api.common.domain.CalculationStatus;
import br.com.nisaba.api.simulation.api.CreateSimulationRequest;
import br.com.nisaba.api.simulation.api.PriorityMetric;
import br.com.nisaba.api.simulation.api.SimulationItemRequest;

class SimulationServiceTest {

    private final SimulationService service = new SimulationService();

    @Test
    void calculatesTraceableScenarioAndOrdersItemsByAbsoluteMarginImpact() {
        var request = new CreateSimulationRequest(
                1L,
                2027,
                new BigDecimal("5"),
                PriorityMetric.ABSOLUTE_MARGIN_IMPACT,
                List.of(
                        item("A", "Linha A", "1000", "600", "100", "600", "140"),
                        item("B", "Linha B", "2000", "1200", "200", "1200", "250")));

        var result = service.simulate(request);

        assertThat(result.status()).isEqualTo(CalculationStatus.REVIEW_REQUIRED);
        assertThat(result.calculationId()).isEqualTo("SCENARIO-MARGIN-V1");
        assertThat(result.totals().currentRevenue()).isEqualByComparingTo("3000.00");
        assertThat(result.totals().projectedRevenue()).isEqualByComparingTo("3150.00");
        assertThat(result.totals().currentMargin()).isEqualByComparingTo("900.00");
        assertThat(result.totals().projectedMargin()).isEqualByComparingTo("960.00");
        assertThat(result.totals().marginImpact()).isEqualByComparingTo("60.00");
        assertThat(result.items()).extracting(SimulationResult.ItemResult::itemId)
                .containsExactly("B", "A");
        assertThat(result.items()).extracting(SimulationResult.ItemResult::priority)
                .containsExactly(1, 2);
        assertThat(result.items().getFirst().trace().assumptions())
                .containsExactly("USER_PRICE_ADJUSTMENT_PERCENT", "USER_PROJECTED_COST",
                        "USER_PROJECTED_TAX_AMOUNT", "USER_PRIORITY_METRIC");
        assertThat(result.items().getFirst().trace().sourceRefs()).isEmpty();
    }

    @Test
    void reportsInsufficientDataWithoutInferringProjectedTax() {
        var request = new CreateSimulationRequest(
                1L,
                2027,
                BigDecimal.ZERO,
                PriorityMetric.ABSOLUTE_MARGIN_IMPACT,
                List.of(item("A", "Linha A", "1000", "600", "100", "600", null)));

        var result = service.simulate(request);

        assertThat(result.status()).isEqualTo(CalculationStatus.INSUFFICIENT_DATA);
        assertThat(result.totals()).isNull();
        assertThat(result.items().getFirst().status()).isEqualTo(CalculationStatus.INSUFFICIENT_DATA);
        assertThat(result.items().getFirst().projectedMargin()).isNull();
        assertThat(result.items().getFirst().priority()).isZero();
        assertThat(result.warnings().getFirst()).contains("nenhuma alíquota foi inferida");
    }

    private SimulationItemRequest item(
            String id,
            String description,
            String revenue,
            String cost,
            String currentTax,
            String projectedCost,
            String projectedTax) {
        return new SimulationItemRequest(
                id,
                description,
                new BigDecimal(revenue),
                new BigDecimal(cost),
                new BigDecimal(currentTax),
                new BigDecimal(projectedCost),
                projectedTax == null ? null : new BigDecimal(projectedTax));
    }
}
