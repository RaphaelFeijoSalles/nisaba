package br.com.nisaba.api.erp;

import java.math.BigDecimal;
import java.util.List;

public record FiscalDocument(
        String externalId,
        String documentNumber,
        String issuedDate,
        String counterpartyName,
        String counterpartyDocument,
        BigDecimal totalAmount,
        BigDecimal totalTaxAmount,
        List<LineItem> items
) {
    public record LineItem(
            String sku,
            String description,
            BigDecimal quantity,
            BigDecimal lineAmount
    ) {
    }
}
