# Configuração do Nisaba API

Coloque todos os arquivos `.properties` em:

`apps/api/src/main/resources/`

Copie `secret.example.properties` para `secret.properties`.

O `application-dev.properties` importa `secret.properties` com:

```properties
spring.config.import=optional:file:./secret.properties```

## Local

```bash
mvn spring-boot:run
```

O perfil padrão é `dev`.

## Produção

Configure no provedor:

```text
SPRING_PROFILES_ACTIVE=prod
DB_URL=...
DB_USERNAME=...
DB_PASSWORD=...
SUPABASE_JWT_ISSUER=...
```

## Testes

```bash
mvn test -Dspring.profiles.active=test
```

Para testes de banco, prefira Testcontainers/PostgreSQL real.
