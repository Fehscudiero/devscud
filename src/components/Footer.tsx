import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  Terminal,
  Activity,
  Cpu,
} from "lucide-react";
import { useCallback, useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const socialLinks = [
  {
    icon: Github,
    label: "Acesse meu perfil no GitHub", // Texto descritivo para Acessibilidade
    href: "https://github.com/fehscudiero",
  },
  {
    icon: Linkedin,
    label: "Conecte-se comigo no LinkedIn",
    href: "https://www.linkedin.com/in/devscud/",
  },
  {
    icon: Instagram,
    label: "Siga-me no Instagram",
    href: "https://www.instagram.com/scudiero.tsx/",
  },
  {
    icon: Mail,
    label: "Envie um e-mail para contato",
    href: "mailto:scudiero.dev@yahoo.com",
  },
];

const Footer = () => {
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
      today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1),
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
        : { status: "INDISPONÍVEL", color: "red" },
    );
  }, []);

  useEffect(() => {
    checkSLA();
    const intervalId = setInterval(checkSLA, 60000);
    return () => clearInterval(intervalId);
  }, [checkSLA]);

  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <footer className="relative pt-4 pb-2 border-t border-border bg-background transition-colors duration-1000 overflow-hidden">
      {/* Laser Line Animation */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-[150px] h-full bg-primary shadow-[0_0_15px_var(--primary)]"
        />
      </div>

      <Particles
        id="footerParticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          fpsLimit: 30, // Reduzido para salvar processamento no mobile
          particles: {
            number: { value: 15, density: { enable: true, area: 800 } },
            color: { value: "var(--primary)" },
            opacity: { value: 0.15 },
            size: { value: 1 },
            move: { enable: true, speed: 0.2 },
          },
        }}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center pb-12">
          {/* LADO ESQUERDO: BRANDING */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3 group">
              <div className="p-2 rounded-xl bg-gradient-primary shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                <Cpu className="h-5 w-5 text-white animate-pulse" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xl font-black tracking-tighter text-foreground uppercase">
                  FELIPE<span className="text-primary">.</span>SCUDIERO
                </span>
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-50 text-foreground">
                  DESENVOLVEDOR
                </span>
              </div>
            </div>
            <p className="text-xs max-w-[250px] leading-relaxed font-medium text-center md:text-left text-muted-foreground">
              Projetando interfaces disruptivas e sistemas escaláveis com foco
              em performance.
            </p>
          </div>

          {/* CENTRO: SYSTEM STATUS */}
          <div className="flex flex-col items-center gap-3">
            <div
              className={`relative overflow-hidden flex items-center gap-4 px-5 py-2 rounded-2xl border bg-card/20 backdrop-blur-md transition-colors ${
                availabilityStatus.color === "green"
                  ? "border-emerald-500/50"
                  : "border-red-500/50"
              }`}
            >
              <div className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute h-full w-full rounded-full opacity-75 ${availabilityStatus.color === "green" ? "bg-emerald-400" : "bg-red-400"}`}
                ></span>
                <span
                  className={`relative rounded-full h-2 w-2 ${availabilityStatus.color === "green" ? "bg-emerald-500" : "bg-red-500"}`}
                ></span>
              </div>
              <span className="text-[10px] font-black font-mono tracking-widest text-foreground uppercase">
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

            <div className="relative overflow-hidden flex items-center gap-4 px-5 py-2 rounded-2xl border border-primary/50 bg-card/20 backdrop-blur-md">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative rounded-full h-2 w-2 bg-primary"></span>
              </div>
              <span className="text-[10px] font-black font-mono tracking-widest text-foreground uppercase">
                CORE:{" "}
                <span className="text-primary font-bold">
                  ENCRYPTED & STABLE
                </span>
              </span>
            </div>
          </div>

          {/* LADO DIREITO: REDES SOCIAIS (AQUI ESTAVA O ERRO DE ACESSIBILIDADE) */}
          <div className="flex justify-center md:justify-end gap-3">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <motion.a
                whileHover={{ y: -5, scale: 1.1 }}
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label} // Adicionado para nota 100 de Acessibilidade
                className="p-3 rounded-xl border border-border bg-card/50 hover:bg-primary/10 text-foreground transition-all"
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
            © 2026 COPYRIGHT // DESIGNED BY DEV SCUD_
          </span>

          <div className="flex items-center gap-6">
            <div className="relative overflow-hidden flex items-center gap-3 bg-primary/5 px-4 py-2 rounded-xl border border-primary/50">
              <Terminal className="w-4 h-4 text-primary animate-bounce" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-mono font-black text-foreground">
                  BUILD: v{versionData.version}{" "}
                  <span className="text-primary">// PROD</span>
                </span>
                <span className="text-[12px] font-mono text-primary/80 font-bold uppercase">
                  LAST DEPLOY: {versionData.lastUpdate}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 group cursor-help">
              <Activity
                className="w-3 h-3 text-primary"
                aria-label="Status de atividade"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
