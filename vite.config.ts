import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Plugins para Performance
import { imagetools } from "vite-imagetools";
import compression from "vite-plugin-compression";

export default defineConfig({
  server: {
    host: "localhost",
    port: 3000,
    open: true,
  },
  plugins: [
    react(),
    // Geração de imagens otimizadas
    imagetools(),
    // Compressão Brotli para Mobile (Zera o tempo de download)
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 512,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    cssCodeSplit: true,
    // ESTRATÉGIA CHAVE: Aumentamos para 10kb para embutir CSS pequeno no HTML
    // Isso elimina o erro de "Bloqueio de Renderização" do PageSpeed
    assetsInlineLimit: 10240,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) return "motion-engine";
            if (id.includes("lucide-react")) return "icons-pack";
            if (id.includes("swiper") || id.includes("dom7"))
              return "swiper-carousel";
            if (id.includes("tsparticles")) return "particles";
            return "vendor";
          }
        },
      },
    },
  },
});
