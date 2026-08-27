import { Link } from "react-router";
import { ArrowRight, Sparkles } from "lucide-react";

import { NisabaLogo } from "@/components/nisaba/logo";
import { Button } from "@/components/ui/button";

export function LandingPage() {
  return (
    <main className="glow-primary relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-20 text-foreground">
      <div className="fade-up mx-auto max-w-3xl text-center">
        <div className="mb-8 flex justify-center">
          <NisabaLogo />
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Transição tributária
        </span>

        <h1 className="mt-6 text-balance font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl md:text-7xl">
          Clareza no presente.
          <br />
          Previsão no futuro.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Transforme dados fiscais em impacto, prioridade e cenários de decisão — antes que a
          transição tributária pressione sua margem.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/app/onboarding">
              Começar análise <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button asChild size="lg" variant="outline">
            <Link to="/app">Ver demonstração</Link>
          </Button>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          A demonstração usa dados de exemplo — nenhum número representa uma regra fiscal real.
        </p>
      </div>
    </main>
  );
}