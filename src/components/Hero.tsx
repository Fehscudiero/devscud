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
import { useCallback, useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";

const Hero = () => {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  // -- ESTADO E LÓGICA PARA FORÇAR A TROCA DE CORES --
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      const root = window.document.documentElement;
      const isDark = root.classList.contains("dark");
      setIsDarkTheme(isDark);
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [theme]);

  // -- DEFINIÇÃO DE TEMAS (Dual Personality) --

  // Fundo: Dark (Azul Profundo) vs Light (Branco)
  const bgColorClass = isDarkTheme ? "bg-[#030014]" : "bg-white";

  // Texto
  const textColorClass = isDarkTheme ? "text-white" : "text-slate-900";
  const mutedTextClass = isDarkTheme ? "text-slate-400" : "text-slate-600";

  // Gradiente do Título Principal: Roxo/Azul (Dark) vs Verde/Teal (Light)
  const titleGradient = isDarkTheme
    ? "from-purple-600 via-indigo-500 to-blue-600"
    : "from-green-600 via-emerald-500 to-teal-600";

  // Botão Principal
  const btnPrimaryClass = isDarkTheme
    ? "bg-purple-700 hover:bg-purple-600 border-blue-500 shadow-purple-500/20"
    : "bg-green-600 hover:bg-green-700 border-emerald-400 shadow-green-500/20";

  // Cores das Linhas das Partículas
  const linksColor = isDarkTheme ? "#ffffff" : "#10b981"; // Branco no Dark, Esmeralda no Light

  // Cores das Partículas (Array)
  const particlesColors = isDarkTheme
    ? ["#7c3aed", "#2563eb", "#ffffff"] // Roxo, Azul, Branco
    : ["#059669", "#10b981", "#34d399"]; // Tons de Verde

  // Gradiente de Fundo (Overlay)
  const gradientOverlay = isDarkTheme
    ? "from-[#030014]/90 via-[#030014]/50 to-[#030014]"
    : "from-white/90 via-white/50 to-white";

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
  const particleCount = isMobile ? 30 : 50;

  const handleShareClick = () => {
    const url = window.location.href;
    const title = "Confira este portfólio incrível!";
    const text = "Veja o trabalho do desenvolvedor Felipe Scudiero.";

    if (navigator.share) {
      navigator.share({ title, text, url }).catch(() => { });
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    }
  };

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 ${bgColorClass}`}
    >
      {/* Fundo com partículas */}
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          // Força reset ao trocar o tema
          key={isDarkTheme ? "dark" : "light"}
          options={{
            fullScreen: { enable: false },
            particles: {
              number: { value: particleCount },
              color: { value: particlesColors },
              shape: { type: "circle" },
              opacity: { value: 0.5 },
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
                color: linksColor,
                opacity: 0.4,
                width: 1,
              },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "grab" },
                onClick: { enable: true, mode: "push" },
              },
              modes: {
                grab: { distance: 140, links: { opacity: 0.5 } },
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
          }}
        />

        {/* Gradientes de Fundo Dinâmicos */}
        <div className={`absolute inset-0 bg-gradient-to-b ${gradientOverlay} z-[2] transition-colors duration-500`} />
      </div>

      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight transition-colors duration-300 ${textColorClass}`}>
              Impulsione sua presença{" "}
              <span className={`bg-gradient-to-r ${titleGradient} bg-clip-text text-transparent animate-gradient-x`}>
                Online!
              </span>
            </h1>
          </div>

          <p className={`text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${mutedTextClass}`}>
            Não basta estar online. Conquiste o digital com sites que entregam performance e autoridade.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className={`relative px-8 py-6 text-lg font-semibold text-white rounded-xl border-l-4 shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 ${btnPrimaryClass}`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Entre em Contato
              </span>
            </Button>
          </div>

          {/* Ícones sociais */}
          <div className="flex items-center justify-center gap-6 pt-8">
            <button
              onClick={handleShareClick}
              className={`relative group p-3 rounded-full bg-transparent border transition-all duration-300 shadow-sm hover:shadow-md 
                ${isDarkTheme
                  ? 'border-slate-800 text-slate-400 hover:text-primary hover:border-primary'
                  : 'border-slate-200 text-slate-600 hover:text-green-600 hover:border-green-500'
                }`}
              aria-label="Compartilhar portfólio"
            >
              <Share className="h-5 w-5" />
              {copied && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-primary-foreground shadow-lg whitespace-nowrap animate-in fade-in slide-in-from-bottom-2">
                  Link copiado!
                </div>
              )}
            </button>

            {[
              { icon: Github, href: "https://github.com/fehscudiero", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/devscud/", label: "LinkedIn" },
              { icon: Instagram, href: "https://www.instagram.com/scudiero.js/", label: "Instagram" },
              { icon: Mail, href: "mailto:scudiero.dev@yahoo.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full bg-transparent border transition-all duration-300 shadow-sm hover:shadow-md
                  ${isDarkTheme
                    ? 'border-slate-800 text-slate-400 hover:text-primary hover:border-primary'
                    : 'border-slate-200 text-slate-600 hover:text-green-600 hover:border-green-500'
                  }`}
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Botão de scroll para baixo - FORA DO CONTAINER PARA FICAR FIXO NO RODAPÉ DA TELA */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex z-20">
        <button
          onClick={() => scrollToSection("about")}
          className={`p-3 rounded-full backdrop-blur-sm border transition-all duration-300 animate-bounce 
            ${isDarkTheme
              ? 'bg-white/5 border-white/10 text-slate-400 hover:bg-primary hover:text-white'
              : 'bg-white/50 border-green-200 text-green-700 hover:bg-green-600 hover:text-white'
            }`}
          aria-label="Scroll para baixo"
        >
          <ArrowDown className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
};

export default Hero;