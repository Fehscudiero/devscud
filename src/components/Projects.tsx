import { useEffect, useState } from "react";
import { Github, ExternalLink, ArrowUpRight, Trophy } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Reaproveitando seu componente CircularScore original
const CircularScore = ({ score, label, isMobileView }: { score: number; label: string; isMobileView: boolean }) => {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const getColor = (val: number) => {
    if (val >= 90) return "#0cce6b";
    if (val >= 50) return "#ffa400";
    return "#ff4e42";
  };
  const color = getColor(score);

  return (
    <div className="flex flex-col items-center gap-1 group/score">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="24" cy="24" r={radius} stroke="currentColor" strokeWidth="3" fill="transparent" className="text-slate-200/20" />
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
        <span className="absolute text-[10px] font-bold" style={{ color }}>{score}</span>
      </div>
      {!isMobileView && (
        <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wider text-center group-hover/score:text-slate-200 transition-colors">
          {label}
        </span>
      )}
    </div>
  );
};

const Projects = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkTheme = () => setIsDarkTheme(document.documentElement.classList.contains("dark"));
    const checkViewport = () => setIsMobileView(window.innerWidth < 768);

    checkTheme();
    checkViewport();
    window.addEventListener('resize', checkViewport);
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener('resize', checkViewport);
      observer.disconnect();
    };
  }, []);

  const allProjects = [
    {
      title: "SaaS Enterprise Dashboard",
      description: "Plataforma de gestão completa com analytics em tempo real, controle de equipes multicamada e automações via IA.",
      technologies: ["React", "Next.js", "Tailwind", "Supabase"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      links: { github: "#", live: "#" },
      scores: { performance: 98, accessibility: 100, bestPractices: 100, seo: 100 },
      slug: "saas",
    },
    {
      title: "E-commerce High-End",
      description: "Loja virtual premium com experiência 3D e checkout otimizado para conversão máxima.",
      technologies: ["Shopify Headless", "Three.js", "React"],
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop",
      links: { github: "#", live: "#" },
      scores: { performance: 100, accessibility: 96, bestPractices: 100, seo: 100 },
      slug: "ecommerce",
    },
    {
      title: "Fintech Mobile App",
      description: "App financeiro com gráficos interativos e sincronização bancária via Open Finance.",
      technologies: ["React Native", "Expo", "Node.js"],
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
      links: { github: "#", live: "#" },
      scores: { performance: 95, accessibility: 98, bestPractices: 100, seo: 92 },
      slug: "fintech",
    },
    {
      title: "Portal de Notícias SEO-First",
      description: "CMS robusto para mídia de alto tráfego com renderização ISR e cache avançado.",
      technologies: ["Next.js", "GraphQL", "Redis"],
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop",
      links: { github: "#", live: "#" },
      scores: { performance: 99, accessibility: 100, bestPractices: 98, seo: 100 },
      slug: "portal",
    },
    {
      title: "Landing Page AI Startup",
      description: "Site institucional com animações complexas (Framer Motion) e storytelling interativo.",
      technologies: ["Framer Motion", "React", "Vite"],
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop",
      links: { github: "#", live: "#" },
      scores: { performance: 100, accessibility: 100, bestPractices: 100, seo: 100 },
      slug: "ai_landing",
    },
    {
      title: "Sistema de Delivery",
      description: "Plataforma multi-tenant para restaurantes com rastreamento em tempo real via WebSocket.",
      technologies: ["Vue.js", "Firebase", "Google Maps API"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      links: { github: "#", live: "#" },
      scores: { performance: 92, accessibility: 95, bestPractices: 96, seo: 100 },
      slug: "delivery",
    },
    {
      title: "Plataforma LMS de Cursos",
      description: "Ambiente de aprendizado com área de membros, gamificação e certificados automáticos.",
      technologies: ["React", "Node.js", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
      links: { github: "#", live: "#" },
      scores: { performance: 96, accessibility: 98, bestPractices: 100, seo: 95 },
      slug: "lms",
    },
  ];

  const mobileProjectSlugs = ["saas", "ecommerce", "ai_landing"];
  const filteredProjects = isMobileView
    ? allProjects.filter(p => mobileProjectSlugs.includes(p.slug))
    : allProjects;

  const sectionBgClass = isDarkTheme ? "bg-[#030014]" : "bg-slate-50";
  const accentColor = isDarkTheme ? "text-cyan-400" : "text-emerald-600";
  const accentGradient = isDarkTheme ? "from-purple-500 via-cyan-400 to-blue-500" : "from-emerald-600 to-teal-600";

  return (
    <section id="projects" className={`py-24 relative overflow-hidden transition-colors duration-1000 ${sectionBgClass}`}>

      {/* Background Cinético Padronizado */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[150px] opacity-10 pointer-events-none transition-colors duration-1000 ${isDarkTheme ? 'bg-indigo-600' : 'bg-emerald-200'}`} />

      <div className="container mx-auto px-6 relative z-10">

        {/* TÍTULO PADRONIZADO AQUI */}
        <div className="mb-12 text-center lg:text-left">
          <motion.p className={`font-mono text-xs tracking-[0.5em] uppercase mb-4 ${accentColor}`}>
            Portfolio_Module // 2026
          </motion.p>
          <h2 className={`text-4xl lg:text-6xl font-black tracking-tighter ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>
            PROJETOS <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent italic`}>EM DESTAQUE_</span>
          </h2>
        </div>

        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          loop={true}
          coverflowEffect={{
            rotate: 25,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="pb-20 pt-10 !overflow-visible"
        >
          {filteredProjects.map((project, index) => (
            <SwiperSlide key={index} className="max-w-[340px] sm:max-w-[550px] group">
              <div className={`relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-[2.5rem] border ${isDarkTheme ? 'border-white/10 bg-slate-900' : 'border-slate-200 bg-white'} shadow-2xl`}>

                {/* Background Image com Zoom */}
                <div className="absolute inset-0 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${isDarkTheme ? 'from-[#030014] via-[#030014]/60' : 'from-white via-white/40'} to-transparent`} />
                </div>

                {/* Badge Flutuante */}
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <span className="flex items-center gap-1.5 px-4 py-1.5 text-[10px] font-bold uppercase bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white">
                    <Trophy className="w-3 h-3 text-yellow-400" /> Case de Sucesso
                  </span>
                </div>

                {/* Botões de Ação */}
                <div className="absolute top-6 right-6 flex gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 z-20">
                  <a href={project.links.github} className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all border border-white/20">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={project.links.live} className={`p-3 rounded-full ${isDarkTheme ? 'bg-cyan-500' : 'bg-emerald-600'} text-white hover:scale-110 transition-all shadow-lg`}>
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>

                {/* Conteúdo Inferior Slide-Up */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 flex flex-col justify-end translate-y-[45%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-10">

                  <div className="space-y-3 mb-6">
                    <h3 className={`text-2xl sm:text-4xl font-bold flex items-center gap-3 ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>
                      {project.title}
                      <ArrowUpRight className={`w-6 h-6 ${accentColor} opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0`} />
                    </h3>
                    <p className={`text-sm sm:text-base line-clamp-2 group-hover:line-clamp-none transition-all ${isDarkTheme ? 'text-slate-300' : 'text-slate-600'}`}>
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className={`px-3 py-1 text-[10px] font-semibold rounded-lg border ${isDarkTheme ? 'bg-white/10 border-white/10 text-cyan-400' : 'bg-slate-100 border-slate-200 text-emerald-700'}`}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Divisor */}
                  <div className={`h-px w-full bg-gradient-to-r from-transparent ${isDarkTheme ? 'via-white/20' : 'via-slate-200'} to-transparent mb-6`} />

                  {/* Lighthouse Scores */}
                  <div className={`grid grid-cols-4 gap-4 backdrop-blur-xl rounded-2xl p-4 border opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 ${isDarkTheme ? 'bg-black/40 border-white/5' : 'bg-white/80 border-slate-100'}`}>
                    <CircularScore score={project.scores.performance} label="Performance" isMobileView={isMobileView} />
                    <CircularScore score={project.scores.accessibility} label="Acessibilidade" isMobileView={isMobileView} />
                    <CircularScore score={project.scores.bestPractices} label="Práticas" isMobileView={isMobileView} />
                    <CircularScore score={project.scores.seo} label="SEO" isMobileView={isMobileView} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .swiper-pagination-bullet { background: ${isDarkTheme ? '#22d3ee' : '#059669'} !important; opacity: 0.3; }
        .swiper-pagination-bullet-active { opacity: 1; transform: scale(1.3); }
        .swiper-slide-shadow-left, .swiper-slide-shadow-right { border-radius: 2.5rem; }
      `}} />
    </section>
  );
};

export default Projects;