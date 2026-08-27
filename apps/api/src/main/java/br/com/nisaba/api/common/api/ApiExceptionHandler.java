package br.com.nisaba.api.common.api;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import br.com.nisaba.api.company.CompanyNotFoundException;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(CompanyNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    Map<String, String> notFound(CompanyNotFoundException exception) {
        return Map.of("code", "NOT_FOUND", "message", exception.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    Map<String, String> conflict(IllegalArgumentException exception) {
        return Map.of("code", "CONFLICT", "message", exception.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    Map<String, String> invalid(MethodArgumentNotValidException exception) {
        var fieldError = exception.getBindingResult().getFieldErrors().stream().findFirst();
        String message = fieldError
                .map(error -> error.getField() + " " + error.getDefaultMessage())
                .orElse("invalid request");
        return Map.of("code", "VALIDATION_ERROR", "message", message);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    Map<String, String> unreadable(HttpMessageNotReadableException exception) {
        return Map.of("code", "VALIDATION_ERROR", "message", "malformed JSON or unsupported enum value");
    }
}
