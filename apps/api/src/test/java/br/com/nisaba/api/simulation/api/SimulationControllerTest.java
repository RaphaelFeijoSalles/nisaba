package br.com.nisaba.api.simulation.api;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class SimulationControllerTest {

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(new SimulationController()).build();
    }

    @Test
    void keepsSimulationExplicitlyUnavailableForAValidRequest() throws Exception {
        mockMvc.perform(post("/api/v1/simulations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(fixture("valid-simulation-request.json")))
                .andExpect(status().isNotImplemented())
                .andExpect(jsonPath("$.status").value("NOT_IMPLEMENTED"))
                .andExpect(jsonPath("$.message").isNotEmpty());
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
