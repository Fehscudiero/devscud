import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// O ThemeProvider já está no App.tsx, então aqui fica simples assim:
createRoot(document.getElementById("root")!).render(<App />);