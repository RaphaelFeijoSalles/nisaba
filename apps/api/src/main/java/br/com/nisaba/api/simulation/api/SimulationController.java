package br.com.nisaba.api.simulation.api;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import br.com.nisaba.api.company.CompanyService;
import br.com.nisaba.api.simulation.core.SimulationResult;
import br.com.nisaba.api.simulation.core.SimulationService;

@RestController
@RequestMapping("/api/v1/simulations")
public class SimulationController {

    private final CompanyService companyService;
    private final SimulationService simulationService;

    public SimulationController(CompanyService companyService, SimulationService simulationService) {
        this.companyService = companyService;
        this.simulationService = simulationService;
    }

    @PostMapping
    SimulationResult create(@Valid @RequestBody CreateSimulationRequest request) {
        companyService.requireCompany(request.companyId());
        return simulationService.simulate(request);
    }
}
