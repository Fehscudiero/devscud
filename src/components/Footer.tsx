import { Code2, Github, Linkedin, Instagram, Mail, Terminal, Activity } from "lucide-react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useEffect, useState } from "react";

// MOCK para evitar erro no preview. 
const ParticlesMock = ({ children }: { children: React.ReactNode }) => <div className="absolute inset-0 z-0">{children}</div>;
const ParticlesComponent = typeof Particles !== 'undefined' ? Particles : ParticlesMock;

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/fehscudiero" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/devscud/" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/scudiero.js/" },
  { icon: Mail, label: "Email", href: "mailto:scudiero.dev@yahoo.com" },
];

// --- Sub-Componente: Divisor Minimalista ---
const MinimalSeparator = ({ isDarkTheme }: { isDarkTheme: boolean }) => {
  // Usando a cor de destaque principal (Roxo no Dark, Verde no Light) para um visual minimalista e coeso.
  const accentColor = isDarkTheme ? "bg-purple-500" : "bg-emerald-600";

  return (
    <div className="relative w-4 h-full hidden md:flex items-center justify-center min-h-[50px]">
      {/* Linha vertical minimalista com a cor do tema */}
      <div className={`absolute w-[1px] h-3/4 ${accentColor} opacity-50 rounded-full`} />
    </div>
  );
};

