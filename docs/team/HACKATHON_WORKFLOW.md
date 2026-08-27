# Workflow do hackathon

## Objetivo

Cinco computadores e cinco workers (quatro Codex e um Claude) desenvolvem em
paralelo a partir da mesma versão remota. O objetivo é integrar um MVP funcional
com pouco conflito: **velocidade e integração > perfeição arquitetural**.

Este documento rege o fluxo operacional. Produto, escopo e arquitetura continuam
definidos pela documentação do Nisaba.

## Uma tarefa, um owner, uma branch

Antes de começar, cada tarefa deve informar objetivo, critérios de aceite,
ownership de diretórios/arquivos e como validar. Use
`docs/team/ISSUE_TEMPLATE.md` quando for útil.

Crie uma branch a partir da referência remota combinada para o hackathon:

```text
feat/HACK-123-descricao-curta
fix/HACK-123-descricao-curta
docs/HACK-123-descricao-curta
chore/HACK-123-descricao-curta
spike/HACK-123-descricao-curta
```

Regras:

- uma branch por tarefa;
- nenhum worker faz commit na branch de outro worker;
- nenhum worker faz push direto em `main`;
- somente o integrador atualiza `hackathon/mvp`;
- commits devem ser pequenos e relacionados à tarefa;
- não misture correções oportunistas sem relação com o objetivo.

## Ownership e arquivos compartilhados

O ownership da tarefa é explícito, mesmo que temporário. O worker pode editar
somente os caminhos atribuídos.

Contratos de API, modelos compartilhados, rotas centrais, migrations, manifests
de dependências, lockfiles, configuração global, documentação transversal e
outros arquivos disputados são **hot files**. Por padrão, pertencem ao integrador
ou exigem combinação explícita antes da edição.

Se descobrir uma alteração necessária fora do ownership:

1. não a faça silenciosamente;
2. registre caminho, motivo e mudança sugerida no handoff;
3. avise o integrador imediatamente se ela bloquear a tarefa.

Alteração previamente combinada de contrato compartilhado deve atualizar seus
exemplos/testes e ser destacada no handoff. Nunca tente resolver conflito mudando
o contrato unilateralmente.

## Checks proporcionais

Execute primeiro os checks focais da área alterada. Antes do handoff, rode os
checks mais amplos relevantes que couberem no prazo. Registre exatamente comandos
e resultados; se algo não foi executado, diga por quê.

Referências atuais:

```bash
# frontend
cd apps/web
npm run lint
npm run build

# backend
cd apps/api
mvn test -Dspring.profiles.active=test
```

Não instale ferramentas, serviços ou gates novos apenas para completar o ritual.

## Handoff mínimo

O handoff pode ser o corpo da PR ou uma mensagem ao integrador; não exige um novo
arquivo por tarefa. Use este formato curto:

```text
Task:
Branch:
Objetivo:
Arquivos principais modificados:
Comportamento implementado:
Decisões tomadas:
Dependências adicionadas: nenhuma | ...
Migrations/config necessárias: nenhuma | ...
Testes/checks executados:
Pendências:
Riscos:
Instruções de integração:
```

Inclua mudanças necessárias fora do ownership em `Pendências` e conflitos ou
ordem especial de aplicação em `Instruções de integração`. Um handoff deve permitir
ao integrador revisar e incorporar a branch sem reconstruir o contexto.

## Memória sem burocracia

Reutilizamos a estrutura existente:

- tarefa e ownership: issue ou `docs/team/ISSUE_TEMPLATE.md`;
- decisão arquitetural durável: `docs/engineering/ADR.md`;
- handoff: PR ou mensagem no formato acima;
- estado de integração entre sessões: `.project/continuity.md`.

Não foram criadas pastas paralelas de tasks, reports ou decisions. Somente o
integrador mantém `continuity.md`, como quadro curto do estado atual, não como log
histórico nem substituto do Git/GitHub.

## Fluxo de integração

```text
tarefa com ownership
→ branch HACK-xxx
→ implementação e checks focais
→ handoff/PR
→ revisão do integrador
→ integração em hackathon/mvp pelo integrador
```

O integrador resolve a ordem entre branches, coordena hot files e atualiza a
continuidade. Nenhum worker faz merge ou push em `hackathon/mvp` por conta própria.
