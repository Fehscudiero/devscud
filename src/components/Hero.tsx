import { Button } from "@/components/ui/button";
import { Github, Linkedin, Instagram, ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  // Detecta se é mobile e ajusta quantidade de partículas
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const particleCount = isMobile ? 25 : 80;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Fundo com partículas e imagem */}
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            particles: {
              number: { value: particleCount },
              color: { value: "#3C096C" },
              shape: { type: "circle" },
              opacity: { value: 3.2 },
              size: { value: 3 },
              move: {
                enable: true,
                speed: 1.3,
                direction: "none",
                outModes: { default: "out" },
              },
              links: {
                enable: true,
                distance: 150,
                color: "#f5f5f5",
                opacity: 0.2,
                width: 1,
              },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "grab" },
                onClick: { enable: true, mode: "repulse" },
              },
              modes: {
                repulse: { distance: 100 },
                push: { quantity: 4 },
              },
            },
            retina_detect: true,
          }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
          }}
        />
        <div className="absolute inset-0 animated-gradient" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background" />
      </div>

      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              Impulsione sua presença{" "}
              <span className="text-gradient">Online!</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground font-medium"></p>
          </div>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Não basta estar online. Conquiste o digital com sites que entregam performance e autoridade.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-">

            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="relative px-6 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-700 via-fuchsia-600 to-purple-700 shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 aura-button"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className="w-5 h-5 transition-transform duration-500 group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Entre em Contato
              </span>
            </Button>





          </div>

          {/* Ícones sociais com cor roxa */}
          <div className="flex items-center justify-center gap-6 pt-8">
            <a
              href="https://github.com/fehscudiero"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/felipe-scudiero-5513261b3/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/scudiero.js/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
          </div>

          <button
            onClick={() => scrollToSection("about")}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-primary"
            aria-label="Scroll para baixo"
          >
            <ArrowDown className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
