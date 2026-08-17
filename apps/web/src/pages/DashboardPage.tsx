import { Link } from "react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const demo = [
  { item: "Linha A", impacto: 4200 },
  { item: "Linha B", impacto: 2900 },
  { item: "Linha C", impacto: 1300 },
];

export function DashboardPage() {
  return (
    <main className="page">
      <header className="topbar">
        <div>
          <span className="eyebrow">NISABA</span>
          <h1>Mapa de impacto</h1>
        </div>
        <Link className="button" to="/app/simulations/new">Novo cenário</Link>
      </header>

      <p className="notice">
        Dados demonstrativos. Nenhum número desta tela representa regra fiscal real.
      </p>

      <section className="cards">
        <article className="card">
          <span>Margem observada</span>
          <strong>18%</strong>
        </article>
        <article className="card">
          <span>Cenário demonstrativo</span>
          <strong>13%</strong>
        </article>
        <article className="card">
          <span>Itens prioritários</span>
          <strong>3</strong>
        </article>
      </section>

      <section className="panel">
        <div>
          <span className="eyebrow">PRIORIZAÇÃO</span>
          <h2>Impacto por linha</h2>
        </div>
        <div className="chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={demo}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="item" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="impacto" fill="currentColor" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </main>
  );
}
