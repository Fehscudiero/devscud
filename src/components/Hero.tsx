import { Button } from "@/components/ui/button";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Hero = () => {
  const { theme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-700 bg-background perspective-1000"
    >
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          key={isDarkTheme ? "dark-hero" : "light-hero"}
          options={{
            fullScreen: { enable: false },
            fpsLimit: 60,
            particles: {
              number: {
                value: isMobile ? 20 : 60,
                density: { enable: true, area: 800 },
              },
              color: { value: particlesColors },
              opacity: { value: { min: 0.2, max: 0.6 } },
              size: { value: { min: 1, max: 4 } },
              move: { enable: true, speed: 1, outModes: { default: "bounce" } },
              links: {
                enable: !isMobile,
                distance: 150,
                color: isDarkTheme ? "#818cf8" : "#0ea5e9",
                opacity: 0.3,
              },
            },
          }}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,_transparent_0%,_var(--background)_90%)]" />
      </div>

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="relative space-y-4 animate-in fade-in slide-in-from-top-8 duration-1000">
            {/* CORREÇÃO: Usando transform direto para evitar erro de tipo */}
            <motion.h1
              style={{
                transform: "translateZ(60px)",
                transformStyle: "preserve-3d",
              }}
              className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter text-foreground"
            >
              {" "}
              <br />
              Impulsione sua presença
              <br />
              <span className="block mt-2 bg-gradient-primary bg-clip-text text-transparent animate-gradient-x">
                Digital com Estilo
              </span>
              <br />
            </motion.h1>

            <motion.p
              style={{ transform: "translateZ(40px)" }}
              className="text-lg sm:text-2xl max-w-2xl mx-auto font-light leading-relaxed text-muted-foreground"
            >
              Desenvolvimento de alta performance para quem busca
              <span className="text-primary font-medium"> autoridade </span> e
              resultados reais.
            </motion.p>
          </div>

          <motion.div
            style={{ transform: "translateZ(50px)" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="group relative px-10 py-7 text-xl font-bold rounded-2xl transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl bg-gradient-primary text-white border-none"
            >
              <Mail className="mr-2 w-6 h-6 group-hover:rotate-12 transition-transform" />
              Vamos Conversar?
            </Button>
          </motion.div>

          <motion.div
            style={{ transform: "translateZ(70px)" }}
            className="flex items-center justify-center gap-4 pt-10"
          >
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
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
