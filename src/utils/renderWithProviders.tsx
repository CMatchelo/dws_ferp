
import type { ReactElement } from "react";
import { AppDataProvider } from "../context/AppDataContext";
import { render } from "@testing-library/react";

export function renderWithProviders(ui: ReactElement) {
  return render(
    <AppDataProvider>
      {ui}
    </AppDataProvider>
  );
}
