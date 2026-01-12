import { Code2, Github, Linkedin, Instagram, Mail, Terminal, Activity } from "lucide-react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useEffect, useState } from "react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/fehscudiero" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/devscud/" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/scudiero.dev/" },
  { icon: Mail, label: "Email", href: "mailto:scudiero.dev@yahoo.com" },
];

const MinimalSeparator = ({ isDarkTheme }: { isDarkTheme: boolean }) => {
  const accentColor = isDarkTheme ? "bg-purple-500" : "bg-emerald-600";
  return (
    <div className="relative w-4 h-full hidden md:flex items-center justify-center min-h-[50px]">
      <div className={`absolute w-[1px] h-3/4 ${accentColor} opacity-50 rounded-full`} />
    </div>
  );
};

const Footer = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [availabilityStatus, setAvailabilityStatus] = useState({
    status: "LENTA",
    color: "red",
  });

  // -- Lógica de Horários Alterada --
  const checkSLA = useCallback(() => {
    const now = new Date();
    const currentDay = now.getDay(); // 0: Dom, 1: Seg, ..., 5: Sex, 6: Sáb
    const currentHour = now.getHours();

    const isWeekday = currentDay >= 1 && currentDay <= 5;
    const isWorkingHour = currentHour >= 8 && currentHour < 17;

    // Só fica ABERTO se for dia de semana E horário comercial
    if (isWeekday && isWorkingHour) {
      setAvailabilityStatus({ status: "ABERTO", color: "green" });
    } else {
      setAvailabilityStatus({ status: "FECHADO", color: "red" });
    }
  }, []);

  useEffect(() => {
    checkSLA();
    const intervalId = setInterval(checkSLA, 60000);
    const checkTheme = () => {
      const root = window.document.documentElement;
      setIsDarkTheme(root.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { observer.disconnect(); clearInterval(intervalId); };
  }, [checkSLA]);

  const particlesInit = useCallback(async (engine: any) => { await loadSlim(engine); }, []);

  const particleColor = isDarkTheme ? ["#3C096C", "#5A189A", "#7B2CBF"] : ["#059669", "#10b981", "#34d399"];
  const footerBg = isDarkTheme ? "bg-[#030014] border-white/10" : "bg-white border-slate-200";
  const textColor = isDarkTheme ? "text-slate-400" : "text-slate-600";
  const titleColor = isDarkTheme ? "text-white" : "text-slate-900";
  const borderColor = isDarkTheme ? "border-white/10" : "border-slate-200";
  const accentText = isDarkTheme ? "text-purple-500" : "text-emerald-600";

  const getColorClasses = (statusColor: string) => {
    let colorClass: { dot: string; ping: string; text: string; bg: string };
    if (isDarkTheme) {
      switch (statusColor) {
        case 'green': colorClass = { dot: 'bg-emerald-500', ping: 'bg-emerald-400', text: 'text-emerald-400', bg: 'bg-emerald-900/20' }; break;
        case 'red': colorClass = { dot: 'bg-red-500', ping: 'bg-red-400', text: 'text-red-400', bg: 'bg-red-900/20' }; break;
        default: colorClass = { dot: 'bg-slate-500', ping: 'bg-slate-400', text: 'text-slate-400', bg: 'bg-slate-900/20' };
      }
    } else {
      switch (statusColor) {
        case 'green': colorClass = { dot: 'bg-emerald-600', ping: 'bg-emerald-400', text: 'text-emerald-700', bg: 'bg-emerald-50' }; break;
        case 'red': colorClass = { dot: 'bg-red-600', ping: 'bg-red-400', text: 'text-red-700', bg: 'bg-red-50' }; break;
        default: colorClass = { dot: 'bg-slate-600', ping: 'bg-slate-400', text: 'text-slate-700', bg: 'bg-slate-50' };
      }
    }
    return colorClass;
  };

  const availabilityClasses = getColorClasses(availabilityStatus.color);
  const systemClasses = getColorClasses("green");
  const statusBorderClass = isDarkTheme ? 'border-emerald-500/30' : 'border-emerald-200';
  const iconBtn = isDarkTheme ? "text-slate-400 hover:text-white hover:bg-white/10" : "text-slate-500 hover:text-emerald-700 hover:bg-emerald-50";

  return (
    <footer className={`relative border-t backdrop-blur-xl overflow-hidden transition-colors duration-500 ${footerBg}`}>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent to-transparent opacity-50" />

      <Particles
        id="footerParticles"
        init={particlesInit}
        key={isDarkTheme ? "dark" : "light"}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 30 },
            color: { value: particleColor },
            shape: { type: "circle" },
            opacity: { value: 0.6 },
            size: { value: { min: 1.5, max: 3 } },
            move: { enable: true, speed: 0.5, direction: "none", random: true },
            links: { enable: false },
          },
          interactivity: { events: { onHover: { enable: false } } },
          retina_detect: true,
        }}
        style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center py-4">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 md:gap-0">

            <div className="flex md:flex-1 justify-start items-center gap-3">
              <div className={`p-1.5 rounded-lg shadow-lg ${isDarkTheme ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white' : 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'}`}>
                <Code2 className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-bold tracking-tight leading-none ${titleColor}`}>Felipe Scudiero</span>
                <span className={`text-[10px] uppercase tracking-widest font-bold mt-1 ${accentText}`}>Developer</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors duration-300 ${availabilityClasses.bg} ${statusBorderClass}`}>
                <div className="relative flex h-2.5 w-2.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${availabilityClasses.ping}`}></span>
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${availabilityClasses.dot}`}></span>
                </div>
                <span className={`text-[10px] font-mono font-medium tracking-wider ${textColor}`}>
                  ATENDIMENTO: <span className={availabilityClasses.text}>{availabilityStatus.status}</span>
                </span>
              </div>

              <MinimalSeparator isDarkTheme={isDarkTheme} />

              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors duration-300 ${systemClasses.bg} ${statusBorderClass}`}>
                <div className="relative flex h-2.5 w-2.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${systemClasses.ping}`}></span>
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${systemClasses.dot}`}></span>
                </div>
                <span className={`text-[10px] font-mono font-medium tracking-wider ${textColor}`}>
                  SYSTEM STATUS: <span className={systemClasses.text}>ONLINE</span>
                </span>
              </div>
            </div>

            <div className="flex md:flex-1 justify-end items-center gap-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-lg transition-all duration-200 hover:scale-110 border border-transparent ${iconBtn}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

          </div>
        </div>

        <div className={`w-full h-[1px] ${borderColor}`}></div>

        <div className="flex flex-col md:flex-row items-center justify-between py-4 text-[10px] sm:text-xs font-mono opacity-70 gap-2">
          <span className={textColor}>© 2025 FELIPE SCUDIERO. ALL RIGHTS RESERVED.</span>
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