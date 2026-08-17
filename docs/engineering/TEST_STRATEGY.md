# Estratégia de Testes

## Unit
- parsers;
- normalização;
- regras;
- fórmulas;
- prioridade.

## Contract tests
Um conjunto de fixtures por ERP.

Objetivo: provar que payloads diferentes geram o mesmo modelo interno.

## Integration
- Postgres;
- migrations;
- endpoints;
- import jobs;
- segurança.

## Golden cases

Toda regra fiscal precisa de caso esperado verificável:

```text
input conhecido
+ ruleVersion
→ output esperado
```

O caso deve registrar a fonte ou validação humana usada.

## Regra

Sem golden case, a regra não passa de `PROVISIONAL`.