const Footer = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [availabilityStatus, setAvailabilityStatus] = useState({
    status: "LENTA",
    color: "red",
    hours: "20:00 - 08:00 (GMT-3)",
  });

  // -- Lógica de Disponibilidade de Trabalho (SLA) --
  const checkSLA = useCallback(() => {
    // Nota: O horário é baseado na hora local do cliente (navegador)
    const now = new Date();
    const currentHour = now.getHours();

    let newStatus = { status: "LENTA", color: "red", hours: "20:00 - 08:00 (GMT-3)" }; // Padrão

    // RÁPIDA: 08:00 - 16:59
    if (currentHour >= 8 && currentHour < 17) {
      newStatus = { status: "RÁPIDA", color: "green", hours: "08:00 - 17:00 (GMT-3)" };
    }
    // MEDIANA: 17:00 - 19:59
    else if (currentHour >= 17 && currentHour < 20) {
      newStatus = { status: "MEDIANA", color: "yellow", hours: "17:00 - 20:00 (GMT-3)" };
    }
    // LENTA: 20:00 - 07:59

    setAvailabilityStatus(newStatus);
  }, []);

  // -- Efeitos & Observadores --
  useEffect(() => {
    // 1. Checa a disponibilidade
    checkSLA();
    const intervalId = setInterval(checkSLA, 60000);

    // 2. Checa o tema
    const checkTheme = () => {
      const root = window.document.documentElement;
      const isDark = root.classList.contains("dark");
      setIsDarkTheme(isDark);
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
      clearInterval(intervalId);
    };
  }, [checkSLA]);

  const particlesInit = useCallback(async (engine: any) => {
    if (typeof loadSlim !== 'undefined') {
      await loadSlim(engine);
    }
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

  // -- Estilos de Status Dinâmicos --
  const getColorClasses = (statusColor: string) => {
    let colorClass: { dot: string; ping: string; text: string; bg: string };

    // Configuração para Dark Mode
    switch (statusColor) {
      case 'green':
        colorClass = { dot: 'bg-emerald-500', ping: 'bg-emerald-400', text: 'text-emerald-400', bg: 'bg-emerald-900/20' };
        break;
      case 'yellow':
        colorClass = { dot: 'bg-yellow-500', ping: 'bg-yellow-400', text: 'text-yellow-400', bg: 'bg-yellow-900/20' };
        break;
      case 'red':
        colorClass = { dot: 'bg-red-500', ping: 'bg-red-400', text: 'text-red-400', bg: 'bg-red-900/20' };
        break;
      default:
        colorClass = { dot: 'bg-slate-500', ping: 'bg-slate-400', text: 'text-slate-400', bg: 'bg-slate-900/20' };
    }

    if (!isDarkTheme) {
      // Configuração para Light Mode
      switch (statusColor) {
        case 'green':
          colorClass = { dot: 'bg-emerald-600', ping: 'bg-emerald-400', text: 'text-emerald-700', bg: 'bg-emerald-50' };
          break;
        case 'yellow':
          colorClass = { dot: 'bg-yellow-600', ping: 'bg-yellow-400', text: 'text-yellow-700', bg: 'bg-yellow-50' };
          break;
        case 'red':
          colorClass = { dot: 'bg-red-600', ping: 'bg-red-400', text: 'text-red-700', bg: 'bg-red-50' };
          break;
        default:
          colorClass = { dot: 'bg-slate-600', ping: 'bg-slate-400', text: 'text-slate-700', bg: 'bg-slate-50' };
      }
    }

    return colorClass;
  };

  const availabilityClasses = getColorClasses(availabilityStatus.color);
  const systemClasses = getColorClasses("green"); // System status is always green/online

  const accentText = isDarkTheme ? "text-purple-500" : "text-emerald-600";

  // Ícones Sociais
  const iconBtn = isDarkTheme
    ? "text-slate-400 hover:text-white hover:bg-white/10"
    : "text-slate-500 hover:text-emerald-700 hover:bg-emerald-50";

  return (
    <footer className={`relative border-t backdrop-blur-xl overflow-hidden transition-colors duration-500 ${footerBg}`}>

      {/* Linha de Energia Superior */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent to-transparent opacity-50" />

      {/* Partículas Sutis (Apenas para textura) */}
      <ParticlesComponent
        id="footerParticles"
        init={particlesInit}
        key={isDarkTheme ? "dark" : "light"}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 30 }, // Aumentado para 30
            color: { value: particleColor },
            shape: { type: "circle" },
            opacity: { value: 0.6 }, // Aumentado
            size: { value: { min: 1.5, max: 3 } }, // Aumentado
            move: { enable: true, speed: 0.5, direction: "none", random: true }, // Mais visível
            links: { enable: false },
          },
          interactivity: { events: { onHover: { enable: false } } },
          retina_detect: true,
        }}
        style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Layout Principal: Organizado em 3 colunas no desktop, e empilhado no mobile */}
        <div className="flex flex-col items-center py-4 gap-4">

          {/* Topo (Mobile): Identidade + Status do Sistema + Redes */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 md:gap-0">

            {/* Esquerda: Identidade Técnica */}
            <div className="flex items-center gap-3 order-1">
              <div className={`p-1.5 rounded-lg shadow-lg ${isDarkTheme ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white' : 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'}`}>
                <Code2 className="h-4 w-4" />
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

            {/* Centro: Statuses Agrupados (Desktop: Horizontal | Mobile: Vertical) */}
            <div className="flex flex-col md:flex-row items-center order-3 md:order-2 gap-3 md:gap-0 w-full md:w-auto mt-4 md:mt-0">

              {/* 1. STATUS DE TRABALHO (SLA - Dinâmico) */}
              <div className={`flex flex-col items-center md:items-start p-1.5 rounded-lg border border-transparent transition-colors duration-300 ${availabilityClasses.bg}`}>
                <div className="flex items-center gap-2">
                  <div className="relative flex h-2.5 w-2.5">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${availabilityClasses.ping}`}></span>
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${availabilityClasses.dot}`}></span>
                  </div>
                  <span className={`text-[10px] font-mono font-medium tracking-wider ${textColor}`}>
                    SLA: <span className={availabilityClasses.text}>{availabilityStatus.status}</span>
                  </span>
                </div>
                {/* Horário de Atendimento Agrupado abaixo do status */}
                <span className={`text-[9px] font-mono uppercase tracking-wider ${textColor} opacity-70 mt-0 ml-4`}>
                  {availabilityStatus.hours}
                </span>
              </div>

              {/* Divisor Minimalista (Apenas Desktop) */}
              <MinimalSeparator isDarkTheme={isDarkTheme} />

              {/* 2. STATUS DO SISTEMA (UPTIME - Fixo) */}
              <div className={`flex items-center gap-3 px-3 py-1.5 rounded-full border transition-colors duration-300 ${systemClasses.bg}`}>
                <div className="relative flex h-2.5 w-2.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${systemClasses.ping}`}></span>
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${systemClasses.dot}`}></span>
                </div>
                <span className={`text-[10px] font-mono font-medium tracking-wider ${textColor}`}>
                  SYSTEM STATUS: <span className={systemClasses.text}>ONLINE</span>
                </span>
              </div>
            </div>


            {/* Direita: Redes Sociais Compactas */}
            <div className="flex items-center gap-2 order-2 md:order-3">
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


        </div>

        {/* Linha Divisória Fina */}
        <div className={`w-full h-[1px] ${borderColor}`}></div>

        {/* RODAPÉ DO RODAPÉ: Copyright Técnico */}
        <div className="flex flex-col md:flex-row items-center justify-between py-4 text-[10px] sm:text-xs font-mono opacity-70 gap-2">
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