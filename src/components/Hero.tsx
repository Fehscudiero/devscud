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
      // Verifica se a classe 'dark' está presente no HTML
      const isDark = root.classList.contains("dark");
      setIsDarkTheme(isDark);
    };

    // 1. Verifica agora
    checkTheme();

    // 2. Cria um "espião" que avisa sempre que a classe do HTML mudar
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [theme]);

  // -- DEFINIÇÃO MANUAL DAS CORES (FALLBACK DE SEGURANÇA) --
  // Se for Dark: Fundo Escuro / Texto Branco
  // Se for Light: Fundo Branco / Texto Escuro
  const bgColorClass = isDarkTheme ? "bg-[#020817]" : "bg-white";
  const textColorClass = isDarkTheme ? "text-white" : "text-slate-900";
  const mutedTextClass = isDarkTheme ? "text-slate-400" : "text-slate-600";

  // Gradiente sobre as partículas
  const gradientOverlay = isDarkTheme
    ? "from-[#020817]/90 via-[#020817]/50 to-[#020817]"
    : "from-white/90 via-white/50 to-white";

  // Cor das linhas das partículas
  const linksColor = isDarkTheme ? "#ffffff" : "#7c3aed"; // Branco no Dark, Roxo no Light

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
  const particleCount = isMobile ? 30 : 80;

  const handleShareClick = () => {
    const url = window.location.href;
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
      // Aqui aplicamos a classe de cor dinâmica
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 ${bgColorClass}`}
    >
      {/* Fundo com partículas */}
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          // A key muda para forçar o reinício das partículas quando o tema muda
          key={isDarkTheme ? "dark" : "light"}
          options={{
            fullScreen: { enable: false },
            particles: {
              number: { value: particleCount },
              color: { value: "#3C096C" },
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
                color: linksColor, // Usamos a variável definida acima
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
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
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
              className="relative px-8 py-6 text-lg font-semibold text-white rounded-xl bg-gradient-to-r from-purple-700 via-fuchsia-600 to-purple-700 shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 border border-white/10"
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
              className={`relative group p-3 rounded-full bg-transparent border hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md ${isDarkTheme ? 'border-slate-800 text-slate-400 hover:text-primary' : 'border-slate-200 text-slate-600 hover:text-primary'}`}
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
                className={`p-3 rounded-full bg-transparent border hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md ${isDarkTheme ? 'border-slate-800 text-slate-400 hover:text-primary' : 'border-slate-200 text-slate-600 hover:text-primary'}`}
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Botão de scroll para baixo */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 hidden md:flex">
          <button
            onClick={() => scrollToSection("about")}
            className={`p-3 rounded-full backdrop-blur-sm border transition-all duration-300 animate-bounce ${isDarkTheme ? 'bg-white/5 border-white/10 text-slate-400 hover:bg-primary hover:text-white' : 'bg-black/5 border-black/10 text-slate-600 hover:bg-primary hover:text-white'}`}
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