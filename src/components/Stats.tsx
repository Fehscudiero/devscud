import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme-provider";

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // -- Integração com Tema --
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

  // -- Estilos Manuais --
  // Dark: Gradiente sutil escuro. Light: Gradiente sutil claro com toque de roxo
  const bgGradient = isDarkTheme
    ? "from-[#020817] via-[#1e293b]/20 to-[#020817]"
    : "from-white via-purple-50/50 to-white";

  const stats = [
    { value: 40, label: "Projetos Entregues", suffix: "+" },
    { value: 30, label: "Sites Desenvolvidos", suffix: "+" },
    { value: 4, label: "Anos de Experiência", suffix: "+" },
    { value: 8, label: "Clientes Recorrentes", suffix: "+" },
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
      className={`py-20 bg-gradient-to-b transition-colors duration-500 ${bgGradient}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <StatCounter
                key={index}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                isVisible={isVisible}
                delay={index * 100}
                isDarkTheme={isDarkTheme}
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
  isVisible,
  delay,
  isDarkTheme,
}: {
  value: number;
  label: string;
  suffix: string;
  isVisible: boolean;
  delay: number;
  isDarkTheme: boolean;
}) => {
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

  const labelColor = isDarkTheme ? "text-slate-400" : "text-slate-600";

  return (
    <div className="text-center space-y-2 animate-fade-in">
      <div className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        {suffix === "+" ? "+" : ""}
        {count}
        {suffix !== "+" ? suffix : ""}
      </div>
      <p className={`text-sm sm:text-base font-medium transition-colors duration-300 ${labelColor}`}>
        {label}
      </p>
    </div>
  );
};

export default Stats;