package br.com.nisaba.api.simulation.core;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import br.com.nisaba.api.common.domain.CalculationStatus;
import br.com.nisaba.api.simulation.api.CreateSimulationRequest;
import br.com.nisaba.api.simulation.api.SimulationItemRequest;

@Service
public class SimulationService {

    static final String CALCULATION_ID = "SCENARIO-MARGIN-V1";
    private static final BigDecimal ONE_HUNDRED = new BigDecimal("100");

    public SimulationResult simulate(CreateSimulationRequest request) {
        var calculatedItems = request.items().stream()
                .map(item -> calculateItem(item, request.userPriceAdjustmentPercent()))
                .sorted(Comparator.comparing(
                        (SimulationResult.ItemResult result) -> result.marginImpact() == null
                                ? null
                                : result.marginImpact().abs(),
                        Comparator.nullsLast(Comparator.reverseOrder())))
                .toList();

        var prioritizedItems = new ArrayList<SimulationResult.ItemResult>();
        int priority = 1;
        for (var item : calculatedItems) {
            int itemPriority = item.marginImpact() == null ? 0 : priority++;
            prioritizedItems.add(new SimulationResult.ItemResult(
                    item.itemId(), item.description(), item.status(), item.currentMargin(),
                    item.projectedMargin(), item.marginImpact(), itemPriority, item.trace()));
        }

        boolean hasMissingTaxInput = prioritizedItems.stream()
                .anyMatch(item -> item.status() == CalculationStatus.INSUFFICIENT_DATA);
        var status = hasMissingTaxInput
                ? CalculationStatus.INSUFFICIENT_DATA
                : CalculationStatus.REVIEW_REQUIRED;

        return new SimulationResult(
                status,
                request.targetYear(),
                CALCULATION_ID,
                request.priorityMetric(),
                Map.of("USER_PRICE_ADJUSTMENT_PERCENT", money(request.userPriceAdjustmentPercent())),
                hasMissingTaxInput ? null : totals(request.items(), prioritizedItems, request.userPriceAdjustmentPercent()),
                prioritizedItems,
                hasMissingTaxInput
                        ? List.of("projectedTaxAmount é obrigatório para concluir o cenário; nenhuma alíquota foi inferida.")
                        : List.of("Valores tributários projetados são USER_ASSUMPTION e exigem revisão fiscal."));
    }

    private SimulationResult.ItemResult calculateItem(SimulationItemRequest item, BigDecimal priceAdjustment) {
        BigDecimal currentMargin = money(item.currentRevenue()
                .subtract(item.currentCost())
                .subtract(item.currentTaxAmount()));

        var inputs = new LinkedHashMap<String, BigDecimal>();
        inputs.put("currentRevenue", money(item.currentRevenue()));
        inputs.put("currentCost", money(item.currentCost()));
        inputs.put("currentTaxAmount", money(item.currentTaxAmount()));

        if (item.projectedTaxAmount() == null) {
            return new SimulationResult.ItemResult(
                    item.itemId(), item.description(), CalculationStatus.INSUFFICIENT_DATA,
                    currentMargin, null, null, 0,
                    new SimulationResult.Trace(inputs, List.of(),
                            "currentMargin = currentRevenue - currentCost - currentTaxAmount",
                            List.of()));
        }

        BigDecimal projectedRevenue = adjustedRevenue(item.currentRevenue(), priceAdjustment);
        inputs.put("projectedCost", money(item.projectedCost()));
        BigDecimal projectedMargin = money(projectedRevenue
                .subtract(item.projectedCost())
                .subtract(item.projectedTaxAmount()));
        BigDecimal impact = money(projectedMargin.subtract(currentMargin));
        inputs.put("projectedTaxAmount", money(item.projectedTaxAmount()));
        inputs.put("projectedRevenue", projectedRevenue);

        return new SimulationResult.ItemResult(
                item.itemId(), item.description(), CalculationStatus.REVIEW_REQUIRED,
                currentMargin, projectedMargin, impact, 0,
                new SimulationResult.Trace(
                        inputs,
                        List.of("USER_PRICE_ADJUSTMENT_PERCENT", "USER_PROJECTED_COST",
                                "USER_PROJECTED_TAX_AMOUNT", "USER_PRIORITY_METRIC"),
                        "projectedMargin = projectedRevenue - projectedCost - projectedTaxAmount; "
                                + "marginImpact = projectedMargin - currentMargin",
                        List.of()));
    }

    private SimulationResult.Totals totals(
            List<SimulationItemRequest> inputs,
            List<SimulationResult.ItemResult> results,
            BigDecimal priceAdjustment) {
        BigDecimal currentRevenue = inputs.stream()
                .map(SimulationItemRequest::currentRevenue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal projectedRevenue = inputs.stream()
                .map(item -> adjustedRevenue(item.currentRevenue(), priceAdjustment))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal currentMargin = results.stream()
                .map(SimulationResult.ItemResult::currentMargin)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal projectedMargin = results.stream()
                .map(SimulationResult.ItemResult::projectedMargin)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new SimulationResult.Totals(
                money(currentRevenue), money(projectedRevenue), money(currentMargin),
                money(projectedMargin), money(projectedMargin.subtract(currentMargin)));
    }

    private BigDecimal adjustedRevenue(BigDecimal revenue, BigDecimal percent) {
        return money(revenue.multiply(BigDecimal.ONE.add(percent.divide(ONE_HUNDRED, 8, RoundingMode.HALF_UP))));
    }

    private BigDecimal money(BigDecimal value) {
        return value.setScale(2, RoundingMode.HALF_UP);
    }
}
