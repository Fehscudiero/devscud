import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";

// --- SEÇÕES EM LAZY LOADING (Carregam depois do Hero) ---
const About = lazy(() => import("@/components/About"));
const Stats = lazy(() => import("@/components/Stats"));
const Servicos = lazy(() => import("@/components/Servicos"));
const Technologies = lazy(() => import("@/components/Technologies"));
const Projects = lazy(() => import("@/components/Projects"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero é prioridade máxima (LCP) */}
        <Hero />

        {/* Suspense envolve o que não é essencial no primeiro segundo */}
        <Suspense fallback={<div className="h-20" />}>
          <About />
          <Stats />
          <Servicos />
          <Technologies />
          <Projects />
          <Testimonials />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={<div className="h-10" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
