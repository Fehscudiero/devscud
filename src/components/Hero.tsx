import { Button } from "@/components/ui/button";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";

const Hero = () => {
  const { theme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkTheme(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [theme]);

  // MANUTENÇÃO FÁCIL: Partículas agora seguem o Azul (Light) ou Roxo (Dark)
  const particlesColors = isDarkTheme
    ? ["#a855f7", "#818cf8", "#c026d3", "#ffffff"]
    : ["#0ea5e9", "#2563eb", "#38bdf8", "#0f172a"];

  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element)
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <section
      id="home"
      // bg-background resolve tudo
      className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-700 bg-background"
    >
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          key={isDarkTheme ? "dark-hero" : "light-hero"}
          options={{
            fullScreen: { enable: false },
            fpsLimit: 60,
            pauseOnBlur: true,
            particles: {
              number: {
                value: isMobile ? 20 : 60,
                density: { enable: true, area: 800 },
              },
              color: { value: particlesColors },
              shape: { type: "circle" },
              opacity: { value: { min: 0.2, max: 0.6 } },
              size: { value: { min: 1, max: 4 } },
              move: {
                enable: true,
                speed: 1,
                outModes: { default: "destroy" },
              },
              links: {
                enable: !isMobile,
                distance: 150,
                color: isDarkTheme ? "#818cf8" : "#0ea5e9",
                opacity: 0.3,
              },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "grab" },
                onClick: { enable: true, mode: "push" },
              },
            },
          }}
          className="absolute inset-0"
        />
        {/* Overlay de Vinheta adaptável */}
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,_transparent_0%,_var(--background)_90%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="space-y-4 animate-in fade-in slide-in-from-top-8 duration-1000">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter text-foreground">
              Impulsione sua presença
              <br />
              <span className="block mt-2 bg-gradient-primary bg-clip-text text-transparent animate-gradient-x">
                Digital com Estilo
              </span>
            </h1>
            <p className="text-lg sm:text-2xl max-w-2xl mx-auto font-light leading-relaxed text-muted-foreground">
              Desenvolvimento de alta performance para quem busca
              <span className="text-primary font-medium"> autoridade </span>e
              resultados reais.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4 animate-in fade-in zoom-in duration-1000 delay-300">
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              // bg-primary e shadow-primary resolvem o botão para ambos os temas
              className="group relative px-10 py-7 text-xl font-bold rounded-2xl transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl bg-gradient-primary text-white border-none"
            >
              <Mail className="mr-2 w-6 h-6 group-hover:rotate-12 transition-transform" />
              Vamos Conversar?
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 pt-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            {[
              { icon: Github, href: "https://github.com/fehscudiero" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/devscud/" },
              {
                icon: Instagram,
                href: "https://www.instagram.com/scudiero.dev/",
              },
            ].map(({ icon: Icon, href }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:-translate-y-2 bg-card/50 border-border text-muted-foreground hover:border-primary hover:text-primary"
              >
                <Icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block z-20">
        <div className="w-[2px] h-12 bg-gradient-to-b from-transparent via-primary to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;
