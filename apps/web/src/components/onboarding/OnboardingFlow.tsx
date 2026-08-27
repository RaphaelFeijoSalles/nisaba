import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  completeOnboarding,
  createCompany,
  type CompanyProfileDraft,
  type CreatedCompany,
  type DataSourceChoice,
} from "../../services/onboarding";

const steps = ["Boas-vindas", "Sua empresa", "Seus dados", "Tudo pronto"];
const initialProfile: CompanyProfileDraft = { companyName: "", taxId: "", taxRegime: "" };

function formatTaxId(value: string) {
  return value.replace(/\D/g, "").slice(0, 14)
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

export function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState(initialProfile);
  const [createdCompany, setCreatedCompany] = useState<CreatedCompany | null>(null);
  const [dataSource, setDataSource] = useState<DataSourceChoice>("sample");
  const [fileName, setFileName] = useState("");
  const [creatingCompany, setCreatingCompany] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const companyIsValid = useMemo(() =>
    profile.companyName.trim().length >= 2 &&
    profile.taxId.replace(/\D/g, "").length === 14 &&
    profile.taxRegime !== "", [profile]);

  function goBack() {
    setError("");
    setStep((current) => Math.max(0, current - 1));
  }

  function updateProfile(change: Partial<CompanyProfileDraft>) {
    setProfile((current) => ({ ...current, ...change }));
    setCreatedCompany(null);
    setError("");
  }

  async function continueFromCompany(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!companyIsValid) {
      setError("Revise os campos destacados para continuar.");
      return;
    }

    if (createdCompany) {
      setStep(2);
      return;
    }

    setCreatingCompany(true);
    setError("");
    try {
      const company = await createCompany(profile);
      setCreatedCompany(company);
      setStep(2);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível criar a empresa.");
    } finally {
      setCreatingCompany(false);
    }
  }

  async function finish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (dataSource === "file" && !fileName) {
      setError("Escolha um arquivo para continuar ou use os dados de demonstração.");
      return;
    }
    if (!createdCompany) {
      setStep(1);
      setError("Crie a empresa antes de continuar.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      completeOnboarding({ profile, dataSource, fileName: fileName || undefined, company: createdCompany });
      setStep(3);
    } catch {
      setError("Não foi possível preparar sua análise agora. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="onboarding-shell">
      <aside className="onboarding-story" aria-label="Sobre a Nisaba">
        <Link className="brand-mark" to="/" aria-label="Voltar para o início"><span aria-hidden="true">N</span>Nisaba</Link>
        <div className="story-copy">
          <span className="eyebrow">CLAREZA COMEÇA PELO REGISTRO</span>
          <h1>Seus dados já contam uma história.</h1>
          <p>A Nisaba organiza o que sua empresa já registra para transformar uma transição complexa em próximos passos compreensíveis.</p>
        </div>
        <p className="story-note">Seus dados não viram uma resposta mágica: cada análise deve mostrar as premissas e regras que a sustentam.</p>
      </aside>

      <section className="onboarding-content">
        <header className="onboarding-progress">
          <p>Configuração inicial</p><span>Etapa {step + 1} de {steps.length}</span>
          <div className="progress-track" aria-hidden="true"><span style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
          <ol aria-label="Progresso do onboarding">
            {steps.map((label, index) => <li key={label} aria-current={index === step ? "step" : undefined}><span>{index < step ? "✓" : index + 1}</span><small>{label}</small></li>)}
          </ol>
        </header>

        <div className="onboarding-card">
          {step === 0 && <div className="step-content">
            <span className="step-kicker">BEM-VINDA À NISABA</span>
            <h2>Vamos entender o presente antes de olhar adiante.</h2>
            <p>Em poucos passos, você informa o perfil mínimo da empresa e escolhe como começar. Nada será tratado como resultado fiscal sem validação.</p>
            <ul className="promise-list">
              <li><span>01</span><div><strong>Contexto primeiro</strong><small>Não inferimos regras apenas pelo seu setor.</small></div></li>
              <li><span>02</span><div><strong>Dados sob controle</strong><small>Você escolhe entre uma demonstração ou um arquivo.</small></div></li>
              <li><span>03</span><div><strong>Explicações rastreáveis</strong><small>Premissas e limitações acompanham cada análise.</small></div></li>
            </ul>
            <button className="button onboarding-primary" type="button" onClick={() => setStep(1)}>Configurar minha análise <span aria-hidden="true">→</span></button>
            <p className="supporting-copy">Leva cerca de 2 minutos.</p>
          </div>}

          {step === 1 && <form className="step-content" onSubmit={continueFromCompany} noValidate>
            <span className="step-kicker">PERFIL MÍNIMO</span>
            <h2>Conte o essencial sobre a empresa.</h2>
            <p>Esses dados contextualizam a análise. Eles não determinam, sozinhos, o tratamento tributário.</p>
            <div className="onboarding-form">
              <label>Nome da empresa<input autoFocus value={profile.companyName} onChange={(event) => updateProfile({ companyName: event.target.value })} placeholder="Como devemos chamar sua empresa?" aria-invalid={Boolean(error) && profile.companyName.trim().length < 2} /></label>
              <label>CNPJ<input inputMode="numeric" value={profile.taxId} onChange={(event) => updateProfile({ taxId: formatTaxId(event.target.value) })} placeholder="00.000.000/0000-00" aria-invalid={Boolean(error) && profile.taxId.replace(/\D/g, "").length !== 14} /></label>
              <label>Regime tributário informado
                <select value={profile.taxRegime} onChange={(event) => updateProfile({ taxRegime: event.target.value })} aria-invalid={Boolean(error) && (!profile.taxRegime || profile.taxRegime === "nao-sei")}>
                  <option value="" disabled>Selecione uma opção</option><option value="simples-nacional">Simples Nacional</option><option value="lucro-presumido">Lucro Presumido</option><option value="lucro-real">Lucro Real</option><option value="nao-sei">Ainda não sei</option>
                </select>
                <small>Se houver dúvida, marque “Ainda não sei”. A análise indicará que faltam dados.</small>
              </label>
            </div>
            {error && <p className="form-error" role="alert">{error}</p>}
            <div className="step-actions"><button className="button button--ghost" type="button" onClick={goBack} disabled={creatingCompany}>Voltar</button><button className="button" type="submit" disabled={creatingCompany}>{creatingCompany ? "Criando empresa…" : <>Continuar <span aria-hidden="true">→</span></>}</button></div>
          </form>}

          {step === 2 && <form className="step-content" onSubmit={finish}>
            <span className="step-kicker">PONTO DE PARTIDA</span>
            <h2>Como você quer conhecer a Nisaba?</h2>
            <p>Use a demonstração para explorar o fluxo ou selecione um arquivo para preparar uma análise futura.</p>
            <div className="source-options">
              <label className={`source-card ${dataSource === "sample" ? "source-card--selected" : ""}`}><input type="radio" name="source" checked={dataSource === "sample"} onChange={() => setDataSource("sample")} /><span className="source-icon" aria-hidden="true">✦</span><span><strong>Explorar demonstração</strong><small>Veja a experiência com dados fictícios claramente identificados.</small></span><span className="radio-indicator" aria-hidden="true" /></label>
              <label className={`source-card ${dataSource === "file" ? "source-card--selected" : ""}`}><input type="radio" name="source" checked={dataSource === "file"} onChange={() => setDataSource("file")} /><span className="source-icon" aria-hidden="true">↥</span><span><strong>Selecionar um arquivo</strong><small>XML ou CSV. O processamento real depende da integração com o backend.</small></span><span className="radio-indicator" aria-hidden="true" /></label>
            </div>
            {dataSource === "file" && <label className="file-field">Arquivo para análise<input type="file" accept=".xml,.csv,text/xml,text/csv" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")} /><small>{fileName ? `Selecionado: ${fileName}` : "O arquivo ainda não será enviado; esta etapa usa um serviço simulado."}</small></label>}
            <div className="privacy-note"><span aria-hidden="true">◇</span><p><strong>Você mantém o controle.</strong> Nesta versão, nenhuma informação é enviada a um servidor.</p></div>
            {error && <p className="form-error" role="alert">{error}</p>}
            <div className="step-actions"><button className="button button--ghost" type="button" onClick={goBack} disabled={submitting}>Voltar</button><button className="button" type="submit" disabled={submitting}>{submitting ? "Preparando…" : "Preparar experiência"}</button></div>
          </form>}

          {step === 3 && <div className="step-content completion-state">
            <div className="completion-mark" aria-hidden="true">✓</div><span className="step-kicker">CONFIGURAÇÃO CONCLUÍDA</span>
            <h2>O primeiro registro está pronto.</h2>
            <p>Preparamos uma experiência {dataSource === "sample" ? "demonstrativa" : "local"} para <strong>{profile.companyName}</strong>. {dataSource === "sample" && "Todos os números estarão identificados como fictícios."}</p>
            <div className="summary-card"><span>Empresa <strong>{profile.companyName}</strong></span><span>Regime informado <strong>{profile.taxRegime === "nao-sei" ? "A confirmar" : profile.taxRegime.replace("-", " ")}</strong></span><span>Fonte inicial <strong>{dataSource === "sample" ? "Demonstração" : fileName}</strong></span></div>
            <Link className="button onboarding-primary" to="/app">Ver mapa de impacto <span aria-hidden="true">→</span></Link>
            <button className="text-button" type="button" onClick={() => setStep(2)}>Alterar fonte de dados</button>
          </div>}
        </div>
      </section>
    </main>
  );
}
