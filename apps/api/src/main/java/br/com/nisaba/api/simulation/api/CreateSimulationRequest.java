package br.com.nisaba.api.simulation.api;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CreateSimulationRequest(
        @NotNull Long companyId,
        @Min(2026) @Max(2035) int targetYear,
        Double userPriceAdjustmentPercent
) {
}
