import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  Terminal,
  Activity,
  Cpu,
} from "lucide-react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/fehscudiero" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/devscud/",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/scudiero.dev/",
  },
  { icon: Mail, label: "Email", href: "mailto:scudiero.dev@yahoo.com" },
];

const Footer = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [availabilityStatus, setAvailabilityStatus] = useState({
    status: "LENTA",
    color: "red",
  });

  const versionData = useMemo(() => {
    const startDate = new Date("2025-11-01");
    const today = new Date();
    const diffInMs = today.getTime() - startDate.getTime();
    const weeksPassed = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
    const lastDeploy = new Date(today);
    lastDeploy.setDate(
      today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1)
    );

    return {
      version: `4.${weeksPassed}.${today.getDay()}`,
      lastUpdate: lastDeploy.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }),
    };
  }, []);

  const checkSLA = useCallback(() => {
    const now = new Date();
    const isWorking =
      now.getDay() >= 1 &&
      now.getDay() <= 5 &&
      now.getHours() >= 8 &&
      now.getHours() < 17;
    setAvailabilityStatus(
      isWorking
        ? { status: "DISPONÍVEL", color: "green" }
        : { status: "INDISPONÍVEL", color: "red" }
    );
  }, []);

  useEffect(() => {
    checkSLA();
    const intervalId = setInterval(checkSLA, 60000);
    const checkTheme = () =>
      setIsDarkTheme(document.documentElement.classList.contains("dark"));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => {
      observer.disconnect();
      clearInterval(intervalId);
    };
  }, [checkSLA]);

  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  const footerBg = isDarkTheme ? "bg-[#030014]" : "bg-slate-50";
  const textColor = isDarkTheme ? "text-slate-500" : "text-slate-600";
  const borderColor = isDarkTheme ? "border-white/5" : "border-black/5";
  const accentGradient = isDarkTheme
    ? "from-purple-500 via-cyan-400 to-blue-500"
    : "from-emerald-500 to-teal-600";

  return (
    <footer
      className={`relative pt-16 pb-8 border-t ${borderColor} ${footerBg} transition-colors duration-1000 overflow-hidden`}
    >
      {/* Laser Line Animation */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-[150px] h-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]"
        />
      </div>

      <Particles
        id="footerParticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 20 },
            color: { value: isDarkTheme ? "#6366f1" : "#10b981" },
            opacity: { value: 0.2 },
            size: { value: 1 },
            move: { enable: true, speed: 0.3 },
          },
        }}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center pb-12">
          {/* LADO ESQUERDO: BRANDING */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3 group">
              <div
                className={`p-2 rounded-xl bg-gradient-to-br ${accentGradient} shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform`}
              >
                <Cpu className="h-5 w-5 text-white animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-xl font-black tracking-tighter ${
                    isDarkTheme ? "text-white" : "text-slate-900"
                  }`}
                >
                  FELIPE<span className="text-cyan-500">.</span>SCUDIERO
                </span>
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-50">
                  DESENVOLVEDOR
                </span>
              </div>
            </div>
            <p
              className={`text-xs max-w-[250px] leading-relaxed font-medium text-center md:text-left ${textColor}`}
            >
              Projetando interfaces disruptivas e sistemas escaláveis com foco
              em performance.
            </p>
          </div>

          {/* CENTRO: SYSTEM STATUS */}
          <div className="flex flex-col items-center gap-3">
            {/* SLA - Borda Dinâmica (Verde se disponível, Vermelha se indisponível) */}
            <div
              className={`relative overflow-hidden flex items-center gap-4 px-5 py-2 rounded-2xl border bg-white/5 backdrop-blur-md ${
                availabilityStatus.color === "green"
                  ? "border-emerald-500/50"
                  : "border-red-500/50"
              }`}
            >
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className={`absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent to-transparent opacity-30 pointer-events-none ${
                  availabilityStatus.color === "green"
                    ? "via-emerald-400"
                    : "via-red-400"
                }`}
              />
              <div className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute h-full w-full rounded-full opacity-75 ${
                    availabilityStatus.color === "green"
                      ? "bg-emerald-400"
                      : "bg-red-400"
                  }`}
                ></span>
                <span
                  className={`relative rounded-full h-2 w-2 ${
                    availabilityStatus.color === "green"
                      ? "bg-emerald-500"
                      : "bg-red-500"
                  }`}
                ></span>
              </div>
              <span
                className={`text-[10px] font-black font-mono tracking-widest ${
                  isDarkTheme ? "text-white" : "text-slate-900"
                }`}
              >
                SLA:{" "}
                <span
                  className={
                    availabilityStatus.color === "green"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }
                >
                  {availabilityStatus.status}
                </span>
              </span>
            </div>

            {/* CORE - Borda Azul Animada */}
            <div
              className={`relative overflow-hidden flex items-center gap-4 px-5 py-2 rounded-2xl border border-cyan-500/50 bg-white/5 backdrop-blur-md`}
            >
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 pointer-events-none"
              />
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative rounded-full h-2 w-2 bg-cyan-500"></span>
              </div>
              <span
                className={`text-[10px] font-black font-mono tracking-widest ${
                  isDarkTheme ? "text-white" : "text-slate-900"
                }`}
              >
                CORE: <span className="text-cyan-400">ENCRYPTED & STABLE</span>
              </span>
            </div>
          </div>

          {/* LADO DIREITO: REDES SOCIAIS */}
          <div className="flex justify-center md:justify-end gap-3">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <motion.a
                whileHover={{ y: -5, scale: 1.1 }}
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-xl border ${borderColor} ${
                  isDarkTheme
                    ? "bg-white/5 hover:bg-white/10 text-white"
                    : "bg-black/5 hover:bg-black/10 text-slate-900"
                } transition-all`}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* BOTTOM BAR: INFO TÉCNICA DINÂMICA */}
        <div
          className={`pt-8 border-t ${borderColor} flex flex-col md:flex-row justify-between items-center gap-6`}
        >
          <div className="flex flex-col items-center md:items-start">
            <span
              className={`text-[10px] font-black tracking-widest ${textColor}`}
            >
              © 2026 COPYRIGHT // DESIGNED BY DEV SCUD_
            </span>
          </div>

          <div className=" flex items-center gap-6">
            {/* BUILD - Borda Azul Animada */}
            <div className="relative overflow-hidden flex items-center gap-3 group cursor-help bg-cyan-500/5 px-4 py-2 rounded-xl border border-cyan-500/50">
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none"
              />
              <Terminal className=" w-4 h-4 text-cyan-500 animate-bounce" />
              <div className="flex flex-col">
                <span
                  className={` text-[10px] font-mono font-black ${
                    isDarkTheme ? "text-white" : "text-slate-900"
                  }`}
                >
                  BUILD: v{versionData.version}{" "}
                  <span className="text-cyan-500">// PROD</span>
                </span>
                <span className="text-[8px] font-mono text-cyan-600/80 font-bold uppercase tracking-tight">
                  LAST DEPLOY: {versionData.lastUpdate}
                </span>
              </div>
            </div>

            <div className="pt-8 flex items-center gap-2 group cursor-help">
              <Activity className="w-3 h-3 text-purple-500" />
              <span
                className={` text-[10px] font-mono font-bold ${textColor} group-hover:text-purple-400 transition-colors`}
              >
                LATENCY: 14MS
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
