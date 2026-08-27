package br.com.nisaba.api.erp;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

@Component
public class BlingFixtureFiscalDocumentProvider implements FiscalDocumentProvider {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public SyncPage fetchDocuments(SyncRequest request) {
        String cursor = request.cursor() == null ? "page-1" : request.cursor();
        String path = switch (cursor) {
            case "page-1" -> "fixtures/erp/bling/page-1.json";
            case "page-2" -> "fixtures/erp/bling/page-2.json";
            default -> throw new InvalidSyncCursorException(cursor);
        };

        var resource = new ClassPathResource(path);
        try (InputStream inputStream = resource.getInputStream()) {
            var page = objectMapper.readValue(inputStream, BlingPageFixture.class);
            return new SyncPage(
                    page.data().stream().map(this::mapDocument).toList(),
                    page.pagination().hasNextPage() ? page.pagination().nextCursor() : null
            );
        } catch (IOException exception) {
            throw new FixtureLoadException("bling", cursor, exception);
        }
    }

    private FiscalDocument mapDocument(BlingDocumentFixture document) {
        return new FiscalDocument(
                String.valueOf(document.id()),
                document.number(),
                document.issueDate(),
                document.contact().name(),
                document.contact().document(),
                document.totals().totalAmount(),
                document.totals().taxAmount(),
                document.items().stream()
                        .map(item -> new FiscalDocument.LineItem(
                                item.sku(),
                                item.description(),
                                item.quantity(),
                                item.lineAmount()))
                        .toList()
        );
    }

    private record BlingPageFixture(
            List<BlingDocumentFixture> data,
            BlingPaginationFixture pagination
    ) {
    }

    private record BlingPaginationFixture(
            boolean hasNextPage,
            String nextCursor
    ) {
    }

    private record BlingDocumentFixture(
            long id,
            String number,
            String issueDate,
            BlingContactFixture contact,
            BlingTotalsFixture totals,
            List<BlingLineItemFixture> items
    ) {
    }

    private record BlingContactFixture(
            String name,
            String document
    ) {
    }

    private record BlingTotalsFixture(
            BigDecimal totalAmount,
            BigDecimal taxAmount
    ) {
    }

    private record BlingLineItemFixture(
            String sku,
            String description,
            BigDecimal quantity,
            BigDecimal lineAmount
    ) {
    }
}
