import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import AOS from "aos";
import "aos/dist/aos.css";

const Projects = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
    AOS.refresh();
  }, []);

  const projects = [
    {
      title: "Plataforma SaaS de Gestão Empresarial",
      description:
        "Sistema completo de gestão com dashboard analytics, controle de equipes, automações e integrações. Arquitetura escalável e interface intuitiva.",
      technologies: ["React", "TypeScript", "TailwindCSS", "API Integration"],
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    },
    {
      title: "Portal Corporativo de Alta Performance",
      description:
        "Site institucional premium com CMS integrado, SEO avançado, animações sofisticadas e design responsivo. Focado em conversão e experiência do usuário.",
      technologies: ["React", "TypeScript", "UI/UX", "Performance"],
      image:
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop",
    },
  ];

  const effects = ["fade-right", "fade-left", "zoom-in-up", "flip-up"];

  return (
    <section id="projects" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2
              className="text-4xl sm:text-5xl font-bold"
              data-aos="fade-down"
              data-aos-once="false"
            >
              Meus <span className="text-gradient">Projetos</span>
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-once="false"
            >
              Alguns dos projetos que desenvolvi com paixão e dedicação
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {projects.map((project, index) => {
              const effect = effects[index % effects.length];

              return (
                <Card
                  key={index}
                  data-aos={effect}
                  data-aos-once="false"
                  className="overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
