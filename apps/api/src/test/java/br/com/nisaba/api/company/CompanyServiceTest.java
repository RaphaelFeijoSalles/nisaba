package br.com.nisaba.api.company;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.Test;

class CompanyServiceTest {

    private final CompanyService service = new CompanyService();

    @Test
    void createsCompanyWithNormalizedCnpj() {
        var company = service.create(new CreateCompanyRequest(
                "12.345.678/0001-90", "Empresa Demo", TaxRegime.SIMPLES_NACIONAL));

        assertThat(company.id()).isPositive();
        assertThat(company.cnpj()).isEqualTo("12345678000190");
    }

    @Test
    void rejectsDuplicateCnpj() {
        var request = new CreateCompanyRequest(
                "12.345.678/0001-90", "Empresa Demo", TaxRegime.SIMPLES_NACIONAL);
        service.create(request);

        assertThatThrownBy(() -> service.create(request))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("already exists");
    }
}
