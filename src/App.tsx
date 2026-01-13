import { useEffect, lazy, Suspense } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

// --- MUDANÇA AQUI: Carregamento Preguiçoso (Lazy Loading) ---
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Melhora o cache do React Query
    },
  },
});

const App = () => {
  useEffect(() => {
    // Só inicializa AOS se não for um bot (SEO) e reduz duração para mobile
    AOS.init({
      duration: 600,
      once: true,
      disable: "mobile", // Dica de ouro: desativar AOS em mobile aumenta muito a nota
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* O Suspense é obrigatório para componentes lazy */}
            <Suspense
              fallback={
                <div className="h-screen w-screen flex items-center justify-center bg-background">
                  {/* Um loader simples ou nada para evitar Layout Shift */}
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
