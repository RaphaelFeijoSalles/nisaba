# ADRs

## ADR-001 — Monorepo
**Status:** Aceito

Web, API, docs e ruleset no mesmo repositório para reduzir coordenação durante o hackathon.

## ADR-002 — React SPA
**Status:** Aceito para o MVP

React + Vite + React Router. Next.js só entra se requisito concreto justificar.

## ADR-003 — Java/Spring no backend
**Status:** Aceito

O risco do projeto está em regras, ETL, integrações e rastreabilidade. O backend será
concentrado em uma stack que o responsável técnico domina.

## ADR-004 — LLM depois do motor
**Status:** Aceito

A IA explica resultados; não define verdade fiscal.

## ADR-005 — Um ERP primeiro
**Status:** Aceito

A arquitetura prevê vários adapters; o MVP implementa um antes de espalhar esforço.

## ADR-006 — Sistema visual adaptado do protótipo Lovable
**Status:** Aceito

O protótipo `nisaba-lovable` (TanStack Start) tinha um design system forte
(tokens Tailwind v4 em OKLCH, tipografia Space Grotesk/Plus Jakarta Sans,
`AppShell`, cards de estatística, gráficos Recharts) construído para uma
marca fictícia ("Sistema Lumen").

Decisão: portar o design system para `apps/web` (React Router, arquitetura
já aceita em ADR-002), sem herdar a estrutura de rotas do TanStack Start nem
as páginas que não existem no `SCOPE.md` do MVP (Fornecedores, Legislação,
Relatórios, Configurações). Só entraram componentes/telas para rotas que já
existiam em `App.tsx`.

Paleta re-derivada do `docs/brand/NISABA_BRAND_MANIFESTO.md`: azul
lápis-lazúli como cor institucional e terracota como cor de sinalização,
em vez do laranja/azul-petróleo genéricos do template. O tema claro
(`:root`) atende telas públicas/onboarding; o tema escuro (`.dark`) é usado
só no shell autenticado (dashboard/simulação), onde a cor primária e a de
sinalização trocam de papel (terracota vira a cor de ação sobre fundo
escuro).

Dados do dashboard passaram a seguir o padrão UI → hook → service → mock
(ver `docs/engineering/FRONTEND_DATA_CONTRACTS.md`), para que a troca por um
endpoint real não exija reescrever componente.
