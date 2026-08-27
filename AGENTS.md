# AGENTS.md — Regras para agentes de IA

Este arquivo é vinculante para qualquer agente que altere o repositório.

## 1. Leitura obrigatória antes de editar

1. `README.md`
2. `docs/product/PROJECT_DOSSIER.md`
3. `docs/product/SCOPE.md`
4. documento de engenharia relacionado à tarefa
5. `docs/team/WORKING_AGREEMENT.md`
6. `docs/team/HACKATHON_WORKFLOW.md`
7. `docs/product/OPEN_QUESTIONS.md`

Para trabalho visual relevante, leia também `docs/brand/FRONTEND_DIRECTION.md`.

## 2. Escopo e autonomia

- A documentação do Nisaba é a fonte de verdade sobre produto, requisitos,
  arquitetura e funcionalidades. Em caso de conflito, pare e registre a dúvida.
- Implemente somente a tarefa atribuída e respeite o ownership nela definido.
- Não reinvente a arquitetura nem troque stack, padrões ou contratos existentes
  sem decisão explícita do responsável.
- Não altere contrato compartilhado, migration, configuração ou hot file
  silenciosamente. Combine com o integrador ou registre a necessidade no handoff.
- Não leia, edite, gere, rotacione ou exponha secrets. Use apenas exemplos e nomes
  de variáveis documentados.
- Melhoria adjacente só entra quando for pequena, local, reversível, segura e
  testável. Caso contrário, registre como pendência; não aumente o escopo.
- Velocidade e integração do MVP prevalecem sobre perfeição arquitetural. Não
  antecipe infraestrutura ou gates de produção sem necessidade do P0.
- Preserve alterações existentes e comece investigações com operações de leitura.

## 3. Proibições

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

## 4. Regras fiscais

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

## 5. Falta de informação

Quando não houver dados suficientes:

- retornar `INSUFFICIENT_DATA`;
- quando o caso não for suportado, `UNSUPPORTED_CASE`;
- quando exigir revisão, `REVIEW_REQUIRED`.

Nunca "completar" o resultado com uma suposição silenciosa.

## 6. Integrações

Todo ERP implementa uma interface/adapter comum.

Não alterar o domínio para acomodar a peculiaridade de um ERP. A peculiaridade deve ficar no adapter.

## 7. Documentação viva

Mudou regra de negócio? Atualize documentação.

Mudou arquitetura? Registre em ADR.

Mudou contrato da API? Atualize exemplos/testes.

## 8. Antes de entregar

- execute os checks focais da área alterada e o build/teste mais amplo que couber
  no tempo e no risco da tarefa;
- não declare um check que não foi executado e explique qualquer omissão;
- revise o diff para secrets, arquivos gerados e mudanças fora do ownership;
- produza o handoff objetivo definido em `docs/team/HACKATHON_WORKFLOW.md`.

## 9. Pull request

Toda PR deve declarar:

- problema resolvido;
- arquivos/documentos consultados;
- hipóteses;
- impacto arquitetural;
- testes;
- limitações conhecidas.
