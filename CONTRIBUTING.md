# Contribuindo

## Fluxo

Nunca trabalhar diretamente em `main`.

```text
main
└── feat/nome-curto
└── fix/nome-curto
└── docs/nome-curto
└── test/nome-curto
```

Exemplos:

```text
feat/company-onboarding
feat/impact-chart
feat/bling-adapter
docs/pitch-story
fix/simulation-validation
```

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
- [ ] PR explica hipóteses e limitações.

## Regras tributárias

Mudanças em cálculo, classificação, normalização fiscal ou migração de banco exigem revisão técnica adicional.
