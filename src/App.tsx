import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

import { Toaster } from "sonner";

export function App() {
  return (
    <>
      <title>| pizza shop</title>
      <RouterProvider router={router} />
      <Toaster richColors />
    </>
  );
}
