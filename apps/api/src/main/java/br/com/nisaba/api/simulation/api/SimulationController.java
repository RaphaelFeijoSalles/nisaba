package br.com.nisaba.api.simulation.api;

import java.util.Map;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/simulations")
public class SimulationController {

    @PostMapping
    @ResponseStatus(HttpStatus.NOT_IMPLEMENTED)
    Map<String, Object> create(@Valid @RequestBody CreateSimulationRequest request) {
        return Map.of(
                "status", "NOT_IMPLEMENTED",
                "message", "O motor só será ativado após definição e validação do primeiro caso fiscal."
        );
    }
}
