package br.com.nisaba.api.erp;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/erp/providers")
public class ErpController {

    private final FiscalDocumentProviderRegistry providerRegistry;

    public ErpController(FiscalDocumentProviderRegistry providerRegistry) {
        this.providerRegistry = providerRegistry;
    }

    @GetMapping
    List<ProviderSummary> providers() {
        return providerRegistry.supportedProviders().stream()
                .map(provider -> new ProviderSummary(provider, "fixture"))
                .toList();
    }

    @GetMapping("/{provider}/documents")
    SyncPage fetchDocuments(
            @PathVariable String provider,
            @RequestParam(required = false) String cursor
    ) {
        return providerRegistry.requireProvider(provider).fetchDocuments(new SyncRequest(cursor));
    }

    record ProviderSummary(String id, String source) {
    }
}
