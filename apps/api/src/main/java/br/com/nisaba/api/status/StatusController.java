package br.com.nisaba.api.status;

import java.time.Instant;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/status")
public class StatusController {

    @GetMapping
    Map<String, Object> status() {
        return Map.of(
                "service", "nisaba-api",
                "status", "ok",
                "timestamp", Instant.now().toString()
        );
    }
}
