import { Navigate, Route, Routes } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { SimulationPage } from "./pages/SimulationPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<DashboardPage />} />
      <Route path="/app/onboarding" element={<OnboardingPage />} />
      <Route path="/app/simulations/new" element={<SimulationPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
