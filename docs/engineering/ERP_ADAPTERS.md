# ERP Adapters

## Objetivo

Bling, Omie e Conta Azul podem ter autenticação, paginação, filtros e payloads
diferentes. O restante do sistema deve enxergar um único contrato.

```java
public interface FiscalDocumentProvider {
    SyncPage fetchDocuments(SyncRequest request);
}
```

Cada adapter traduz o provider para o modelo interno.

## Ordem recomendada

1. fixtures/arquivo;
2. 1 ERP real ponta a ponta;
3. estabilizar o modelo normalizado;
4. segundo ERP;
5. terceiro ERP.

## Jobs assíncronos

Não manter uma requisição HTTP aberta enquanto meses/páginas são consumidos.

```text
POST /imports
→ 202 + jobId

GET /imports/{jobId}
→ status/progresso/erros
```

## Rate limit

Não usar `sleep(1s)` universal.

Configurar por provider:
- limite;
- burst;
- Retry-After;
- backoff;
- timeout;
- concorrência.

## Persistência

Notas/documentos importados são dado de negócio/auditoria, não cache descartável.

Cache é mais indicado para:
- tabelas referenciais;
- classificações;
- parâmetros;
- consultas repetitivas de enriquecimento.
