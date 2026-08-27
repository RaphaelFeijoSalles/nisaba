package br.com.nisaba.api;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import br.com.nisaba.api.common.api.ApiExceptionHandler;
import br.com.nisaba.api.company.CompanyController;
import br.com.nisaba.api.company.CompanyService;
import br.com.nisaba.api.erp.BlingFixtureFiscalDocumentProvider;
import br.com.nisaba.api.erp.FiscalDocument;
import br.com.nisaba.api.erp.SyncRequest;
import br.com.nisaba.api.simulation.api.CreateSimulationRequest;
import br.com.nisaba.api.simulation.api.PriorityMetric;
import br.com.nisaba.api.simulation.api.SimulationController;
import br.com.nisaba.api.simulation.api.SimulationItemRequest;
import br.com.nisaba.api.simulation.core.SimulationService;

class BackendFlowSmokeTest {

    private static final BigDecimal USER_PRICE_ADJUSTMENT_PERCENT = new BigDecimal("5");
    private static final BigDecimal FIXTURE_COST_RATIO = new BigDecimal("0.60");
    private static final BigDecimal USER_PROJECTED_TAX_DELTA = new BigDecimal("30.00");

    private final ObjectMapper objectMapper = new ObjectMapper();
    private MockMvc mvc;

    @BeforeEach
    void setUp() {
        var companyService = new CompanyService();
        mvc = MockMvcBuilders.standaloneSetup(
                        new CompanyController(companyService),
                        new SimulationController(companyService, new SimulationService()))
                .setControllerAdvice(new ApiExceptionHandler())
                .build();
    }

    @Test
    void validatesDemoBackendFlowFromErpFixtureToSimulation() throws Exception {
        mvc.perform(post("/api/v1/companies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "cnpj": "12.345.678/0001-90",
                                  "legalName": "Empresa Demo ERP",
                                  "taxRegime": "SIMPLES_NACIONAL"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1));

        var erpPage = new BlingFixtureFiscalDocumentProvider()
                .fetchDocuments(new SyncRequest(null));
        List<SimulationItemRequest> normalizedItems = erpPage.documents().stream()
                .map(this::normalizeDocumentForDemoSimulation)
                .toList();

        var request = new CreateSimulationRequest(
                1L,
                2027,
                USER_PRICE_ADJUSTMENT_PERCENT,
                PriorityMetric.ABSOLUTE_MARGIN_IMPACT,
                normalizedItems);

        mvc.perform(post("/api/v1/simulations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("REVIEW_REQUIRED"))
                .andExpect(jsonPath("$.warnings[0]").value(containsString("USER_ASSUMPTION")))
                .andExpect(jsonPath("$.userAssumptions.USER_PRICE_ADJUSTMENT_PERCENT").value(5.0))
                .andExpect(jsonPath("$.totals.currentRevenue").value(2320.5))
                .andExpect(jsonPath("$.totals.projectedRevenue").value(2436.53))
                .andExpect(jsonPath("$.totals.currentMargin").value(557.16))
                .andExpect(jsonPath("$.totals.projectedMargin").value(613.19))
                .andExpect(jsonPath("$.totals.marginImpact").value(56.03))
                .andExpect(jsonPath("$.items.length()").value(2))
                .andExpect(jsonPath("$.items[0].itemId").value("NF-2026-1048"))
                .andExpect(jsonPath("$.items[0].status").value("REVIEW_REQUIRED"))
                .andExpect(jsonPath("$.items[0].priority").value(1))
                .andExpect(jsonPath("$.items[0].trace.assumptions[0]")
                        .value("USER_PRICE_ADJUSTMENT_PERCENT"))
                .andExpect(jsonPath("$.items[0].trace.assumptions[1]")
                        .value("USER_PROJECTED_COST"))
                .andExpect(jsonPath("$.items[0].trace.assumptions[2]")
                        .value("USER_PROJECTED_TAX_AMOUNT"))
                .andExpect(jsonPath("$.items[1].itemId").value("NF-2026-1049"))
                .andExpect(jsonPath("$.items[1].status").value("REVIEW_REQUIRED"));
    }

    private SimulationItemRequest normalizeDocumentForDemoSimulation(FiscalDocument document) {
        BigDecimal currentCost = money(document.totalAmount().multiply(FIXTURE_COST_RATIO));
        BigDecimal projectedTax = money(document.totalTaxAmount().add(USER_PROJECTED_TAX_DELTA));

        return new SimulationItemRequest(
                document.documentNumber(),
                document.counterpartyName(),
                money(document.totalAmount()),
                currentCost,
                money(document.totalTaxAmount()),
                currentCost,
                projectedTax);
    }

    private BigDecimal money(BigDecimal value) {
        return value.setScale(2, RoundingMode.HALF_UP);
    }
}
