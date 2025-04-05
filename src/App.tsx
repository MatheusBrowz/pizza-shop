import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider";

export function App() {
  return (
    <>
      <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
        <title>| pizza shop</title>
        <RouterProvider router={router} />
        <Toaster richColors />
      </ThemeProvider>
    </>
  );
}
