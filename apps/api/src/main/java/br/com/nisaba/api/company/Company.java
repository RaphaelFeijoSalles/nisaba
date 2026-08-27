package br.com.nisaba.api.company;

public record Company(long id, String cnpj, String legalName, TaxRegime taxRegime) {
}
