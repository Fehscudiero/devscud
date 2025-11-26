import { Code2, Github, Linkedin, Instagram, Mail, Terminal, Activity } from "lucide-react";
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

  // Cores dinâmicas (Roxo/Azul no Dark vs Verde no Light)
  const particleColor = isDarkTheme
    ? ["#3C096C", "#5A189A", "#7B2CBF"]
    : ["#059669", "#10b981", "#34d399"];

  // Estilos Ultra-Minimalistas e Técnicos
  const footerBg = isDarkTheme
    ? "bg-[#030014] border-white/10"
    : "bg-white border-slate-200";

  const textColor = isDarkTheme ? "text-slate-400" : "text-slate-600";
  const titleColor = isDarkTheme ? "text-white" : "text-slate-900";
  const borderColor = isDarkTheme ? "border-white/10" : "border-slate-200";

  // Cores de Destaque
  const accentText = isDarkTheme ? "text-purple-500" : "text-emerald-600";
  const statusBg = isDarkTheme ? "bg-white/5 border-white/10" : "bg-emerald-50 border-emerald-100";
  const statusDot = isDarkTheme ? "bg-green-500" : "bg-emerald-500";
  const statusPing = isDarkTheme ? "bg-green-400" : "bg-emerald-400";

  // Ícones Sociais
  const iconBtn = isDarkTheme
    ? "text-slate-400 hover:text-white hover:bg-white/10"
    : "text-slate-500 hover:text-emerald-700 hover:bg-emerald-50";

  return (
    <footer className={`relative border-t backdrop-blur-xl overflow-hidden transition-colors duration-500 ${footerBg}`}>

      {/* Linha de Energia Superior */}
      <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent to-transparent opacity-50 ${isDarkTheme ? 'via-purple-500' : 'via-emerald-500'}`}></div>

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

        {/* Layout Achatado: Flex Row em Desktop (Espalhado) */}
        <div className="flex flex-col md:flex-row items-center justify-between py-8 gap-6 md:gap-0">

          {/* ESQUERDA: Identidade Técnica */}
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-lg shadow-lg ${isDarkTheme ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white' : 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'}`}>
              <Code2 className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className={`text-sm font-bold tracking-tight leading-none ${titleColor}`}>
                Felipe Scudiero
              </span>
              <span className={`text-[10px] uppercase tracking-widest font-bold mt-1 ${accentText}`}>
                Full Stack Engineer
              </span>
            </div>
          </div>

          {/* CENTRO: Status do Sistema (Tech Vibe) */}
          <div className={`hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full border ${statusBg}`}>
            <div className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusPing}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${statusDot}`}></span>
            </div>
            <span className={`text-[10px] font-mono font-medium tracking-wider ${textColor}`}>
              SYSTEM STATUS: <span className={isDarkTheme ? "text-green-400" : "text-emerald-600"}>ONLINE</span>
            </span>
          </div>

          {/* DIREITA: Redes Sociais Compactas */}
          <div className="flex items-center gap-2">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`p-2.5 rounded-lg transition-all duration-200 hover:scale-110 border border-transparent ${iconBtn}`}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Linha Divisória Fina */}
        <div className={`w-full h-[1px] ${borderColor}`}></div>

        {/* RODAPÉ DO RODAPÉ: Copyright Técnico */}
        <div className="flex flex-col md:flex-row items-center justify-between py-6 text-[10px] sm:text-xs font-mono opacity-70 gap-2">
          <span className={textColor}>
            © 2025 FELIPE SCUDIERO. ALL RIGHTS RESERVED.
          </span>

          <div className={`flex items-center gap-4 ${textColor}`}>
            <span className="hidden md:inline text-slate-500">|</span>
            <div className="flex items-center gap-2">
              <Terminal className="w-3 h-3" />
              <span>v3.5.0 // STABLE BUILD</span>
            </div>
            <span className="hidden md:inline text-slate-500">|</span>
            <div className="flex items-center gap-2">
              <Activity className="w-3 h-3" />
              <span>100% UPTIME</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;