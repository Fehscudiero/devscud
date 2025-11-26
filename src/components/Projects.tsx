import { useEffect, useState } from "react";
import { Github, ExternalLink, ArrowUpRight, Trophy, Zap, Layout, Search } from "lucide-react";

// MOCK AOS (Para evitar erro no preview). 
// No seu projeto local, use os imports reais: import AOS from "aos"; import "aos/dist/aos.css";
const AOS = {
  init: (config: any) => console.log("AOS init", config),
  refresh: () => console.log("AOS refresh"),
};

// Componente Circular Progress (Estilo Lighthouse)
const CircularScore = ({ score, label, delay }: { score: number; label: string; delay: number }) => {
  const [currentScore, setCurrentScore] = useState(0);
  const radius = 16;
  const circumference = 2 * Math.PI * radius;

  // Cor baseada na pontuação (Padrão Lighthouse)
  const getColor = (val: number) => {
    if (val >= 90) return "#0cce6b"; // Verde
    if (val >= 50) return "#ffa400"; // Laranja
    return "#ff4e42"; // Vermelho
  };

  const color = getColor(score);

  return (
    <div className="flex flex-col items-center gap-1 group/score">
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Fundo do círculo */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            className="text-slate-200/20"
          />
          {/* Progresso animado */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke={color}
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (score / 100) * circumference}
            className="transition-all duration-1000 ease-out"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-[10px] font-bold" style={{ color }}>
          {score}
        </span>
      </div>
      <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wider text-center group-hover/score:text-slate-200 transition-colors">
        {label}
      </span>
    </div>
  );
};

