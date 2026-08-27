package br.com.nisaba.api.simulation.api;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import br.com.nisaba.api.common.api.ApiExceptionHandler;
import br.com.nisaba.api.company.CompanyService;
import br.com.nisaba.api.company.CreateCompanyRequest;
import br.com.nisaba.api.company.TaxRegime;
import br.com.nisaba.api.simulation.core.SimulationService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class SimulationControllerTest {

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        var companyService = new CompanyService();
        companyService.create(new CreateCompanyRequest(
                "12.345.678/0001-90",
                "Empresa Demo",
                TaxRegime.SIMPLES_NACIONAL));

        mockMvc = MockMvcBuilders
                .standaloneSetup(new SimulationController(companyService, new SimulationService()))
                .setControllerAdvice(new ApiExceptionHandler())
                .build();
    }

    @Test
    void calculatesATraceableScenarioForAValidRequest() throws Exception {
        mockMvc.perform(post("/api/v1/simulations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(fixture("valid-simulation-request.json")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("REVIEW_REQUIRED"))
                .andExpect(jsonPath("$.calculationId").value("SCENARIO-MARGIN-V1"))
                .andExpect(jsonPath("$.totals.marginImpact").value(10.0))
                .andExpect(jsonPath("$.items[0].priority").value(1))
                .andExpect(jsonPath("$.items[0].trace.assumptions[0]")
                        .value("USER_PRICE_ADJUSTMENT_PERCENT"));
    }

    @Test
    void rejectsARequestWithMissingCompanyAndUnsupportedYear() throws Exception {
        mockMvc.perform(post("/api/v1/simulations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(fixture("invalid-simulation-request.json")))
                .andExpect(status().isBadRequest());
    }

    private String fixture(String name) throws IOException {
        String path = "/fixtures/simulation/" + name;
        try (InputStream input = getClass().getResourceAsStream(path)) {
            if (input == null) {
                throw new IOException("Fixture not found: " + path);
            }
            return new String(input.readAllBytes(), StandardCharsets.UTF_8);
        }
    }
}
