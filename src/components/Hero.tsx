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
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      const root = window.document.documentElement;
      setIsDarkTheme(root.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [theme]);

  const bgColorClass = isDarkTheme ? "bg-[#030014]" : "bg-slate-50";
  const textColorClass = isDarkTheme ? "text-white" : "text-slate-900";
  const mutedTextClass = isDarkTheme ? "text-slate-400" : "text-slate-600";
  const titleGradient = isDarkTheme
    ? "from-purple-500 via-blue-400 to-cyan-400"
    : "from-green-600 via-emerald-500 to-teal-600";

  const btnPrimaryClass = isDarkTheme
    ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-purple-500/20"
    : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-green-500/20";

  const particlesColors = isDarkTheme
    ? ["#be185d", "#c026d3", "#6366f1", "#ffffff"]
    : ["#059669", "#10b981", "#34d399", "#4f46e5"];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
    }
  };

  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-700 ${bgColorClass}`}
    >
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          key={isDarkTheme ? "dark-hero-balanced" : "light-hero-balanced"}
          options={{
            fullScreen: { enable: false },
            fpsLimit: 120,
            particles: {
              number: {
                value: isMobile ? 20 : 65,
                density: { enable: true, area: 800 }
              },
              color: { value: particlesColors },
              shape: { type: "circle" },
              opacity: {
                value: { min: 0.3, max: 0.8 },
                animation: { enable: true, speed: 1, sync: false }
              },
              size: { value: { min: 1, max: isMobile ? 3 : 5 } },
              move: {
                enable: true,
                speed: isMobile ? 0.5 : 1.2,
                direction: "none",
                random: true,
                straight: false,
                outModes: { default: "out" },
              },
              links: {
                enable: !isMobile,
                distance: 150,
                color: isDarkTheme ? "#818cf8" : "#10b981",
                opacity: 0.4,
                width: 1.5,
                triangles: { enable: true, opacity: 0.08 },
              },
            },
            interactivity: {
              events: {
                onHover: { enable: !isMobile, mode: ["grab", "bubble"] },
                onClick: { enable: true, mode: "push" },
              },
              modes: {
                grab: { distance: 200, links: { opacity: 0.7 } },
                bubble: { distance: 200, size: 8, duration: 2, opacity: 1 },
                push: { quantity: 3 },
              },
            },
            retina_detect: true,
          }}
          className="absolute inset-0"
        />
        <div className={`absolute inset-0 z-[1] ${isDarkTheme ? 'bg-[radial-gradient(circle_at_center,_transparent_0%,_#030014_90%)]' : 'bg-[radial-gradient(circle_at_center,_transparent_0%,_#f8fafc_90%)]'}`} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="space-y-4 animate-in fade-in slide-in-from-top-8 duration-1000">
            <h1 className={`text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter ${textColorClass}`}>
              Impulsione sua presença
              <br /> {/* Quebra de linha adicionada */}
              <span className={`block mt-2 bg-gradient-to-r ${titleGradient} bg-clip-text text-transparent animate-gradient-x`}>
                Digital com Estilo
              </span>
            </h1>
            <p className={`text-lg sm:text-2xl max-w-2xl mx-auto font-light leading-relaxed ${mutedTextClass}`}>
              Desenvolvimento de alta performance para quem busca
              <span className={isDarkTheme ? "text-purple-400" : "text-green-600"}> autoridade </span>
              e resultados reais.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4 animate-in fade-in zoom-in duration-1000 delay-300">
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className={`group relative px-10 py-7 text-xl font-bold text-white rounded-2xl transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl ${btnPrimaryClass}`}
            >
              <Mail className="mr-2 w-6 h-6 group-hover:rotate-12 transition-transform" />
              Vamos Conversar?
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 pt-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            {[
              { icon: Github, href: "https://github.com/fehscudiero" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/devscud/" },
              { icon: Instagram, href: "https://www.instagram.com/scudiero.dev/" }
            ].map(({ icon: Icon, href }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:-translate-y-2
                  ${isDarkTheme
                    ? 'bg-white/5 border-white/10 text-slate-400 hover:border-purple-500 hover:text-purple-400'
                    : 'bg-black/5 border-black/10 text-slate-600 hover:border-green-500 hover:text-green-600'
                  }`}
              >
                <Icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block z-20">
        <div className={`w-[2px] h-12 bg-gradient-to-b from-transparent ${isDarkTheme ? 'via-purple-500' : 'via-green-500'} to-transparent animate-pulse`} />
      </div>
    </section>
  );
};

export default Hero;