# Nisaba API

## Stack

Java 25 + Spring Boot 4 + Maven.

## Dependências iniciais

- Web
- Validation
- Data JPA
- Security
- OAuth2 Resource Server
- Actuator
- Flyway
- PostgreSQL
- Lombok
- Testcontainers

## Rodar

Tenha PostgreSQL disponível:

```bash
mvn spring-boot:run
```

Perfil padrão: `local`.

Produção:

```bash
SPRING_PROFILES_ACTIVE=prod \
SUPABASE_JWT_ISSUER=... \
mvn spring-boot:run
```

## Importante

O endpoint de simulação está propositalmente como `NOT_IMPLEMENTED`.
Não existe motor confiável antes do primeiro caso fiscal ser validado.
