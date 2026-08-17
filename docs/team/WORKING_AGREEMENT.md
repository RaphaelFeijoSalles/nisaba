# Working Agreement — equipe

## Contexto

A equipe possui níveis diferentes de experiência prática em desenvolvimento.

Isso não é um motivo para concentrar tudo em uma pessoa. A arquitetura deve criar
fronteiras para que cada pessoa consiga ser dona de uma entrega pequena e revisável.

## Distribuição inicial sugerida

### Raphael — responsável técnico / integração
- arquitetura;
- backend;
- regras fiscais;
- migrations;
- revisão de integrações;
- definição dos contratos entre frontend/backend.

**Cuidado:** não assumir todas as features. O papel é definir contratos e revisar o core.

### Gustavo (`gustavobergz`) — integração/backend acompanhado
- primeiro adapter de ERP;
- endpoints simples;
- fixtures;
- testes de integração;
- jobs/paginação após contrato técnico definido.

Estratégia: PRs pequenas + pairing/revisão.

### Sofia (`sofimedeirosz`) — produto, storytelling e frontend visual
- narrativa do pitch;
- fluxo de onboarding;
- wireframes;
- copy;
- componentes/telas alinhados ao design.

### Duda (`dudas00937`) — produto, storytelling e frontend visual
- identidade;
- dashboard;
- gráficos;
- apresentação;
- estados visuais e usabilidade.

### Gabriel (`gabrielzcoder`) — apoio de implementação/QA
Como o nível técnico específico ainda não foi mapeado:
- fixtures;
- testes manuais;
- documentação;
- componentes isolados;
- integração frontend com endpoints simples.

Depois da primeira tarefa, ajustar a responsabilidade conforme o que ele demonstrar.

## Regra de autonomia

Cada pessoa recebe:
1. problema pequeno;
2. interface/contrato claro;
3. exemplos;
4. Definition of Done;
5. arquivo de documentação correspondente.

O agente de IA da pessoa deve ler `AGENTS.md` antes de gerar código.

## Review

- Visual/storytelling: Sofia/Duda revisam entre si.
- Backend/integração: Raphael/Gustavo.
- Regra fiscal: Raphael + evidência externa validada.
- PR cross-cutting: pelo menos uma pessoa de outra área lê antes do merge.

## Daily assíncrona

Mensagem curta:

```text
Fiz:
Vou fazer:
Bloqueio:
PR:
```

Sem reunião longa por padrão.
