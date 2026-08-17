# Política do Motor Tributário

## Fonte da verdade

Preferência:

1. legislação e documentação oficial;
2. tabelas/serviços oficiais;
3. motor/calculadora oficial quando aplicável;
4. fontes privadas apenas como conveniência e nunca como única evidência crítica.

## Rule contract

```yaml
ruleId: string
version: string
status: DRAFT | PROVISIONAL | VALIDATED | DEPRECATED
source:
  title: string
  reference: string
validFrom: date
validTo: date?
applicability:
  regimes: []
  operationTypes: []
inputsRequired: []
output: string
assumptions: []
```

## Resultado rastreável

```json
{
  "value": 0,
  "ruleId": "RULE-X",
  "ruleVersion": "2027.1",
  "inputsUsed": {},
  "assumptions": [],
  "sourceRefs": [],
  "warnings": []
}
```

## Não inferir

Se o sistema não consegue determinar uma classificação de forma segura, deve pedir
input/revisão.

## Cenário ≠ verdade

Se o usuário alterar uma alíquota ou premissa para testar um cenário, o relatório
deve marcar explicitamente:

`USER_ASSUMPTION`

Essa premissa não pode substituir a configuração oficial persistida.
