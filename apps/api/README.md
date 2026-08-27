# Nisaba API

## Stack

Java 25 + Spring Boot 4 + Maven.

## Dependências iniciais

- Web
- Validation
- Data JPA
- Security
- OAuth2 Resource Server
- Actuator
- Flyway
- PostgreSQL
- Lombok
- Testcontainers

## Rodar

Tenha PostgreSQL disponível:

```bash
mvn spring-boot:run
```

Perfil padrão: `local`.

Produção:

```bash
SPRING_PROFILES_ACTIVE=prod \
SUPABASE_JWT_ISSUER=... \
mvn spring-boot:run
```

## Importante

O caso fiscal mínimo ainda está aberto em `docs/product/OPEN_QUESTIONS.md`.
Por isso, o backend do MVP **não infere alíquota nem declara resultado fiscal
validado**. O endpoint de cenário calcula impacto de margem somente sobre valores
explícitos enviados pelo cliente e retorna `REVIEW_REQUIRED`. Se faltar o tributo
projetado, retorna `INSUFFICIENT_DATA` e não produz totais projetados.

## Contrato mínimo para o frontend

Base path: `/api/v1`. Valores monetários são números decimais em BRL. O frontend
deve identificar dados de fixture como demonstrativos. No perfil `dev`, chamadas
dos endereços padrão do Vite (`localhost:5173` e `127.0.0.1:5173`) estão liberadas
por CORS.

### 1. Cadastrar perfil mínimo

`POST /api/v1/companies`

```json
{
  "cnpj": "12.345.678/0001-90",
  "legalName": "Empresa Demo",
  "taxRegime": "SIMPLES_NACIONAL"
}
```

Valores de `taxRegime`: `SIMPLES_NACIONAL`, `LUCRO_PRESUMIDO` ou `LUCRO_REAL`.
Resposta `201`:

```json
{
  "id": 1,
  "cnpj": "12345678000190",
  "legalName": "Empresa Demo",
  "taxRegime": "SIMPLES_NACIONAL"
}
```

O armazenamento deste slice é em memória e reinicia com o processo. Persistência
completa é P1; a migration existente não foi alterada.

### 2. Simular cenário e obter dashboard/relatório resumido

`POST /api/v1/simulations`

```json
{
  "companyId": 1,
  "targetYear": 2027,
  "userPriceAdjustmentPercent": 5,
  "priorityMetric": "ABSOLUTE_MARGIN_IMPACT",
  "items": [
    {
      "itemId": "SKU-1",
      "description": "Linha demonstrativa",
      "currentRevenue": 1000,
      "currentCost": 600,
      "currentTaxAmount": 100,
      "projectedCost": 600,
      "projectedTaxAmount": 140
    }
  ]
}
```

`priorityMetric` é obrigatório para não resolver silenciosamente a questão de
produto sobre priorização. O único valor suportado neste slice é
`ABSOLUTE_MARGIN_IMPACT`. `projectedTaxAmount` também é sempre input do cliente;
o backend não o calcula.

`items` é o contrato normalizado mínimo para fixture/adapter. Payload bruto de ERP
deve ser convertido para esses campos antes de chamar o core; peculiaridades de
provider não entram neste endpoint.

Resposta `200` (campos centrais):

```json
{
  "status": "REVIEW_REQUIRED",
  "targetYear": 2027,
  "calculationId": "SCENARIO-MARGIN-V1",
  "priorityMetric": "ABSOLUTE_MARGIN_IMPACT",
  "userAssumptions": {
    "USER_PRICE_ADJUSTMENT_PERCENT": 5.00
  },
  "totals": {
    "currentRevenue": 1000.00,
    "projectedRevenue": 1050.00,
    "currentMargin": 300.00,
    "projectedMargin": 310.00,
    "marginImpact": 10.00
  },
  "items": [
    {
      "itemId": "SKU-1",
      "description": "Linha demonstrativa",
      "status": "REVIEW_REQUIRED",
      "currentMargin": 300.00,
      "projectedMargin": 310.00,
      "marginImpact": 10.00,
      "priority": 1,
      "trace": {
        "inputsUsed": {
          "currentRevenue": 1000.00,
          "currentCost": 600.00,
          "currentTaxAmount": 100.00,
          "projectedCost": 600.00,
          "projectedTaxAmount": 140.00,
          "projectedRevenue": 1050.00
        },
        "assumptions": [
          "USER_PRICE_ADJUSTMENT_PERCENT",
          "USER_PROJECTED_COST",
          "USER_PROJECTED_TAX_AMOUNT",
          "USER_PRIORITY_METRIC"
        ],
        "formula": "projectedMargin = projectedRevenue - projectedCost - projectedTaxAmount; marginImpact = projectedMargin - currentMargin",
        "sourceRefs": []
      }
    }
  ],
  "warnings": [
    "Valores tributários projetados são USER_ASSUMPTION e exigem revisão fiscal."
  ]
}
```

Os itens vêm ordenados pelo módulo de `marginImpact`; `priority` começa em `1`.
Se qualquer item omitir `projectedTaxAmount`, a resposta é
`INSUFFICIENT_DATA`, `totals` é `null`, e o item incompleto tem projeções `null`
e `priority: 0`.

### Erros

```json
{
  "code": "VALIDATION_ERROR | NOT_FOUND | CONFLICT",
  "message": "descrição curta"
}
```

- `400`: payload inválido ou campo obrigatório ausente;
- `404`: `companyId` inexistente;
- `409`: CNPJ já cadastrado no processo atual.

### Sequência de integração da demo

1. criar a empresa e guardar o `id` retornado;
2. carregar uma fixture identificada visualmente como demonstrativa;
3. enviar cenário com todos os valores atuais/projetados explícitos;
4. usar `totals` nos cards/relatório e `items` no gráfico;
5. exibir `status`, `warnings` e a natureza `USER_ASSUMPTION` junto do resultado.

O cálculo fiscal real permanece bloqueado até existir regra com fonte, vigência,
aplicabilidade, inputs, handler, golden case e status conforme
`docs/engineering/TAX_RULE_POLICY.md`.
