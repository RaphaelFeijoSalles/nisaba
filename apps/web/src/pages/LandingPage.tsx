import { Link } from "react-router";

export function LandingPage() {
  return (
    <main className="landing-page">
      <nav className="landing-nav" aria-label="Navegação principal">
        <Link className="brand-mark" to="/"><span aria-hidden="true">N</span>Nisaba</Link>
        <Link className="nav-link" to="/app">Ver demonstração</Link>
      </nav>

      <section className="landing-hero">
        <div className="hero-copy">
          <span className="eyebrow">CLAREZA PARA A TRANSIÇÃO TRIBUTÁRIA</span>
          <h1>Entenda o que muda antes que isso pese no seu negócio.</h1>
          <p>A Nisaba organiza os dados que sua empresa já produz e os transforma em impacto, prioridade e cenários para decidir com mais contexto.</p>
          <div className="actions">
            <Link className="button" to="/app/onboarding">Começar minha análise <span aria-hidden="true">→</span></Link>
            <Link className="button button--ghost" to="/app">Explorar demonstração</Link>
          </div>
          <small className="hero-disclaimer">Resultados explicáveis, com premissas e limitações visíveis.</small>
        </div>
        <div className="hero-visual" aria-label="Do registro à decisão">
          <div className="visual-orbit visual-orbit--one" />
          <div className="visual-orbit visual-orbit--two" />
          <div className="insight-card insight-card--main"><span>PRÓXIMO PASSO</span><strong>Priorize o que merece atenção</strong><p>Compare cenários sem esconder as premissas usadas.</p><div className="mini-bars"><i /><i /><i /><i /></div></div>
          <div className="insight-card insight-card--tag"><span>REGISTRO</span><strong>Dados organizados</strong></div>
          <div className="insight-card insight-card--signal"><span>SINAL</span><strong>Impacto visível</strong></div>
        </div>
      </section>

      <section className="value-strip" aria-label="Como a Nisaba ajuda">
        <article><span>01</span><div><strong>Organize o presente</strong><p>Comece pelo perfil e pelos registros que você já tem.</p></div></article>
        <article><span>02</span><div><strong>Enxergue o impacto</strong><p>Traduza complexidade em sinais para o negócio.</p></div></article>
        <article><span>03</span><div><strong>Explore caminhos</strong><p>Simule decisões separando regras de premissas.</p></div></article>
      </section>
    </main>
  );
}
