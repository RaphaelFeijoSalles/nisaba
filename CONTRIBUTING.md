# Contribuindo

## Fluxo

Nunca trabalhar diretamente em `main`.

```text
main
└── hackathon/mvp                 somente integrador
    ├── feat/HACK-xxx-nome-curto
    ├── fix/HACK-xxx-nome-curto
    ├── docs/HACK-xxx-nome-curto
    ├── chore/HACK-xxx-nome-curto
    └── spike/HACK-xxx-nome-curto
```

Exemplos:

```text
feat/HACK-101-company-onboarding
feat/HACK-102-impact-chart
feat/HACK-103-bling-adapter
docs/HACK-104-pitch-story
fix/HACK-105-simulation-validation
```

Durante o hackathon, somente o integrador atualiza `hackathon/mvp`. Ownership,
hot files e handoff estão definidos em `docs/team/HACKATHON_WORKFLOW.md`.

## Tamanho de PR

Preferir PRs pequenas, revisáveis e com uma responsabilidade principal.

## Commits

Sugestão:

```text
feat: adiciona onboarding da empresa
fix: impede duplicação de documento fiscal
docs: atualiza hipótese do plano premium
test: adiciona golden case da regra X
refactor: separa adapter do domínio
```

## Definition of Done

Uma tarefa termina quando:

- [ ] comportamento implementado;
- [ ] build passa;
- [ ] testes relevantes passam;
- [ ] estados de erro foram tratados;
- [ ] documentação foi atualizada;
- [ ] nenhum segredo foi commitado;
- [ ] PR/handoff explica decisões, checks, pendências, riscos e integração.

## Regras tributárias

Mudanças em cálculo, classificação, normalização fiscal ou migração de banco exigem revisão técnica adicional.
