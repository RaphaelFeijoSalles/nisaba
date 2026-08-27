package br.com.nisaba.api.erp;

import java.util.List;

public record SyncPage(
        List<FiscalDocument> documents,
        String nextCursor
) {
}
