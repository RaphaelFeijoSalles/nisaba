package br.com.nisaba.api.erp;

public class UnsupportedProviderException extends RuntimeException {

    public UnsupportedProviderException(String provider) {
        super("provider not supported: " + provider);
    }
}
