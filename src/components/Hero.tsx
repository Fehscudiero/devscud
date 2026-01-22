import { Button } from "@/components/ui/button";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useState, useEffect, useMemo, useRef } from "react";
import { useTheme } from "@/components/theme-provider";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Hero = () => {
  const { theme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [showParticles, setShowParticles] = useState(false);

  // Refs para evitar Reflow Forçado
  const sectionRef = useRef<HTMLElement>(null);
  const rectRef = useRef<{
    width: number;
    height: number;
    left: number;
    top: number;
  } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowParticles(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  // OTIMIZAÇÃO: Cache do retângulo da seção para evitar getBoundingClientRect repetitivo
  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    if (!rectRef.current && sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      rectRef.current = {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
      };
    }

    if (rectRef.current) {
      const { width, height, left, top } = rectRef.current;
      x.set((e.clientX - left) / width - 0.5);
      y.set((e.clientY - top) / height - 0.5);
    }
  };

  // Limpa o cache quando a janela muda de tamanho
  useEffect(() => {
    const handleResize = () => {
      rectRef.current = null;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 30,
      particles: {
        number: { value: 25, density: { enable: true, area: 1000 } },
        color: {
          value: isDarkTheme
            ? ["#9333ea", "#7c3aed", "#a855f7"]
            : ["#1d4ed8", "#1e40af", "#2563eb"],
        },
        opacity: { value: 0.4 },
        size: { value: { min: 1, max: 3 } },
        move: {
          enable: true,
          speed: 0.5,
          outModes: { default: "bounce" },
        },
        links: { enable: false },
      },
      interactivity: { events: { onHover: { enable: false } } },
      detectRetina: false,
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
      ref={sectionRef}
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background transition-colors duration-500"
      style={{ contain: "paint" }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        {showParticles && (
          <Particles
            id="tsparticles"
            key={isDarkTheme ? "hero-dark" : "hero-light"}
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
        className="container mx-auto px-4 relative z-10 will-change-transform"
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
            <motion.div
              animate={{
                boxShadow: isDarkTheme
                  ? [
                      "0 0 20px rgba(147,51,234,0.3)",
                      "0 0 40px rgba(147,51,234,0.6)",
                      "0 0 20px rgba(147,51,234,0.3)",
                    ]
                  : [
                      "0 0 20px rgba(37,99,235,0.3)",
                      "0 0 40px rgba(37,99,235,0.6)",
                      "0 0 20px rgba(37,99,235,0.3)",
                    ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative p-[2px] rounded-2xl overflow-hidden group"
            >
              <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#a855f7_50%,#E2E8F0_100%)] opacity-30 group-hover:opacity-100 transition-opacity" />

              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="group relative px-10 py-8 text-xl md:text-2xl font-black rounded-2xl bg-gradient-primary text-white border-none transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center gap-3 overflow-hidden shadow-2xl"
              >
                <div className="relative z-10 flex items-center gap-3">
                  <Mail className="w-6 h-6 md:w-8 md:h-8" />
                  <span className="tracking-tighter">VAMOS CONVERSAR?</span>
                </div>
              </Button>
            </motion.div>
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
                href: "https://www.instagram.com/scudiero.tsx/",
                label: "Instagram",
              },
            ].map(({ icon: Icon, href, label }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-4 rounded-2xl border bg-card/50 border-border text-muted-foreground hover:text-primary transition-all duration-300"
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
