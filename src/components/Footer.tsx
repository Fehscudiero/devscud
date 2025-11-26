import { Code2, Github, Linkedin, Instagram, Mail, Heart } from "lucide-react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useEffect, useState } from "react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/fehscudiero" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/devscud/" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/scudiero.js/" },
  { icon: Mail, label: "Email", href: "mailto:scudiero.dev@yahoo.com" },
];

const Footer = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // -- Detecção de Tema Blindada --
  useEffect(() => {
    const checkTheme = () => {
      const root = window.document.documentElement;
      const isDark = root.classList.contains("dark");
      setIsDarkTheme(isDark);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  // Cores dinâmicas para partículas
  const particleColor = isDarkTheme ? ["#3C096C", "#5A189A", "#7B2CBF"] : ["#7c3aed", "#9333ea", "#c026d3"];

  // Estilos de fundo e texto
  const footerBg = isDarkTheme ? "bg-[#020817]/80 border-white/10" : "bg-white/80 border-purple-100";
  const textColor = isDarkTheme ? "text-slate-400" : "text-slate-600";
  const iconBg = isDarkTheme ? "bg-white/5 hover:bg-white/10 border-white/5" : "bg-white hover:bg-purple-50 border-purple-100 shadow-sm";

  return (
    <footer className={`relative border-t backdrop-blur-md overflow-hidden transition-colors duration-500 ${footerBg}`}>

      {/* Linha de Gradiente Superior Animada */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>

      {/* Partículas no fundo */}
      <Particles
        id="footerParticles"
        init={particlesInit}
        // Key muda para forçar reinício ao trocar tema
        key={isDarkTheme ? "dark" : "light"}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 30 },
            color: { value: particleColor },
            shape: { type: "circle" },
            opacity: {
              value: 0.5,
              random: { enable: true, minimumValue: 0.1 },
              animation: { enable: true, speed: 0.5, sync: false },
            },
            size: {
              value: { min: 1, max: 3 },
              animation: { enable: true, speed: 2, sync: false },
            },
            move: {
              enable: true,
              speed: 0.8,
              direction: "top",
              outModes: { default: "out" },
              random: true,
              straight: false,
            },
            links: { enable: false },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "bubble" },
            },
            modes: {
              bubble: { distance: 200, size: 6, duration: 2, opacity: 0.8 },
            },
          },
          retina_detect: true,
        }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Conteúdo do footer */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-8 text-center">

          {/* Logo / Marca */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-2xl font-bold tracking-tighter">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20">
                <Code2 className="h-6 w-6" />
              </div>
              <span className={isDarkTheme ? "text-white" : "text-slate-900"}>
                Felipe <span className="text-purple-600">Scudiero</span>
              </span>
            </div>
            <p className={`text-sm max-w-xs mx-auto ${textColor}`}>
              Transformando linhas de código em experiências digitais memoráveis.
            </p>
          </div>

          {/* Ícones sociais Glassmorphism */}
          <div className="flex gap-4 flex-wrap justify-center">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`group relative p-3 rounded-xl border transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${iconBg}`}
              >
                {/* Glow no hover */}
                <div className="absolute inset-0 rounded-xl bg-purple-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <Icon className="w-5 h-5 relative z-10 text-purple-500 group-hover:text-purple-400 transition-colors" />
              </a>
            ))}
          </div>

          {/* Divisor */}
          <div className={`w-full max-w-sm h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent`} />

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm">
            <span className={textColor}>© 2025 Felipe Scudiero.</span>
            <span className="hidden sm:inline text-purple-500/50">•</span>
            <span className={`flex items-center gap-1.5 ${textColor}`}>
              Desenvolvido com <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" /> e React
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;