package br.com.nisaba.api.erp;

import java.util.List;
import java.util.Locale;

import org.springframework.stereotype.Service;

@Service
public class FiscalDocumentProviderRegistry {

    private final FiscalDocumentProvider blingProvider;

    public FiscalDocumentProviderRegistry(BlingFixtureFiscalDocumentProvider blingProvider) {
        this.blingProvider = blingProvider;
    }

    public List<String> supportedProviders() {
        return List.of("bling");
    }

    public FiscalDocumentProvider requireProvider(String provider) {
        return switch (provider.toLowerCase(Locale.ROOT)) {
            case "bling" -> blingProvider;
            default -> throw new UnsupportedProviderException(provider);
        };
    }
}
