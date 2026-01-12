import { useEffect, useRef, useState } from "react";
import { useTheme } from "./theme-provider";

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      const isDark = window.document.documentElement.classList.contains("dark");
      setIsDarkTheme(isDark);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [theme]);

  const sectionBg = isDarkTheme
    ? "bg-[#030014] border-y border-white/5"
    : "bg-white border-y border-slate-200";

  const cardBg = isDarkTheme
    ? "bg-white/5 hover:bg-white/10 border border-white/5"
    : "bg-slate-50 hover:bg-white border border-slate-200 shadow-sm hover:shadow-md";

  const labelColor = isDarkTheme ? "text-slate-400" : "text-slate-600";
  const codeColor = isDarkTheme ? "text-purple-500/70" : "text-emerald-600/70";
  const numberColor = isDarkTheme ? "text-white" : "text-slate-900";
  const cornerColor = isDarkTheme ? "border-white/20 group-hover:border-purple-500" : "border-slate-300 group-hover:border-emerald-500";

  const stats = [
    { value: 40, label: "Projetos Entregues", suffix: "+", code: "PRJ_DONE" },
    { value: 30, label: "Sites Desenvolvidos", suffix: "+", code: "WEB_DEPLOY" },
    { value: 8, label: "Clientes Recorrentes", suffix: "+", code: "CLI_RTN" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.3 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section id="stats" ref={sectionRef} className={`py-16 transition-colors duration-500 ${sectionBg}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ajuste: justify-center no grid para centralizar os cards caso não preencham toda a largura */}
        <div className="flex justify-center max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:flex lg:flex-row lg:justify-center gap-4 lg:gap-12 w-full lg:w-auto">
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

const StatCounter = ({ value, label, suffix, code, isVisible, delay, cardBg, labelColor, codeColor, numberColor, cornerColor }: any) => {
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
    // Ajuste: min-w-[180px] para garantir consistência visual ao centralizar
    <div className={`relative p-8 rounded-lg transition-all duration-300 group ${cardBg} min-w-[200px]`}>
      <div className={`absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 transition-colors duration-300 ${cornerColor}`} />
      <div className={`absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 transition-colors duration-300 ${cornerColor}`} />

      {/* Ajuste: items-center e text-center para centralizar o conteúdo interno */}
      <div className="flex flex-col items-center text-center gap-2 relative z-10">
        <span className={`text-[10px] font-mono font-bold tracking-widest uppercase mb-1 flex items-center gap-2 ${codeColor}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
          {`// ${code}`}
        </span>

        <div className={`text-5xl sm:text-6xl font-black tracking-tighter tabular-nums ${numberColor}`}>
          {count}{suffix}
        </div>

        <p className={`text-xs sm:text-sm font-bold uppercase tracking-widest mt-1 opacity-80 ${labelColor}`}>
          {label}
        </p>
      </div>
    </div>
  );
};

export default Stats;