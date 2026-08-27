# GitHub — criação do repositório, membros e ruleset

## Recomendação para o hackathon

Criar **um repositório privado** chamado `nisaba`.

### Observação importante de plano

Em repositório privado, proteção de branch/rulesets avançados dependem do plano do GitHub.
Se o plano usado não permitir aplicar o ruleset abaixo, mantenha o mesmo processo como
**acordo obrigatório da equipe** e não façam push direto em `main`.

## 1. Criar repositório

No GitHub:

1. `New repository`
2. Nome: `nisaba`
3. Visibility: `Private`
4. Não inicializar README/LICENSE se este starter será enviado como primeiro push.
5. Criar.

Depois:

```bash
git init
git add .
git commit -m "chore: bootstrap Nisaba repository"
git branch -M main
git remote add origin <URL_DO_REPOSITORIO>
git push -u origin main
```

---

## 2. Adicionar colaboradores

`Repository -> Settings -> Collaborators / Collaborators & teams -> Add people`

Adicionar:

- `gustavobergz`
- `sofimedeirosz`
- `dudas00937`
- `gabrielzcoder`

### Permissões recomendadas

Para hackathon, **todos recebem Write**.

Não dar `Admin` para ninguém além do responsável pelo repositório neste momento.

Motivo: todos precisam criar branches, abrir PRs e colaborar, mas não precisam alterar
segredos, regras de proteção, visibilidade ou configurações destrutivas do repositório.

Se o repositório estiver em conta pessoal, o GitHub oferece menos granularidade:
owner + collaborators. Nesse caso, os quatro entram como collaborators e o controle
principal vem do ruleset/processo.

---

## 3. Ruleset para `main`

Se o plano permitir:

`Settings -> Rules -> Rulesets -> New branch ruleset`

Nome:

```text
protect-main
```

Enforcement:

```text
Active
```

Target:

```text
Include default branch
```

### Ativar

- Restrict deletions
- Block force pushes
- Require a pull request before merging
- Required approvals: **1**
- Dismiss stale pull request approvals when new commits are pushed
- Require conversation resolution before merging
- Require status checks to pass
  - `frontend`
  - `backend`
- Require branches to be up to date before merging
- Require code scanning: **não ativar agora**
- Require signed commits: **não ativar agora**
- Require deployments: **não ativar agora**

### Code owner review

Durante o hackathon, **não exigir Code Owner approval globalmente**.

O `CODEOWNERS` deve servir para chamar a pessoa certa para revisar. Torná-lo obrigatório
pode transformar um único membro em gargalo quando o prazo estiver apertado.

Para alterações críticas (`apps/api`, `rules`, migrations), o acordo da equipe é pedir
revisão técnica mesmo que o GitHub não force.

### Bypass

Somente o responsável/admin do repositório deve poder fazer bypass, para emergência.

Bypass não deve virar fluxo normal.

---

## 4. Estratégia de merge

Durante o hackathon, branches `HACK-xxx` são entregues ao integrador; somente ele
as incorpora em `hackathon/mvp`. O merge posterior em `main` segue a proteção e a
revisão descritas neste documento. Veja `HACKATHON_WORKFLOW.md`.

Habilitar:

- `Squash merging`

Desabilitar se quiser histórico simples:

- merge commits;
- rebase merge.

Sugestão: deletar branch automaticamente depois do merge.

---

## 5. Secrets

Nunca colocar tokens no repositório.

Usar:

`Settings -> Secrets and variables -> Actions`

Exemplos futuros:

- `SUPABASE_*`
- `BLING_*`
- `CONTAAZUL_*`
- `AI_API_KEY`

Nenhum segredo deve aparecer em issue, PR, screenshot ou log.

---

## 6. Regra social mais importante

Permissão `Write` não significa "push na main".

O fluxo é:

```text
issue/tarefa
→ branch HACK-xxx com ownership
→ commits
→ PR
→ CI
→ review
→ integração em hackathon/mvp pelo integrador
→ PR revisada para main
```
