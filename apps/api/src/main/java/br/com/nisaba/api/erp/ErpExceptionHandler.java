package br.com.nisaba.api.erp;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(assignableTypes = ErpController.class)
public class ErpExceptionHandler {

    @ExceptionHandler(UnsupportedProviderException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    Map<String, String> unsupportedProvider(UnsupportedProviderException exception) {
        return Map.of("code", "UNSUPPORTED_PROVIDER", "message", exception.getMessage());
    }

    @ExceptionHandler(InvalidSyncCursorException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    Map<String, String> invalidCursor(InvalidSyncCursorException exception) {
        return Map.of("code", "INVALID_CURSOR", "message", exception.getMessage());
    }

    @ExceptionHandler(FixtureLoadException.class)
    @ResponseStatus(HttpStatus.BAD_GATEWAY)
    Map<String, String> fixtureLoad(FixtureLoadException exception) {
        return Map.of("code", "FIXTURE_LOAD_ERROR", "message", exception.getMessage());
    }
}
