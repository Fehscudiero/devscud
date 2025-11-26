import { useEffect, useState } from "react";
// MOCK Badge para o ambiente de preview (No seu código local, mantenha: import { Badge } from "@/components/ui/badge";)
const Badge = ({ children, className, variant }: any) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </span>
);

import {
  Code2,
  Blocks,
  Database,
  Rocket,
  Terminal,
  Braces,
  Server,
  BarChart2,
  MonitorSmartphone,
  Settings2,
} from "lucide-react";

// MOCK AOS (No seu código local, mantenha os imports originais)
// import AOS from "aos";
// import "aos/dist/aos.css";
const AOS = {
  init: (config: any) => console.log("AOS init", config),
  refresh: () => console.log("AOS refresh"),
};

// REMOVIDO: import { useTheme } from "./theme-provider"; 
// Motivo: Causava erro no preview. Usaremos detecção nativa abaixo.

const Technologies = () => {
  // const { theme } = useTheme(); // Removido
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // -- Detecção de Tema (Sem dependência externa) --
  useEffect(() => {
    const checkTheme = () => {
      const root = window.document.documentElement;
      const isDark = root.classList.contains("dark");
      setIsDarkTheme(isDark);
    };

    // Verifica inicial
    checkTheme();

    // Observa mudanças na classe do HTML (Troca de tema)
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []); // Array vazio, pois o observer cuida das atualizações

  // -- Estilos Dinâmicos --

  // Fundo
  const sectionBgClass = isDarkTheme
    ? "bg-gradient-to-b from-background to-secondary/20"
    : "bg-gradient-to-b from-white via-purple-50/30 to-white";

  // Card
  const cardClass = isDarkTheme
    ? "bg-card border-border hover:border-primary/50"
    : "bg-white border-slate-200 shadow-md hover:shadow-xl hover:border-purple-300";

  // Texto
  const titleColor = isDarkTheme ? "text-foreground" : "text-slate-900";
  const textColor = isDarkTheme ? "text-muted-foreground" : "text-slate-600";

  // Badge
  const badgeClass = isDarkTheme
    ? "bg-primary/5 text-foreground border-primary/20 hover:bg-primary/10"
    : "bg-purple-100 text-purple-900 border-purple-200 hover:bg-purple-200";

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
    AOS.refresh();
  }, []);

  const techCategories = [
    {
      icon: Braces,
      title: "Linguagens de Programação",
      techs: ["JavaScript", "TypeScript", "Python", "Java", "PHP", "C"],
    },
    {
      icon: Server,
      title: "Frameworks e Ferramentas",
      techs: ["Node.js", "APIs RESTful", "HTML5", "CSS3", "Tailwind", "Git", "CI/CD"],
    },
    {
      icon: BarChart2,
      title: "Banco de Dados e Visualização",
      techs: ["SQL", "PostgreSQL", "MySQL", "SQLite", "Power BI", "Dashboards e KPIs"],
    },
    {
      icon: MonitorSmartphone,
      title: "Práticas de Interface e Performance",
      techs: ["Testes Automatizados", "UX/UI", "Design Responsivo", "Otimização de Performance"],
    },
  ];

  const effects = ["zoom-in", "flip-up", "fade-up", "fade-down"];

  return (
    <section id="technologies" className={`py-20 transition-colors duration-500 ${sectionBgClass}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Cabeçalho */}
          <div className="text-center mb-16 space-y-4">
            <h2
              className={`text-4xl sm:text-5xl font-bold transition-colors duration-300 ${titleColor}`}
              data-aos="fade-right"
              data-aos-once="false"
            >
              Minha <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Stack Técnica</span>
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${textColor}`}
              data-aos="fade-left"
              data-aos-once="false"
            >
              Domínio de tecnologias modernas para desenvolver soluções digitais eficientes e escaláveis
            </p>
          </div>

          {/* Grid de Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center text-center">
            {techCategories.map((category, index) => {
              const Icon = category.icon;
              const effect = effects[index % effects.length];

              return (
                <div
                  key={index}
                  data-aos={effect}
                  data-aos-once="false"
                  className={`flex flex-col items-center space-y-6 p-6 rounded-xl transition-all duration-300 group ${cardClass}`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className={`font-semibold text-xl transition-colors duration-300 ${titleColor}`}>
                      {category.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2">
                    {category.techs.map((tech, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className={`transition-colors px-3 py-1 ${badgeClass}`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;