const Projects = () => {
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

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });
    AOS.refresh();
  }, []);

  // -- Dados dos 7 Projetos (Focados em suas tecnologias) --
  const projects = [
    {
      title: "SaaS Enterprise Dashboard",
      description: "Plataforma de gestão completa com analytics em tempo real, controle de equipes multicamada e automações via IA.",
      technologies: ["React", "Next.js", "Tailwind", "Supabase"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      size: "large", // Ocupa 2 colunas
      links: { github: "#", live: "#" },
      scores: { performance: 98, accessibility: 100, bestPractices: 100, seo: 100 }
    },
    {
      title: "E-commerce High-End",
      description: "Loja virtual premium com experiência 3D e checkout otimizado para conversão máxima.",
      technologies: ["Shopify Headless", "Three.js", "React"],
      // NOVA IMAGEM: Moda/Shopping de Luxo para combinar com "High-End"
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop",
      size: "small", // Ocupa 1 coluna
      links: { github: "#", live: "#" },
      scores: { performance: 100, accessibility: 96, bestPractices: 100, seo: 100 }
    },
    {
      title: "Fintech Mobile App",
      description: "App financeiro com gráficos interativos e sincronização bancária via Open Finance.",
      technologies: ["React Native", "Expo", "Node.js"],
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
      size: "small", // Ocupa 1 coluna
      links: { github: "#", live: "#" },
      scores: { performance: 95, accessibility: 98, bestPractices: 100, seo: 92 }
    },
    {
      title: "Portal de Notícias SEO-First",
      description: "CMS robusto para mídia de alto tráfego com renderização ISR e cache avançado para Core Web Vitals perfeitos.",
      technologies: ["Next.js", "GraphQL", "Redis"],
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop",
      size: "large", // Ocupa 2 colunas
      links: { github: "#", live: "#" },
      scores: { performance: 99, accessibility: 100, bestPractices: 98, seo: 100 }
    },
    {
      title: "Landing Page AI Startup",
      description: "Site institucional com animações complexas (Framer Motion) e storytelling interativo.",
      technologies: ["Framer Motion", "React", "Vite"],
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop",
      size: "small", // Ocupa 1 coluna
      links: { github: "#", live: "#" },
      scores: { performance: 100, accessibility: 100, bestPractices: 100, seo: 100 }
    },
    {
      title: "Sistema de Delivery",
      description: "Plataforma multi-tenant para restaurantes com rastreamento em tempo real via WebSocket.",
      technologies: ["Vue.js", "Firebase", "Google Maps API"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      size: "small", // Ocupa 1 coluna
      links: { github: "#", live: "#" },
      scores: { performance: 92, accessibility: 95, bestPractices: 96, seo: 100 }
    },
    {
      title: "Plataforma LMS de Cursos",
      description: "Ambiente de aprendizado com área de membros, gamificação e emissão de certificados automáticos.",
      technologies: ["React", "Node.js", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
      size: "small", // Ocupa 1 coluna
      links: { github: "#", live: "#" },
      scores: { performance: 96, accessibility: 98, bestPractices: 100, seo: 95 }
    },
  ];

  // -- Estilos Dinâmicos --
  // Fundo: Dark (Azul Profundo) vs Light (Branco)
  const sectionBgClass = isDarkTheme ? "bg-[#030014]" : "bg-white";

  const titleColor = isDarkTheme ? "text-foreground" : "text-slate-900";
  const textColor = isDarkTheme ? "text-muted-foreground" : "text-slate-600";

  // Card Styles
  const cardBorder = isDarkTheme ? "border-border" : "border-slate-200";
  const cardShadow = isDarkTheme ? "" : "shadow-2xl hover:shadow-3xl";

  // Gradiente do Título Principal
  const titleGradient = isDarkTheme
    ? "from-purple-600 via-indigo-500 to-blue-600"
    : "from-green-600 via-emerald-500 to-teal-600";

  return (
    <section id="projects" className={`py-20 relative overflow-hidden transition-colors duration-500 ${sectionBgClass}`}>

      {/* Luzes Ambientais de Fundo (Igual ao Hero/About/Services) */}
      <div className={`absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none ${isDarkTheme ? 'bg-purple-600' : 'bg-green-400'}`} />
      <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none ${isDarkTheme ? 'bg-blue-600' : 'bg-teal-400'}`} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho */}
          <div className="text-center mb-16 space-y-4" data-aos="fade-down">
            <h2 className={`text-4xl sm:text-5xl font-bold transition-colors duration-300 ${titleColor}`}>
              Excelência em <span className={`bg-gradient-to-r ${titleGradient} bg-clip-text text-transparent`}>Cada Pixel</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${textColor}`}>
              Projetos desenvolvidos com foco obsessivo em performance, acessibilidade e SEO.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[450px]">
            {projects.map((project, index) => {
              const colSpan = project.size === "large" ? "md:col-span-2" : "md:col-span-1";

              return (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className={`group relative overflow-hidden rounded-[2rem] border transition-all duration-500 ${colSpan} bg-card ${cardBorder} ${cardShadow} hover:border-purple-500/50`}
                >
                  {/* Imagem de Fundo com Zoom Parallax */}
                  <div className="absolute inset-0 h-full w-full overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                    />
                    {/* Overlay Gradiente Dinâmico */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/60 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
                  </div>

                  {/* Badges Flutuantes (Topo) */}
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                    <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-black/30 backdrop-blur-md rounded-full border border-white/10">
                      <Trophy className="w-3 h-3 text-yellow-400" />
                      Featured
                    </span>
                  </div>

                  {/* Barra de Links (Topo Direita - Slide In) */}
                  <div className="absolute top-6 right-6 flex gap-2 translate-x-10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 z-20">
                    <a
                      href={project.links.github}
                      className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all border border-white/20 hover:scale-110"
                      title="Ver Código"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={project.links.live}
                      className="p-3 rounded-full bg-purple-600 text-white hover:bg-purple-500 transition-all shadow-lg hover:shadow-purple-500/50 hover:scale-110"
                      title="Ver Projeto Online"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>

                  {/* Conteúdo Principal (Bottom Slide Up) */}
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end translate-y-[35%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-10">

                    {/* Título e Descrição */}
                    <div className="space-y-2 mb-6 transition-all duration-300">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                        {project.title}
                        <ArrowUpRight className="w-6 h-6 text-purple-400 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                      </h3>
                      <p className="text-slate-300 line-clamp-2 group-hover:line-clamp-none transition-all duration-300 text-sm sm:text-base">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white/10 backdrop-blur-md text-purple-200 border border-white/10 hover:bg-white/20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* DIVISOR */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

                    {/* SCORE BOARD (Estilo PageSpeed/Lighthouse) */}
                    <div className="grid grid-cols-4 gap-2 sm:gap-4 bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/5 transform translate-y-4 opacity-0 transition-all duration-500 delay-100 group-hover:translate-y-0 group-hover:opacity-100">
                      <CircularScore score={project.scores.performance} label="Performance" delay={0} />
                      <CircularScore score={project.scores.accessibility} label="Acessibilidade" delay={100} />
                      <CircularScore score={project.scores.bestPractices} label="Práticas" delay={200} />
                      <CircularScore score={project.scores.seo} label="SEO" delay={300} />
                    </div>

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

export default Projects;