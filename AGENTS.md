# AGENTS.md — Regras para agentes de IA

Este arquivo é vinculante para qualquer agente que altere o repositório.

## 1. Leitura obrigatória antes de editar

1. `README.md`
2. `docs/product/PROJECT_DOSSIER.md`
3. `docs/product/SCOPE.md`
4. documento de engenharia relacionado à tarefa
5. `docs/team/WORKING_AGREEMENT.md`
6. `docs/product/OPEN_QUESTIONS.md`

## 2. Proibições

O agente NÃO deve:

- inventar alíquota, classificação, benefício, crédito ou regra tributária;
- assumir que setor sozinho determina tratamento tributário;
- tratar NCM/NBS/cClassTrib como suficientes para toda decisão fiscal;
- hardcodar "26,5%" como verdade universal;
- inferir silenciosamente um campo obrigatório que está ausente;
- fazer LLM calcular tributo;
- acoplar o domínio ao payload bruto de um ERP;
- adicionar infraestrutura pesada sem necessidade demonstrada;
- criar feature que ultrapasse o escopo documentado sem atualizar o dossiê;
- apresentar dados de demonstração como resultados fiscais reais.

## 3. Regras fiscais

Toda regra nova precisa de:

- `ruleId`;
- descrição;
- fonte;
- vigência;
- aplicabilidade;
- inputs obrigatórios;
- fórmula/handler;
- ao menos um caso de teste esperado;
- status: `DRAFT`, `PROVISIONAL`, `VALIDATED` ou `DEPRECATED`.

Sem isso, a regra não entra no motor.

## 4. Falta de informação

Quando não houver dados suficientes:

- retornar `INSUFFICIENT_DATA`;
- quando o caso não for suportado, `UNSUPPORTED_CASE`;
- quando exigir revisão, `REVIEW_REQUIRED`.

Nunca "completar" o resultado com uma suposição silenciosa.

## 5. Integrações

Todo ERP implementa uma interface/adapter comum.

Não alterar o domínio para acomodar a peculiaridade de um ERP. A peculiaridade deve ficar no adapter.

## 6. Documentação viva

Mudou regra de negócio? Atualize documentação.

Mudou arquitetura? Registre em ADR.

Mudou contrato da API? Atualize exemplos/testes.

## 7. Pull request

Toda PR deve declarar:

- problema resolvido;
- arquivos/documentos consultados;
- hipóteses;
- impacto arquitetural;
- testes;
- limitações conhecidas.
