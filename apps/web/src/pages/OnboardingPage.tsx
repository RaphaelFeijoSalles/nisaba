import { useNavigate } from "react-router";

export function OnboardingPage() {
  const navigate = useNavigate();

  return (
    <main className="page page--narrow">
      <span className="eyebrow">ETAPA 1</span>
      <h1>Perfil da empresa</h1>
      <p>
        O formulário definitivo depende do caso fiscal mínimo escolhido.
        Não devemos pedir nem inferir campos sem saber como serão usados.
      </p>

      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          navigate("/app/simulations/new");
        }}
      >
        <label>
          CNPJ
          <input name="cnpj" placeholder="00.000.000/0000-00" required />
        </label>
        <label>
          Regime
          <select name="taxRegime" defaultValue="" required>
            <option value="" disabled>Selecione</option>
            <option>Simples Nacional</option>
            <option>Lucro Presumido</option>
            <option>Lucro Real</option>
          </select>
        </label>
        <button className="button" type="submit">
          Continuar
        </button>
      </form>
    </main>
  );
}
