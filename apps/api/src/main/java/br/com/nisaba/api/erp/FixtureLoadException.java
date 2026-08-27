package br.com.nisaba.api.erp;

public class FixtureLoadException extends RuntimeException {

    public FixtureLoadException(String provider, String cursor, Throwable cause) {
        super("failed to load fixture for provider " + provider + " and cursor " + cursor, cause);
    }
}
