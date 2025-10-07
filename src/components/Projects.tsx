import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Plataforma completa de e-commerce com carrinho, checkout e integração de pagamento. Interface moderna e responsiva.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Stripe"],
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=600&fit=crop",
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      title: "Dashboard Analytics",
      description:
        "Dashboard interativo para visualização de dados com gráficos dinâmicos e métricas em tempo real.",
      technologies: ["React", "Chart.js", "API Integration", "CSS"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      title: "Task Management App",
      description:
        "Aplicativo de gerenciamento de tarefas com drag & drop, categorias e sincronização em tempo real.",
      technologies: ["React", "Firebase", "DnD Kit", "Tailwind"],
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      title: "Portfolio Website",
      description:
        "Site de portfólio minimalista e elegante com animações suaves e design responsivo para fotógrafo profissional.",
      technologies: ["React", "Framer Motion", "Next.js", "CSS"],
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      title: "Weather App",
      description:
        "Aplicativo de previsão do tempo com geolocalização, dados em tempo real e interface intuitiva.",
      technologies: ["React", "OpenWeather API", "Geolocation", "CSS"],
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop",
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      title: "Social Media Clone",
      description:
        "Clone de rede social com feed, posts, comentários e sistema de likes. Autenticação e perfis de usuários.",
      technologies: ["React", "Firebase", "Authentication", "Tailwind"],
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
      github: "https://github.com",
      demo: "https://demo.com",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Meus <span className="text-gradient">Projetos</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Alguns dos projetos que desenvolvi com paixão e dedicação
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
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

                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-primary/50 hover:bg-primary/10"
                      asChild
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Código
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary/90"
                      asChild
                    >
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
