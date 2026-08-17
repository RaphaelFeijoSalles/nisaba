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
.github/                CI, CODEOWNERS e templates
```

## Antes de codar

Leia:

1. `AGENTS.md`
2. `docs/product/PROJECT_DOSSIER.md`
3. `docs/product/SCOPE.md`
4. `docs/engineering/ARCHITECTURE.md`
5. `docs/team/WORKING_AGREEMENT.md`

Para alteração fiscal:
6. `docs/engineering/TAX_RULE_POLICY.md`
7. `rules/README.md`

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
