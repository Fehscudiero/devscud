import { useEffect } from "react";
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
import AOS from "aos";
import "aos/dist/aos.css";

const Technologies = () => {
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
    <section id="technologies" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2
              className="text-4xl sm:text-5xl font-bold"
              data-aos="fade-right"
              data-aos-once="false"
            >
              Minha <span className="text-gradient">Stack Técnica</span>
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              data-aos="fade-left"
              data-aos-once="false"
            >
              Domínio de tecnologias modernas para desenvolver soluções digitais eficientes e escaláveis
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center text-center">
            {techCategories.map((category, index) => {
              const Icon = category.icon;
              const effect = effects[index % effects.length];

              return (
                <div
                  key={index}
                  data-aos={effect}
                  data-aos-once="false"
                  className="flex flex-col items-center space-y-6 p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group shadow-md"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-xl text-foreground">{category.title}</h3>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2">
                    {category.techs.map((tech, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-primary/5 text-sm text-foreground border-primary/20 hover:bg-primary/10 transition-colors px-3 py-1"
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
