CREATE TABLE company (
    id BIGSERIAL PRIMARY KEY,
    cnpj VARCHAR(14) NOT NULL UNIQUE,
    legal_name VARCHAR(180) NOT NULL,
    tax_regime VARCHAR(40) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE simulation (
    id BIGSERIAL PRIMARY KEY,
    company_id BIGINT NOT NULL REFERENCES company(id),
    target_year INTEGER NOT NULL,
    rule_set_version VARCHAR(80) NOT NULL,
    status VARCHAR(40) NOT NULL,
    assumptions_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_simulation_company_created
    ON simulation(company_id, created_at DESC);
