import { Code2, Github, Linkedin, Instagram, Mail, Terminal } from "lucide-react";
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

  const particleColor = isDarkTheme ? ["#3C096C", "#5A189A", "#7B2CBF"] : ["#7c3aed", "#9333ea", "#c026d3"];

  // Estilos Ultra-Minimalistas
  const footerBg = isDarkTheme ? "bg-[#020817]/95 border-white/10" : "bg-white/95 border-slate-200";
  const textColor = isDarkTheme ? "text-slate-400" : "text-slate-500";
  const borderColor = isDarkTheme ? "border-white/10" : "border-slate-200";

  return (
    <footer className={`relative border-t backdrop-blur-xl overflow-hidden transition-colors duration-500 ${footerBg}`}>

      {/* Linha de Energia Superior */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

      {/* Partículas Sutis (Apenas para textura) */}
      <Particles
        id="footerParticles"
        init={particlesInit}
        key={isDarkTheme ? "dark" : "light"}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 15 }, // Reduzido para limpar o visual
            color: { value: particleColor },
            shape: { type: "circle" },
            opacity: { value: 0.3 },
            size: { value: { min: 1, max: 2 } },
            move: { enable: true, speed: 0.3, direction: "none", random: true },
            links: { enable: false },
          },
          interactivity: { events: { onHover: { enable: false } } },
          retina_detect: true,
        }}
        style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Layout Achatado: Flex Row em Desktop */}
        <div className="flex flex-col md:flex-row items-center justify-between py-6 gap-4 md:gap-0">

          {/* Esquerda: Identidade Técnica */}
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-md`}>
              <Code2 className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className={`text-sm font-bold tracking-tight leading-none ${isDarkTheme ? "text-white" : "text-slate-900"}`}>
                Felipe Scudiero
              </span>
              <span className="text-[10px] uppercase tracking-widest text-purple-500 font-semibold">
                Full Stack Engineer
              </span>
            </div>
          </div>

          {/* Centro: Status do Sistema (Tech Vibe) */}
          <div className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full border ${borderColor} ${isDarkTheme ? "bg-white/5" : "bg-slate-100"}`}>
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            <span className={`text-[10px] font-mono ${textColor}`}>
              SYSTEM STATUS: ONLINE
            </span>
          </div>

          {/* Direita: Redes Sociais Compactas */}
          <div className="flex items-center gap-1">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${isDarkTheme ? "text-slate-400 hover:text-white hover:bg-white/10" : "text-slate-500 hover:text-purple-700 hover:bg-purple-50"}`}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Linha Divisória Fina */}
        <div className={`w-full h-[1px] ${borderColor}`}></div>

        {/* Copyright Técnico (Rodapé do Rodapé) */}
        <div className="flex flex-col md:flex-row items-center justify-between py-4 text-xs font-mono opacity-60">
          <span className={textColor}>
            © 2025 FELIPE SCUDIERO. ALL RIGHTS RESERVED.
          </span>
          <div className={`flex items-center gap-2 ${textColor}`}>
            <Terminal className="w-3 h-3" />
            <span>v2.0.0 // DESIGN & CODE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;