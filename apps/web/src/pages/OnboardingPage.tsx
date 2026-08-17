import { Link } from "react-router";

export function OnboardingPage() {
  return (
    <main className="page page--narrow">
      <span className="eyebrow">ETAPA 1</span>
      <h1>Perfil da empresa</h1>
      <p>
        O formulário definitivo depende do caso fiscal mínimo escolhido.
        Não devemos pedir nem inferir campos sem saber como serão usados.
      </p>

      <form className="form" onSubmit={(event) => event.preventDefault()}>
        <label>
          CNPJ
          <input placeholder="00.000.000/0000-00" />
        </label>
        <label>
          Regime
          <select defaultValue="">
            <option value="" disabled>Selecione</option>
            <option>Simples Nacional</option>
            <option>Lucro Presumido</option>
            <option>Lucro Real</option>
          </select>
        </label>
        <Link className="button" to="/app/simulations/new">
          Continuar
        </Link>
      </form>
    </main>
  );
}
