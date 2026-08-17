# Project Dossier

## Problema

PMEs precisam lidar com uma transição tributária complexa, mas o valor para o gestor
não está somente em conhecer uma alíquota. Está em entender:

- onde a mudança pressiona margem;
- quais itens/operações concentram impacto;
- o que deve ser analisado primeiro;
- como uma decisão muda o cenário.

## Proposta de valor

**Quanto eu vou pagar → onde eu posso perder dinheiro → o que merece atenção primeiro.**

## Diferenciais pretendidos

### Priorização
Ordenar produtos, serviços ou operações pelo impacto calculado e pela relevância.

### Decisão
Traduzir impacto tributário em linguagem empresarial, sem transformar o sistema em
parecer jurídico.

### Cenários
Permitir alteração explícita de premissas, como preço e custo, e recalcular o efeito.

### Simplicidade
A complexidade deve ficar no pipeline e nas regras; a interface deve mostrar
explicações rastreáveis e progressivas.

## Público inicial

Pequenas e médias empresas.

O setor econômico não será usado como atalho para definir a tributação. O perfil
tributário e os atributos da operação serão modelados explicitamente.

Regimes citados para investigação:
- Simples Nacional;
- Lucro Presumido;
- Lucro Real.

## Fluxo

```text
cadastro
→ entrada/importação
→ ETL
→ enriquecimento
→ regras
→ simulação
→ mapa de impacto
→ cenário
→ relatório
→ explicação por IA (opcional/premium)
```

## Hipótese de freemium

Gratuito:
- cadastro;
- entrada de dados;
- primeira análise;
- relatório básico.

Premium:
- janela histórica maior;
- visualizações mais profundas;
- múltiplos cenários;
- chat sobre o relatório;
- sincronizações recorrentes, se houver valor recorrente validado.

A recorrência ainda é hipótese de negócio, não conclusão.
