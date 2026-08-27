# Direção de experiência frontend

## Intenção

O frontend deve traduzir a identidade da Nisaba — registro, medida, clareza e
cenários — em uma experiência própria, memorável e contemporânea. A referência
histórica é matéria-prima abstrata; não deve virar estética literal ou mística.

Landing pages e áreas de apresentação não devem parecer template genérico de
SaaS, tema shadcn padrão ou sequência automática de navbar, hero, cards e pricing.
Layouts previsíveis e componentes sem personalidade devem ser questionados.

A experimentação visual não muda requisitos, contratos nem a prioridade do P0.
Cada efeito deve apoiar hierarquia, narrativa, feedback ou compreensão.

## Brief obrigatório antes de uma tela importante

Antes de implementar, registre brevemente na tarefa ou PR:

1. conceito visual;
2. referências;
3. linguagem de movimento;
4. tipografia;
5. composição;
6. comportamento do cursor;
7. comportamento de scroll;
8. microinterações principais;
9. signature interaction ou elemento memorável.

Não basta escolher uma paleta. A proposta deve formar uma linguagem coerente com
o manifesto em `NISABA_BRAND_MANIFESTO.md`. Uma página importante deve ter ao
menos uma interação ou composição marcante quando isso elevar a experiência.

## Vocabulário visual e de movimento

Explorar, com intenção:

- tipografia expressiva, hierarquia forte e composição assimétrica quando adequada;
- profundidade, layering, transforms e perspectiva;
- marcas geométricas inspiradas sutilmente em estilete, tábua, régua e escrita;
- reveal, stagger, text animation, parallax e transições entre seções;
- hover/tap ricos, interações magnéticas e respostas ao ponteiro;
- elementos decorativos animados ou ligados ao cursor;
- scroll-driven storytelling, pinning e sequências apenas quando houver narrativa.

Evitar animação aleatória, excesso de efeitos competindo entre si e qualquer
interação que esconda a ação principal. Dashboard e fluxos operacionais podem ser
mais contidos que a landing page, mas devem compartilhar tokens, tipografia e
princípios de feedback.

## Escolha técnica proporcional

Use a ferramenta mais simples que entregue o efeito:

1. CSS para transitions, hover e efeitos simples;
2. [Motion for React](https://motion.dev/) para microinterações React, springs,
   entrance/exit, layout animation, mouse e scroll-linked effects;
3. [GSAP](https://gsap.com/) e ScrollTrigger para timelines, pinning, scrub e
   sequências complexas de storytelling;
4. [Three.js](https://threejs.org/) somente quando uma cena, objeto, partículas ou
   background 3D/WebGL trouxer valor visual real.

Não instale todas as bibliotecas por padrão. Toda dependência relevante deve ter
uma interação concreta, benefício visual claro e custo compatível com o MVP.

## Acessibilidade e performance

Experiência forte precisa continuar utilizável:

- respeite `prefers-reduced-motion` e forneça uma experiência completa sem motion;
- mantenha CTA, navegação, formulários e foco por teclado sempre disponíveis;
- não dependa apenas de hover, cursor customizado ou precisão do ponteiro;
- crie fallback mobile e desative/degrade efeitos caros em dispositivos fracos;
- prefira animações de `transform` e `opacity`;
- não bloqueie interação durante timelines ou transições;
- faça cleanup de listeners, observers, RAFs e timelines;
- evite rerender React a cada movimento do mouse; use refs/valores de animação;
- aplique lazy loading e divisão de bundle quando um recurso pesado justificar;
- preserve contraste, semântica, regiões anunciáveis e tamanho de alvo adequado;
- teste viewport mobile, teclado e modo de movimento reduzido.

## Gate de revisão visual

O handoff de uma mudança visual importante deve incluir:

- resumo do brief e da signature interaction;
- screenshots ou vídeo curto dos estados relevantes;
- comportamento em desktop e mobile;
- resultado com `prefers-reduced-motion`;
- checks executados e custo de dependências, se houver;
- limitações conhecidas e fallback.

Quality gates devem ser proporcionais ao hackathon. Regressão visual automatizada,
auditoria pesada ou WebGL não são pré-requisitos universais; entram quando o risco
e o valor da página justificarem.
