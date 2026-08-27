# HACK-080 — comandos de demo backend

Objetivo: demonstrar o fluxo backend por terminal ou Postman em menos de 1 minuto,
usando apenas o contrato atual e fixtures demonstrativas.

## 0. Subir a API local

Em um terminal:

```powershell
cd C:\Users\minez\OneDrive\Documentos\nisaba\nisaba
docker compose up -d postgres
cd apps\api
$env:DB_URL="jdbc:postgresql://localhost:9090/nisaba"
$env:DB_USERNAME="nisaba"
$env:DB_PASSWORD="nisaba"
$env:JAVA_HOME="C:\Program Files\Java\jdk-25.0.4.1"
$env:Path="$env:JAVA_HOME\bin;$env:Path"
mvn spring-boot:run
```

Use outro terminal para os comandos abaixo.

## 1. Criar empresa

```powershell
curl.exe -i -X POST "http://localhost:8080/api/v1/companies" `
  -H "Content-Type: application/json" `
  -d '{
    "cnpj": "12.345.678/0001-90",
    "legalName": "Empresa Demo ERP",
    "taxRegime": "SIMPLES_NACIONAL"
  }'
```

Resposta esperada:

```json
{
  "id": 1,
  "cnpj": "12345678000190",
  "legalName": "Empresa Demo ERP",
  "taxRegime": "SIMPLES_NACIONAL"
}
```

Se repetir a demo no mesmo processo da API, reinicie a API ou troque o CNPJ para
evitar `409 CONFLICT`.

## 2. Consultar documentos Bling

```powershell
curl.exe -i "http://localhost:8080/api/v1/erp/providers/bling/documents"
```

Resposta esperada, campos centrais:

```json
{
  "documents": [
    {
      "externalId": "9132456789",
      "documentNumber": "NF-2026-1048",
      "issuedDate": "2026-08-20",
      "counterpartyName": "Padaria Aurora Ltda",
      "counterpartyDocument": "12345678000190",
      "totalAmount": 1340.50,
      "totalTaxAmount": 214.73,
      "items": [
        {
          "sku": "SKU-CAF-500",
          "description": "Cafe torrado 500g",
          "quantity": 30,
          "lineAmount": 567.00
        }
      ]
    }
  ],
  "nextCursor": "page-2"
}
```

Para a segunda página:

```powershell
curl.exe -i "http://localhost:8080/api/v1/erp/providers/bling/documents?cursor=page-2"
```

## 3. Executar simulação

Este payload usa os dois documentos da primeira página do Bling já convertidos
para o formato esperado por `POST /api/v1/simulations`.

```powershell
curl.exe -i -X POST "http://localhost:8080/api/v1/simulations" `
  -H "Content-Type: application/json" `
  -d '{
    "companyId": 1,
    "targetYear": 2027,
    "userPriceAdjustmentPercent": 5,
    "priorityMetric": "ABSOLUTE_MARGIN_IMPACT",
    "items": [
      {
        "itemId": "NF-2026-1048",
        "description": "Padaria Aurora Ltda",
        "currentRevenue": 1340.50,
        "currentCost": 804.30,
        "currentTaxAmount": 214.73,
        "projectedCost": 804.30,
        "projectedTaxAmount": 244.73
      },
      {
        "itemId": "NF-2026-1049",
        "description": "Mercado Ponte Nova ME",
        "currentRevenue": 980.00,
        "currentCost": 588.00,
        "currentTaxAmount": 156.31,
        "projectedCost": 588.00,
        "projectedTaxAmount": 186.31
      }
    ]
  }'
```

Resposta esperada, campos centrais:

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
    "currentRevenue": 2320.50,
    "projectedRevenue": 2436.53,
    "currentMargin": 557.16,
    "projectedMargin": 613.19,
    "marginImpact": 56.03
  },
  "items": [
    {
      "itemId": "NF-2026-1048",
      "description": "Padaria Aurora Ltda",
      "status": "REVIEW_REQUIRED",
      "currentMargin": 321.47,
      "projectedMargin": 358.50,
      "marginImpact": 37.03,
      "priority": 1,
      "trace": {
        "assumptions": [
          "USER_PRICE_ADJUSTMENT_PERCENT",
          "USER_PROJECTED_COST",
          "USER_PROJECTED_TAX_AMOUNT",
          "USER_PRIORITY_METRIC"
        ]
      }
    },
    {
      "itemId": "NF-2026-1049",
      "status": "REVIEW_REQUIRED",
      "marginImpact": 19.00,
      "priority": 2
    }
  ],
  "warnings": [
    "Valores tributários projetados são USER_ASSUMPTION e exigem revisão fiscal."
  ]
}
```

## 4. Verificação automatizada

O smoke test executável do mesmo fluxo é:

```powershell
cd C:\Users\minez\OneDrive\Documentos\nisaba\nisaba\apps\api
$env:JAVA_HOME="C:\Program Files\Java\jdk-25.0.4.1"
$env:Path="$env:JAVA_HOME\bin;$env:Path"
mvn -B -ntp test -Dspring.profiles.active=test -Dtest=BackendFlowSmokeTest
```

Para a suíte backend completa:

```powershell
mvn -B -ntp test -Dspring.profiles.active=test
```

## Observações de demo

- Os documentos Bling são fixtures demonstrativas.
- `projectedTaxAmount`, `projectedCost` e `userPriceAdjustmentPercent` são
  premissas explícitas do usuário.
- O backend retorna `REVIEW_REQUIRED` porque não há regra fiscal validada nova.
- Não há persistência completa neste slice; a empresa criada fica em memória no
  processo da API.
