package br.com.nisaba.api.company;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record CreateCompanyRequest(
        @NotBlank @Pattern(
                regexp = "(?:\\d{14}|\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2})",
                message = "must use 14 digits, with or without standard punctuation") String cnpj,
        @NotBlank String legalName,
        @NotNull TaxRegime taxRegime
) {
}
