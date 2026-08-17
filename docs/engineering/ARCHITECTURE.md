# Arquitetura do MVP

## Stack

### Web
- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- Zod
- Recharts

### API
- Java 25
- Spring Boot 4
- Maven
- Spring Web
- Bean Validation
- Spring Data JPA
- Spring Security
- OAuth2 Resource Server
- Actuator
- Flyway
- PostgreSQL
- Lombok

### Infra
- Vercel: frontend;
- Render/Fly.io: API, conforme custo/região;
- Supabase: PostgreSQL/Auth, se mantido como escolha;
- nenhum Redis/Kafka inicialmente.

## Por que SPA e não Next.js agora?

A aplicação principal é um dashboard autenticado. SSR/SEO não é requisito central do
produto neste momento.

React + Vite + React Router reduz superfície de complexidade.

Reavaliar Next.js somente se surgir requisito concreto de:
- SSR;
- páginas públicas SEO-heavy;
- React Server Components;
- backend-for-frontend realmente necessário.

## Diagrama

```text
                WEB
                 |
                 v
              REST API
                 |
       +---------+----------+
       |                    |
       v                    v
   Auth/Company        Import Jobs
                            |
                  +---------+---------+
                  |                   |
                  v                   v
               ERP Adapter         File/XML
                  |                   |
                  +---------+---------+
                            |
                            v
                    Normalized Model
                            |
                            v
                      Enrichment
                            |
                            v
                  Versioned Rule Engine
                            |
                            v
                       Simulation
                            |
                            v
                    Impact Aggregation
                      /      |       \
                     v       v        v
                  cards    charts   report
                                      |
                                      v
                               AI explanation
```

## Princípio

A IA está **depois** do cálculo.

A integração está **antes** do domínio.

O domínio não conhece Bling/Omie/Conta Azul.
