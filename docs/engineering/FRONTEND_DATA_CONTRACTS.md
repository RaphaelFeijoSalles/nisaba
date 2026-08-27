# Contratos de dados esperados pelo frontend (rascunho, não fechado)

> Este documento declara o que o frontend **espera** receber, não o que o
> backend **oferece**. Nada aqui é um contrato de API definitivo — é a
> proposta de quem trabalha na UI, para ser negociada com quem define os
> contratos técnicos (ver `docs/team/WORKING_AGREEMENT.md`, papel do
> Raphael). Enquanto o endpoint real não existir, o frontend usa fixtures
> locais.

## Padrão obrigatório: UI → service/hook → mock

Nenhum componente de página lê dado de fixture diretamente. O caminho é
sempre:

```text
componente de página
   → hook (src/hooks/useX.ts, TanStack Query)
      → service (src/services/xService.ts)
         → mock local (src/mocks/xMock.ts)   [hoje]
         → fetch(endpoint real)              [quando existir]
```

Trocar mock por chamada real deve exigir mudar **só** o arquivo de service —
tipos, hook e componente não deveriam precisar mudar se o shape do contrato
for respeitado.

## Dashboard executivo

Arquivos: `src/types/dashboard.ts`, `src/mocks/dashboardMock.ts`,
`src/services/dashboardService.ts`, `src/hooks/useDashboardSummary.ts`.

Endpoint proposto (não implementado):

```text
GET /api/companies/:companyId/dashboard-summary
```

Resposta esperada: `DashboardSummary` (ver `src/types/dashboard.ts` para os
campos exatos). Resumo:

- `kpis`: impacto tributário estimado, produtos em atenção, economia
  potencial, data da última simulação;
- `impactoMensal`: série temporal de carga atual vs. simulada;
- `distribuicaoImpacto`: contagem de produtos por faixa de impacto;
- `margemComparativa`: margem antes/depois por categoria;
- `alertas`: lista de pontos priorizados, com `Prioridade` (`Alta | Média | Baixa`);
- `isDemoData`: `true` enquanto a fonte for fixture — a UI usa esse campo
  para decidir se mostra o aviso de dados demonstrativos
  (`DemoDataNotice`, obrigatório por `AGENTS.md` §2).

## Perguntas em aberto que o backend precisa responder

Estas questões já estão em `docs/product/OPEN_QUESTIONS.md`, mas impactam
diretamente o contrato acima e por isso ficam repetidas aqui:

- o que matematicamente define "alto impacto" na `distribuicaoImpacto`
  (valor absoluto, perda de margem, percentual, combinação)?
- a granularidade de `margemComparativa` é por categoria, por produto ou
  configurável pelo usuário?
- `alertas` vem do motor de regras, de uma heurística separada, ou das
  duas coisas?
- o dashboard é por empresa (`companyId`) ou por cenário/simulação
  específico? O endpoint proposto assume "por empresa, cenário mais
  recente" — pode estar errado.

## Não fazer

- Não hardcodar dado fiscal em componente de página — sempre via
  hook/service.
- Não remover `isDemoData`/`DemoDataNotice` de uma tela até o dado vir de
  um endpoint real e validado.
- Não inventar campos novos no tipo sem atualizar este documento.
