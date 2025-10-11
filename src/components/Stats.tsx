import { useEffect, useRef, useState } from "react";

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: 40, label: "Projetos Entregues", suffix: "+" },
    { value: 35, label: "Sites Desenvolvidos", suffix: "+" },
    { value: 4, label: "Anos de Experiência", suffix: "+" },
    { value: 16, label: "Clientes Recorrentes", suffix: "+" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting); // ativa e desativa conforme entra/sai da tela
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
      className="py-20 bg-gradient-to-b from-background via-secondary/20 to-background"
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
}: {
  value: number;
  label: string;
  suffix: string;
  isVisible: boolean;
  delay: number;
}) => {
  const [count, setCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isVisible) {
      setCount(0); // reinicia quando sai da tela
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
    <div className="text-center space-y-2 animate-fade-in">
      <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient">
        {suffix === "+" ? "+" : ""}
        {count}
        {suffix !== "+" ? suffix : ""}
      </div>
      <p className="text-sm sm:text-base text-muted-foreground font-medium">
        {label}
      </p>
    </div>
  );
};

export default Stats;
