package br.com.nisaba.api.simulation.api;

import java.math.BigDecimal;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record CreateSimulationRequest(
        @NotNull Long companyId,
        @Min(2026) @Max(2035) int targetYear,
        @NotNull @DecimalMin("-100.00") @DecimalMax("1000.00") BigDecimal userPriceAdjustmentPercent,
        @NotNull PriorityMetric priorityMetric,
        @NotEmpty List<@NotNull @Valid SimulationItemRequest> items
) {
}
