import { Link } from "react-router";

export function LandingPage() {
  return (
    <main className="page page--center">
      <section className="hero">
        <span className="eyebrow">NISABA</span>
        <h1>Clareza no presente.<br />Previsão no futuro.</h1>
        <p>
          Transforme dados fiscais em impacto, prioridade e cenários de decisão.
        </p>
        <div className="actions">
          <Link className="button" to="/app/onboarding">Começar análise</Link>
          <Link className="button button--ghost" to="/app">Ver demonstração</Link>
        </div>
      </section>
    </main>
  );
}
