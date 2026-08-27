package br.com.nisaba.api.simulation.api;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SimulationItemRequest(
        @NotBlank String itemId,
        @NotBlank String description,
        @NotNull @DecimalMin("0.00") BigDecimal currentRevenue,
        @NotNull @DecimalMin("0.00") BigDecimal currentCost,
        @NotNull @DecimalMin("0.00") BigDecimal currentTaxAmount,
        @NotNull @DecimalMin("0.00") BigDecimal projectedCost,
        @DecimalMin("0.00") BigDecimal projectedTaxAmount
) {
}
