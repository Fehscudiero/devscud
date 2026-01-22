import { lazy, Suspense, useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";

// --- SEÇÕES EM LAZY LOADING ---
const About = lazy(() => import("@/components/About"));
const Stats = lazy(() => import("@/components/Stats"));
const Servicos = lazy(() => import("@/components/Servicos"));
const Technologies = lazy(() => import("@/components/Technologies"));
const Projects = lazy(() => import("@/components/Projects"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  const [loadDeepContent, setLoadDeepContent] = useState(false);

  useEffect(() => {
    // Só permite o carregamento das seções pesadas após o Hero estar pronto
    // Isso quebra a árvore de dependência da rede de forma agressiva
    const timer = setTimeout(() => {
      setLoadDeepContent(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />

        {/* Bloco 1: Conteúdo logo abaixo da dobra */}
        <Suspense fallback={<div className="h-96" />}>
          <About />
          <Stats />
        </Suspense>

        {/* Bloco 2: Conteúdo pesado só é montado após o sinal do useEffect */}
        {loadDeepContent && (
          <Suspense fallback={<div className="h-96" />}>
            <Servicos />
            <Technologies />
            <Projects />
            <Testimonials />
            <Contact />
            <Footer />
          </Suspense>
        )}
      </main>
    </div>
  );
};

export default Index;
