import { useEffect, useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
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
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import AOS from "aos";
import "aos/dist/aos.css";

const Technologies = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // -- Detecção de Tema Blindada --
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
  }, []);

  // -- Inicialização de Partículas --
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  // -- Configuração Dinâmica das Partículas --
  const particleColors = isDarkTheme
    ? ["#7c3aed", "#2563eb", "#ffffff"] // Roxo, Azul, Branco (Dark)
    : ["#059669", "#10b981", "#34d399"]; // Tons de Verde (Light)

  const linksColor = isDarkTheme ? "#4c1d95" : "#a7f3d0"; // Linhas Roxo Escuro (Dark) vs Verde Claro (Light)

  // -- Estilos Dinâmicos --
  // Fundo
  const sectionBgClass = isDarkTheme
    ? "bg-[#030014]" // Azul Profundo (Dark)
    : "bg-white";    // Branco (Light)

  // Card
  const cardClass = isDarkTheme
    ? "bg-white/5 border-white/10 hover:border-purple-500/50 hover:bg-white/10"
    : "bg-white border-slate-200 shadow-md hover:shadow-xl hover:border-green-500/50";

  // Texto
  const titleColor = isDarkTheme ? "text-white" : "text-slate-900";
  const textColor = isDarkTheme ? "text-slate-400" : "text-slate-600";

  // Gradiente do Título
  const gradientText = isDarkTheme
    ? "from-purple-600 via-indigo-500 to-blue-600"
    : "from-green-600 via-emerald-500 to-teal-600";

  // Badge
  const badgeClass = isDarkTheme
    ? "bg-purple-500/10 text-purple-200 border-purple-500/20 hover:bg-purple-500/20"
    : "bg-green-100 text-green-800 border-green-200 hover:bg-green-200";

  // Ícone
  const iconBg = isDarkTheme ? "bg-purple-500/20" : "bg-green-100";
  const iconColor = isDarkTheme ? "text-purple-400" : "text-green-600";

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
      // Adicionado React aqui como pedido
      techs: ["React", "Node.js", "APIs RESTful", "HTML5", "CSS3", "Tailwind", "Git", "CI/CD"],
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
    <section id="technologies" className={`py-20 relative overflow-hidden transition-colors duration-500 ${sectionBgClass}`}>

      {/* --- PARTÍCULAS --- */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <Particles
          id="techParticles"
          init={particlesInit}
          key={isDarkTheme ? "dark" : "light"}
          options={{
            fullScreen: { enable: false },
            particles: {
              number: { value: 30 },
              color: { value: particleColors },
              shape: { type: "circle" },
              opacity: { value: 0.3 },
              size: { value: { min: 1, max: 3 } },
              move: { enable: true, speed: 0.3, direction: "none", random: true, outModes: "out" },
              links: {
                enable: true,
                distance: 150,
                color: linksColor,
                opacity: 0.15,
                width: 1
              },
            },
            interactivity: {
              events: { onHover: { enable: true, mode: "grab" } },
              modes: { grab: { distance: 140, links: { opacity: 0.4 } } },
            },
            retina_detect: true,
          }}
          style={{ position: "absolute", width: "100%", height: "100%" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Cabeçalho */}
          <div className="text-center mb-16 space-y-4">
            <h2
              className={`text-4xl sm:text-5xl font-bold transition-colors duration-300 ${titleColor}`}
              data-aos="fade-right"
              data-aos-once="false"
            >
              Minha <span className={`bg-gradient-to-r ${gradientText} bg-clip-text text-transparent animate-gradient-x`}>Stack Técnica</span>
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
                    <div className={`p-3 rounded-full transition-colors duration-300 ${iconBg}`}>
                      <Icon className={`w-7 h-7 transition-colors duration-300 ${iconColor}`} />
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
                        className={`transition-colors px-3 py-1 border ${badgeClass}`}
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