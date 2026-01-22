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
  const [showParticles, setShowParticles] = useState(false);

  // OTIMIZAÇÃO CRÍTICA PARA LCP E REFLOW:
  // Adia o carregamento das partículas para garantir que a Thread Principal foque no H1 primeiro
  useEffect(() => {
    const timer = setTimeout(() => setShowParticles(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 50, damping: 20 });

  // Reduzi a amplitude da rotação para evitar grandes saltos de layout
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Desativa cálculos de mouse no mobile para evitar Reflow Forçado
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX / rect.width - 0.5);
    y.set(e.clientY / rect.height - 0.5);
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

  const particlesOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 30, // Limitado a 30 FPS para salvar a Thread Principal no Mobile
      particles: {
        number: { value: 15, density: { enable: true, area: 1000 } }, // Menos partículas, mais área
        color: {
          value: isDarkTheme ? ["#a855f7", "#ffffff"] : ["#0ea5e9", "#0f172a"],
        },
        opacity: { value: 0.15 },
        size: { value: { min: 1, max: 2 } },
        move: { enable: true, speed: 0.3, outModes: { default: "bounce" } },
        links: { enable: false },
      },
      detectRetina: false, // Performance otimizada para telas mobile
    }),
    [isDarkTheme],
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      style={{ contain: "paint" }} // Melhora a performance de renderização isolada
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        {showParticles && (
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
        style={{
          rotateX:
            typeof window !== "undefined" && window.innerWidth < 768
              ? 0
              : rotateX,
          rotateY:
            typeof window !== "undefined" && window.innerWidth < 768
              ? 0
              : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="container mx-auto px-4 relative z-10 will-change-transform" // Avisa a GPU para acelerar
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="relative space-y-8">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter text-foreground leading-[1.1]">
              Impulsione sua presença
              <br />
              <span className="block mt-4 bg-gradient-primary bg-clip-text text-transparent pb-2">
                Digital com Estilo
              </span>
            </h1>

            <p className="text-lg sm:text-2xl max-w-2xl mx-auto font-light leading-relaxed text-muted-foreground">
              Desenvolvimento de alta performance focado em
              <span className="text-primary font-medium"> autoridade </span> e
              resultados reais.
            </p>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              aria-label="Ir para seção de contato"
              className="group relative px-10 py-7 text-xl font-bold rounded-2xl shadow-2xl bg-gradient-primary text-white border-none"
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
                label: "Github",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/devscud/",
                label: "LinkedIn",
              },
              {
                icon: Instagram,
                href: "https://www.instagram.com/scudiero.dev/",
                label: "Instagram",
              },
            ].map(({ icon: Icon, href, label }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver perfil no ${label}`}
                className="p-4 rounded-2xl border bg-card/50 border-border text-muted-foreground hover:text-primary transition-all"
              >
                <Icon className="h-6 w-6" aria-hidden="true" />{" "}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
