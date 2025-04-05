import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

export function App() {
  return (
    <>
      <title>| pizza shop</title>
      <RouterProvider router={router} />
    </>
  );
}
