import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // troquei o plugin
import path from "path";

export default defineConfig({
  server: {
    host: "localhost",
    port: 3000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2015",
    minify: "esbuild",
    sourcemap: false,
    assetsInlineLimit: 8192,
  },
});
