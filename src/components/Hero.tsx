import { Button } from "@/components/ui/button";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useState, useEffect, useMemo } from "react";
import { useTheme } from "@/components/theme-provider";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Hero = () => {
  const { theme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [mounted, setMounted] = useState(false);

  // OTIMIZAÇÃO: Só renderiza partículas após o mount para evitar Hydration Mismatch e travas no LCP
  useEffect(() => {
    setMounted(true);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return; // Desativa cálculos de mouse no mobile
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX / rect.width - 0.5);
    y.set(e.clientY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const checkTheme = () =>
      setIsDarkTheme(document.documentElement.classList.contains("dark"));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [theme]);

  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  // OTIMIZAÇÃO: Memoize as opções para evitar re-renders pesados
  const particlesOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 30, // Reduzido de 60 para 30 para economizar CPU no Mobile
      particles: {
        number: { value: 30, density: { enable: true, area: 800 } }, // Reduzido para performance
        color: {
          value: isDarkTheme ? ["#a855f7", "#ffffff"] : ["#0ea5e9", "#0f172a"],
        },
        opacity: { value: 0.3 },
        size: { value: { min: 1, max: 3 } },
        move: { enable: true, speed: 0.5, outModes: { default: "bounce" } },
        links: { enable: false }, // Desativado links (linhas) economiza MUITA CPU
      },
      detectRetina: false, // Desativado para performance
    }),
    [isDarkTheme]
  );

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element)
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-background perspective-1000"
    >
      <div className="absolute inset-0 z-0">
        {mounted && (
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={particlesOptions as any}
            className="absolute inset-0"
          />
        )}
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,_transparent_0%,_var(--background)_95%)]" />
      </div>

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="relative space-y-4">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter text-foreground">
              Impulsione sua presença
              <br />
              <span className="block mt-2 bg-gradient-primary bg-clip-text text-transparent">
                Digital com Estilo
              </span>
            </h1>

            <p className="text-lg sm:text-2xl max-w-2xl mx-auto font-light leading-relaxed text-muted-foreground">
              Desenvolvimento de alta performance para quem busca
              <span className="text-primary font-medium"> autoridade </span> e
              resultados reais.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              aria-label="Ir para seção de contato e iniciar conversa"
              className="group relative px-10 py-7 text-xl font-bold rounded-2xl transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl bg-gradient-primary text-white border-none"
            >
              <Mail
                className="mr-2 w-6 h-6 group-hover:rotate-12 transition-transform"
                aria-hidden="true"
              />
              Vamos Conversar?
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 pt-10">
            {[
              {
                icon: Github,
                href: "https://github.com/fehscudiero",
                label: "Acessar meu Github",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/devscud/",
                label: "Acessar meu LinkedIn",
              },
              {
                icon: Instagram,
                href: "https://www.instagram.com/scudiero.dev/",
                label: "Seguir no Instagram",
              },
            ].map(({ icon: Icon, href, label }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-4 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:-translate-y-2 bg-card/50 border-border text-muted-foreground hover:border-primary hover:text-primary"
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
