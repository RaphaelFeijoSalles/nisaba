package br.com.nisaba.api.company;

public class CompanyNotFoundException extends RuntimeException {
    public CompanyNotFoundException(long id) {
        super("company " + id + " not found");
    }
}
