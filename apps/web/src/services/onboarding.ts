export type CompanyProfileDraft = {
  companyName: string;
  taxId: string;
  taxRegime: string;
};

export type DataSourceChoice = "sample" | "file";

type OnboardingDraft = {
  profile: CompanyProfileDraft;
  dataSource: DataSourceChoice;
  fileName?: string;
};

/**
 * Temporary UI adapter. It persists only a non-sensitive summary and does not
 * establish a backend request or response contract.
 */
export async function completeOnboarding(draft: OnboardingDraft): Promise<void> {
  await new Promise((resolve) => window.setTimeout(resolve, 700));
  window.sessionStorage.setItem(
    "nisaba:onboarding-summary",
    JSON.stringify({
      companyName: draft.profile.companyName,
      taxRegime: draft.profile.taxRegime,
      dataSource: draft.dataSource,
      fileName: draft.fileName,
      isDemo: draft.dataSource === "sample",
    }),
  );
}
