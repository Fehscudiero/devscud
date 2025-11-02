import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Instagram,
  ArrowDown,
  Share,
  Mail,
} from "lucide-react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useState } from "react";

const Hero = () => {
  const [copied, setCopied] = useState(false);

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

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const particleCount = isMobile ? 25 : 80;

  const handleShareClick = () => {
    const url = "https://seuportifolio.com";
    const title = "Confira este portfólio incrível!";
    const text = "Veja o trabalho do desenvolvedor Felipe Scudiero.";

    if (navigator.share) {
      navigator
        .share({ title, text, url })
        .catch(() => {
          navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 4000);
        });
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    }
  };

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

          {/* Ícones sociais com botão de compartilhamento em primeiro lugar */}
          <div className="flex items-center justify-center gap-6 pt-8">
            <button
              onClick={handleShareClick}
              className="w-12 h-12 flex items-center justify-center rounded-full text-primary hover:text-primary/80 transition-colors animate-bounce focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              aria-label="Compartilhar portfólio"
            >
              <Share className="h-6 w-6" />
              {copied && (
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 px-4 py-2 text-sm rounded-xl bg-purple-700 text-white shadow-2xl backdrop-blur-md animate-fade-in transition-all duration-500">
                  Link copiado! Compartilhe com quem quiser 🚀
                </div>
              )}
            </button>

            {[Github, Linkedin, Instagram, Mail].map((Icon, index) => {
              const links = [
                "https://github.com/fehscudiero",
                "https://www.linkedin.com/in/devscud/",
                "https://www.instagram.com/scudiero.js/",
                "mailto:scudiero.dev@yahoo.com",
              ];
              const labels = ["GitHub", "LinkedIn", "Instagram", "Email"];
              return (
                <a
                  key={labels[index]}
                  href={links[index]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={labels[index]}
                  className="w-12 h-12 flex items-center justify-center rounded-full text-primary hover:text-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <Icon className="h-6 w-6" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Botão de scroll para baixo — fora do bloco principal */}
        <div className="flex justify-center mt-16">
          <button
            onClick={() => scrollToSection("about")}
            className="w-12 h-12 flex items-center justify-center rounded-full animate-bounce text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
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
