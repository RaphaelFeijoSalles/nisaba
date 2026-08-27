package br.com.nisaba.api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import br.com.nisaba.api.common.api.ApiExceptionHandler;
import br.com.nisaba.api.company.CompanyController;
import br.com.nisaba.api.company.CompanyService;
import br.com.nisaba.api.simulation.api.SimulationController;
import br.com.nisaba.api.simulation.core.SimulationService;

class ApiContractTest {

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
    void supportsMinimumOnboardingAndScenarioFlow() throws Exception {
        mvc.perform(post("/api/v1/companies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "cnpj": "12.345.678/0001-90",
                                  "legalName": "Empresa Demo",
                                  "taxRegime": "SIMPLES_NACIONAL"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.cnpj").value("12345678000190"));

        mvc.perform(post("/api/v1/simulations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "companyId": 1,
                                  "targetYear": 2027,
                                  "userPriceAdjustmentPercent": 5,
                                  "priorityMetric": "ABSOLUTE_MARGIN_IMPACT",
                                  "items": [{
                                    "itemId": "SKU-1",
                                    "description": "Linha demonstrativa",
                                    "currentRevenue": 1000,
                                    "currentCost": 600,
                                    "currentTaxAmount": 100,
                                    "projectedCost": 600,
                                    "projectedTaxAmount": 140
                                  }]
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("REVIEW_REQUIRED"))
                .andExpect(jsonPath("$.calculationId").value("SCENARIO-MARGIN-V1"))
                .andExpect(jsonPath("$.totals.marginImpact").value(10.0))
                .andExpect(jsonPath("$.items[0].trace.assumptions[0]")
                        .value("USER_PRICE_ADJUSTMENT_PERCENT"));
    }

    @Test
    void returnsNotFoundForUnknownCompany() throws Exception {
        mvc.perform(post("/api/v1/simulations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "companyId": 99,
                                  "targetYear": 2027,
                                  "userPriceAdjustmentPercent": 0,
                                  "priorityMetric": "ABSOLUTE_MARGIN_IMPACT",
                                  "items": [{
                                    "itemId": "SKU-1",
                                    "description": "Linha demonstrativa",
                                    "currentRevenue": 1000,
                                    "currentCost": 600,
                                    "currentTaxAmount": 100,
                                    "projectedCost": 600
                                  }]
                                }
                                """))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("NOT_FOUND"));
    }
}
