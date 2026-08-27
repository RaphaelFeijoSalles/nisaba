export type CompanyProfileDraft = {
  companyName: string;
  taxId: string;
  taxRegime: string;
};

export type DataSourceChoice = "sample" | "file";

export type CreatedCompany = {
  id: number;
  cnpj: string;
  legalName: string;
  taxRegime: "SIMPLES_NACIONAL" | "LUCRO_PRESUMIDO" | "LUCRO_REAL";
};

type OnboardingDraft = {
  profile: CompanyProfileDraft;
  dataSource: DataSourceChoice;
  fileName?: string;
  company: CreatedCompany;
};

type ApiError = {
  message?: string;
};

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080").replace(/\/$/, "");

const taxRegimeByFormValue = {
  "simples-nacional": "SIMPLES_NACIONAL",
  "lucro-presumido": "LUCRO_PRESUMIDO",
  "lucro-real": "LUCRO_REAL",
} as const;

function isSupportedTaxRegime(value: string): value is keyof typeof taxRegimeByFormValue {
  return value in taxRegimeByFormValue;
}

export async function createCompany(profile: CompanyProfileDraft): Promise<CreatedCompany> {
  if (!isSupportedTaxRegime(profile.taxRegime)) {
    throw new Error("Confirme o regime tributário para criar a empresa.");
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/v1/companies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cnpj: profile.taxId.replace(/\D/g, ""),
        legalName: profile.companyName.trim(),
        taxRegime: taxRegimeByFormValue[profile.taxRegime],
      }),
    });
  } catch {
    throw new Error("Não foi possível conectar ao Nisaba. Verifique se o backend está ativo.");
  }

  if (!response.ok) {
    const apiError = await response.json().catch(() => null) as ApiError | null;
    throw new Error(apiError?.message || "Não foi possível criar a empresa.");
  }

  const company = await response.json() as CreatedCompany;
  if (!Number.isInteger(company.id) || company.id <= 0) {
    throw new Error("A resposta da criação da empresa não trouxe um id válido.");
  }

  window.sessionStorage.setItem("nisaba:company-id", String(company.id));
  return company;
}

/** File import remains local until its backend contract exists. */
export function completeOnboarding(draft: OnboardingDraft): void {
  window.sessionStorage.setItem(
    "nisaba:onboarding-summary",
    JSON.stringify({
      companyId: draft.company.id,
      companyName: draft.profile.companyName,
      taxRegime: draft.profile.taxRegime,
      dataSource: draft.dataSource,
      fileName: draft.fileName,
      isDemo: draft.dataSource === "sample",
    }),
  );
}
