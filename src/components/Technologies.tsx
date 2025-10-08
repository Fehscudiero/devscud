import { Badge } from "@/components/ui/badge";
import { Code2, Palette, Blocks, Rocket } from "lucide-react";

const Technologies = () => {
  const techCategories = [
    {
      icon: Code2,
      title: "Frontend",
      techs: ["React", "TypeScript", "JavaScript"],
    },
    {
      icon: Palette,
      title: "Design",
      techs: ["TailwindCSS", "UI/UX", "Responsive Design"],
    },
    {
      icon: Blocks,
      title: "Arquitetura",
      techs: ["SaaS Architecture", "API Integration", "Performance"],
    },
    {
      icon: Rocket,
      title: "Ferramentas",
      techs: ["Git", "Vite", "Modern Workflow"],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Tecnologias <span className="text-gradient">Dominadas</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stack moderno para criar soluções digitais escaláveis
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={index}
                  className="space-y-4 p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">{category.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.techs.map((tech, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-primary/5 text-foreground border-primary/20 hover:bg-primary/10 transition-colors"
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
