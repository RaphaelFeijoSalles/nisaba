package br.com.nisaba.api.erp;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

class ErpControllerIntegrationTest {

    private MockMvc mvc;

    @BeforeEach
    void setUp() {
        var provider = new BlingFixtureFiscalDocumentProvider();
        var registry = new FiscalDocumentProviderRegistry(provider);

        mvc = MockMvcBuilders.standaloneSetup(new ErpController(registry))
                .setControllerAdvice(new ErpExceptionHandler())
                .build();
    }

    @Test
    void listsSupportedProviders() throws Exception {
        mvc.perform(get("/api/v1/erp/providers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value("bling"))
                .andExpect(jsonPath("$[0].source").value("fixture"));
    }

    @Test
    void returnsNormalizedDocumentsFromFirstFixturePage() throws Exception {
        mvc.perform(get("/api/v1/erp/providers/bling/documents"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.documents[0].externalId").value("9132456789"))
                .andExpect(jsonPath("$.documents[0].documentNumber").value("NF-2026-1048"))
                .andExpect(jsonPath("$.documents[0].counterpartyName").value("Padaria Aurora Ltda"))
                .andExpect(jsonPath("$.documents[0].items[1].sku").value("SKU-BIS-120"))
                .andExpect(jsonPath("$.documents[1].totalTaxAmount").value(156.31))
                .andExpect(jsonPath("$.nextCursor").value("page-2"));
    }

    @Test
    void returnsSecondPageWhenCursorIsProvided() throws Exception {
        mvc.perform(get("/api/v1/erp/providers/bling/documents").queryParam("cursor", "page-2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.documents.length()").value(1))
                .andExpect(jsonPath("$.documents[0].documentNumber").value("NF-2026-1050"))
                .andExpect(jsonPath("$.nextCursor").value(org.hamcrest.Matchers.nullValue()));
    }

    @Test
    void rejectsUnsupportedProvider() throws Exception {
        mvc.perform(get("/api/v1/erp/providers/omie/documents"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("UNSUPPORTED_PROVIDER"));
    }

    @Test
    void rejectsUnsupportedCursor() throws Exception {
        mvc.perform(get("/api/v1/erp/providers/bling/documents").queryParam("cursor", "page-99"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("INVALID_CURSOR"));
    }
}
