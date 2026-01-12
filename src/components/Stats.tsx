import { useEffect, useRef, useState } from "react";
import { useTheme } from "./theme-provider";

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const stats = [
    { value: 40, label: "Projetos Entregues", suffix: "+", code: "PRJ_DONE" },
    {
      value: 30,
      label: "Sites Desenvolvidos",
      suffix: "+",
      code: "WEB_DEPLOY",
    },
    { value: 8, label: "Clientes Recorrentes", suffix: "+", code: "CLI_RTN" },
  ];

  return (
    <section
      id="stats"
      ref={sectionRef}
      // bg-background e border-border cuidam do tema claro/escuro automaticamente
      className="py-16 transition-colors duration-500 bg-background border-y border-border"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-center max-w-7xl mx-auto">
          {/* GRID MOBILE: 2 colunas 
              LG: Flex horizontal
          */}
          <div className="grid grid-cols-2 lg:flex lg:flex-row lg:justify-center gap-4 lg:gap-12 w-full lg:w-auto">
            {stats.map((stat, index) => (
              <StatCounter
                key={index}
                {...stat}
                isVisible={isVisible}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCounter = ({ value, label, suffix, code, isVisible, delay }: any) => {
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
    /* MÁGICA DO MOBILE: 
       last:col-span-2 -> O último quadrado ocupa as duas colunas
       last:max-w-[calc(50%-8px)] -> (Opcional) Ajuste de largura no mobile
    */
    <div className="relative p-8 rounded-lg transition-all duration-300 group bg-card border border-border shadow-sm hover:shadow-md min-w-[160px] sm:min-w-[200px] last:col-span-2 last:w-full sm:last:w-auto last:max-w-xs last:mx-auto lg:last:col-span-1">
      {/* Cantoneiras usando a cor Primary (Azul no Light / Roxo no Dark) */}
      <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 transition-colors duration-300 border-border group-hover:border-primary" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 transition-colors duration-300 border-border group-hover:border-primary" />

      <div className="flex flex-col items-center text-center gap-2 relative z-10">
        <span className="text-[10px] font-mono font-bold tracking-widest uppercase mb-1 flex items-center gap-2 text-primary opacity-70">
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
          {`// ${code}`}
        </span>

        <div className="text-4xl sm:text-6xl font-black tracking-tighter tabular-nums text-foreground">
          {count}
          {suffix}
        </div>

        <p className="text-[10px] sm:text-sm font-bold uppercase tracking-widest mt-1 text-muted-foreground">
          {label}
        </p>
      </div>
    </div>
  );
};

export default Stats;
