# Nisaba

> Clareza no presente. Previsão no futuro.

Nisaba é uma plataforma de apoio à decisão para pequenas e médias empresas durante a transição da Reforma Tributária do Consumo.

A proposta do produto não é ser "mais uma calculadora tributária". O fluxo de valor é:

```text
dados empresariais/fiscais
        ↓
normalização
        ↓
regras suportadas e versionadas
        ↓
simulação
        ↓
impacto financeiro
        ↓
priorização
        ↓
cenários de decisão
```

## Origem do projeto

O Nisaba nasceu em um hackathon de curta duração, desenvolvido sob a restrição de uma única manhã como exercício de produto e engenharia aplicado ao contexto contábil e tributário brasileiro.

Durante o hackathon, Raphael Feijó Salles coordenou a direção técnica da equipe, ajudando a transformar regras e necessidades do domínio contábil em requisitos de produto, arquitetura e fluxo de implementação.

O desafio não era simplesmente criar uma calculadora de impostos, mas estruturar um sistema capaz de transformar dados fiscais em cenários de impacto financeiro rastreáveis e úteis para a tomada de decisão de pequenas e médias empresas.

O MVP foi estruturado com:

- **Backend:** Java, Spring Boot, Maven, Spring Data JPA, Spring Security e PostgreSQL;
- **Frontend:** React, TypeScript, Vite, React Router, TanStack Query e Recharts;
- **Produto e domínio:** normalização de dados, regras versionadas, simulação, análise de impacto financeiro e comparação de cenários;
- **Coordenação técnica:** definição de arquitetura, organização do fluxo de trabalho e priorização do escopo sob forte restrição de tempo.

Mais do que a quantidade de funcionalidades entregues, o projeto demonstra a capacidade de traduzir um problema de negócio em uma solução técnica estruturada, coordenar decisões em equipe e construir uma base evolutiva sob pressão de tempo.

## Regra de ouro

**Nenhum número crítico existe sem rastreabilidade.**

Todo resultado deve conseguir responder:

```text
input
→ normalização
→ regra aplicada
→ versão/vigência
→ fórmula
→ resultado
→ premissas
→ fonte
```

## Estrutura

```text
apps/
  web/                 React + TypeScript + Vite + React Router
  api/                 Java + Spring Boot + Maven

docs/
  product/
  engineering/
  brand/
  team/

rules/                  especificações versionadas das regras
.project/               continuidade operacional do hackathon
.github/                CI, CODEOWNERS e templates
```

## Antes de codar

Leia:

1. `AGENTS.md`
2. `docs/product/PROJECT_DOSSIER.md`
3. `docs/product/SCOPE.md`
4. `docs/engineering/ARCHITECTURE.md`
5. `docs/team/WORKING_AGREEMENT.md`
6. `docs/team/HACKATHON_WORKFLOW.md`

Para alteração fiscal:
7. `docs/engineering/TAX_RULE_POLICY.md`
8. `rules/README.md`

Para alteração visual relevante:
- `docs/brand/FRONTEND_DIRECTION.md`

## Rodando o frontend

Requisito recomendado: Node.js 22+.

```bash
cd apps/web
npm install
npm run dev
```

## Rodando o backend

Requisitos:
- Java 25
- Maven 3.6.3+

```bash
cd apps/api
mvn spring-boot:run
```

O perfil padrão é `local`.

## Status

Starter técnico de MVP/hackathon. Nenhuma hipótese tributária deve ser tratada como regra validada sem fonte e caso de teste.
