package br.com.nisaba.api.company;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Service;

@Service
public class CompanyService {

    private final AtomicLong sequence = new AtomicLong();
    private final Map<Long, Company> companies = new ConcurrentHashMap<>();

    public Company create(CreateCompanyRequest request) {
        String normalizedCnpj = request.cnpj().replaceAll("\\D", "");
        boolean alreadyExists = companies.values().stream()
                .anyMatch(company -> company.cnpj().equals(normalizedCnpj));
        if (alreadyExists) {
            throw new IllegalArgumentException("company with this CNPJ already exists");
        }

        long id = sequence.incrementAndGet();
        var company = new Company(id, normalizedCnpj, request.legalName().trim(), request.taxRegime());
        companies.put(id, company);
        return company;
    }

    public Company requireCompany(long id) {
        var company = companies.get(id);
        if (company == null) {
            throw new CompanyNotFoundException(id);
        }
        return company;
    }
}
