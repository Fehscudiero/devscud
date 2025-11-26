import { useEffect, useRef, useState } from "react";
// Ajuste para o seu caminho real (mantendo relativo para evitar erros no preview, mas no seu projeto pode ser @/components/theme-provider)
import { useTheme } from "./theme-provider";

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // -- Integração com Tema Blindada --
  const { theme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(true);

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
  }, [theme]);

  // -- Estilos Ultra Pro --

  // Fundo: Dark (Azul Profundo) vs Light (Branco com toque verde)
  const sectionBg = isDarkTheme
    ? "bg-[#030014] border-y border-white/5"
    : "bg-white border-y border-slate-200";

  // Cards: Efeito HUD
  const cardBg = isDarkTheme
    ? "bg-white/5 hover:bg-white/10 border border-white/5"
    : "bg-slate-50 hover:bg-white border border-slate-200 shadow-sm hover:shadow-md";

  // Cores de Texto
  const labelColor = isDarkTheme ? "text-slate-400" : "text-slate-600";
  const codeColor = isDarkTheme ? "text-purple-500/70" : "text-emerald-600/70";
  const numberColor = isDarkTheme ? "text-white" : "text-slate-900";

  // Detalhes de Canto (Corner Accents)
  const cornerColor = isDarkTheme ? "border-white/20 group-hover:border-purple-500" : "border-slate-300 group-hover:border-emerald-500";

  const stats = [
    { value: 40, label: "Projetos Entregues", suffix: "+", code: "PRJ_DONE" },
    { value: 30, label: "Sites Desenvolvidos", suffix: "+", code: "WEB_DEPLOY" },
    { value: 4, label: "Anos de Experiência", suffix: "", code: "EXP_YEARS" },
    { value: 8, label: "Clientes Recorrentes", suffix: "+", code: "CLI_RTN" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className={`py-16 transition-colors duration-500 ${sectionBg}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <StatCounter
                key={index}
                {...stat}
                isVisible={isVisible}
                delay={index * 100}
                cardBg={cardBg}
                labelColor={labelColor}
                codeColor={codeColor}
                numberColor={numberColor}
                cornerColor={cornerColor}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCounter = ({
  value,
  label,
  suffix,
  code,
  isVisible,
  delay,
  cardBg,
  labelColor,
  codeColor,
  numberColor,
  cornerColor
}: any) => {
  const [count, setCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const timeout = setTimeout(() => {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      timerRef.current = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          if (timerRef.current) clearInterval(timerRef.current);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isVisible, value, delay]);

  return (
    <div className={`relative p-6 rounded-lg transition-all duration-300 group ${cardBg}`}>

      {/* Elementos Decorativos de "HUD" (Cantos Técnicos) */}
      <div className={`absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 transition-colors duration-300 ${cornerColor}`} />
      <div className={`absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 transition-colors duration-300 ${cornerColor}`} />

      <div className="flex flex-col items-start gap-1 relative z-10">
        {/* Etiqueta de Código */}
        <span className={`text-[10px] font-mono font-bold tracking-widest uppercase mb-1 flex items-center gap-2 ${codeColor}`}>
          <span className="w-1 h-1 rounded-full bg-current animate-pulse"></span>
          {`// ${code}`}
        </span>

        {/* Valor Numérico */}
        <div className={`text-4xl sm:text-5xl font-bold tracking-tighter tabular-nums ${numberColor}`}>
          {count}{suffix}
        </div>

        {/* Descrição */}
        <p className={`text-xs sm:text-sm font-medium uppercase tracking-wide mt-1 ${labelColor}`}>
          {label}
        </p>
      </div>
    </div>
  );
};

export default Stats;