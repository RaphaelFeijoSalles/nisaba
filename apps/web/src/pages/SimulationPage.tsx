import { Link } from "react-router";

export function SimulationPage() {
  return (
    <main className="page page--narrow">
      <span className="eyebrow">CENÁRIO</span>
      <h1>Simular uma decisão</h1>
      <p>
        Alterações feitas aqui devem ser registradas como premissas do usuário,
        separadas das regras oficiais/versionadas.
      </p>

      <div className="panel">
        <label>
          Ajuste de preço (%)
          <input type="number" defaultValue="5" />
        </label>
      </div>

      <div className="actions">
        <Link className="button" to="/app">Simular</Link>
        <Link className="button button--ghost" to="/app">Cancelar</Link>
      </div>
    </main>
  );
}
