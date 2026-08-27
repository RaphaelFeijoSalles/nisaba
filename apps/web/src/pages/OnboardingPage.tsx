import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

import { NisabaLogo } from "@/components/nisaba/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function OnboardingPage() {
  return (
    <main className="flex min-h-screen justify-center bg-background px-6 py-16 text-foreground">
      <div className="fade-up w-full max-w-lg">
        <Link to="/">
          <NisabaLogo />
        </Link>

        <div className="mt-10 mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
            1
          </span>
          Etapa 1 de 2 · Perfil da empresa
        </div>

        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Vamos entender o seu cenário
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          O formulário definitivo depende do caso fiscal mínimo escolhido pelo time. Por ora,
          pedimos só o essencial — nenhum campo aqui é inferido silenciosamente.
        </p>

        <form
          className="panel fade-up mt-8 flex flex-col gap-5 p-6"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="flex flex-col gap-2 text-sm font-semibold">
            CNPJ
            <Input placeholder="00.000.000/0000-00" />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold">
            Regime tributário
            <Select defaultValue="">
              <option value="" disabled>
                Selecione
              </option>
              <option>Simples Nacional</option>
              <option>Lucro Presumido</option>
              <option>Lucro Real</option>
            </Select>
          </label>

          <Button asChild className="mt-2">
            <Link to="/app/simulations/new">
              Continuar <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </form>
      </div>
    </main>
  );
}
