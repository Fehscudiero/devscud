import { useEffect, useState, useRef } from "react";
import {
  Github,
  ExternalLink,
  ArrowUpRight,
  Trophy,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Autoplay,
  Navigation,
} from "swiper/modules";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const CircularScore = ({ score, label }: { score: number; label: string }) => {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="flex flex-col items-center gap-1 group/score">
      <div className="relative w-10 h-10 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="20"
            cy="20"
            r={radius}
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            className="text-white/10"
          />
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            whileInView={{
              strokeDashoffset: circumference - (score / 100) * circumference,
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="20"
            cy="20"
            r={radius}
            stroke="#22d3ee"
            strokeWidth="2"
            fill="transparent"
            strokeDasharray={circumference}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-[9px] font-bold text-cyan-400">
          {score}
        </span>
      </div>
      <span className="text-[7px] font-bold text-slate-500 uppercase tracking-tighter">
        {label}
      </span>
    </div>
  );
};

const Projects = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const textX = useTransform(
    useSpring(scrollYProgress, { stiffness: 100, damping: 30 }),
    [0, 1],
    [-150, 150]
  );

  useEffect(() => {
    const checkTheme = () =>
      setIsDarkTheme(document.documentElement.classList.contains("dark"));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const allProjects = [
    {
      title: "SaaS Enterprise Dashboard",
      description:
        "Plataforma de gestão completa com analytics em tempo real e automações via IA.",
      technologies: ["React", "Next.js", "Supabase"],
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      links: { github: "#", live: "#" },
      scores: { perf: 98, acc: 100, pract: 100, seo: 100 },
    },
    {
      title: "E-commerce High-End",
      description:
        "Loja virtual premium com experiência 3D e checkout otimizado.",
      technologies: ["Three.js", "React", "Node"],
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
      links: { github: "#", live: "#" },
      scores: { perf: 100, acc: 96, pract: 100, seo: 100 },
    },
    {
      title: "Fintech Mobile App",
      description:
        "App financeiro com gráficos interativos e sincronização via Open Finance.",
      technologies: ["React Native", "Expo"],
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
      links: { github: "#", live: "#" },
      scores: { perf: 95, acc: 98, pract: 100, seo: 92 },
    },
    {
      title: "Portal de Notícias SEO",
      description:
        "CMS robusto para mídia de alto tráfego com renderização ISR avançada.",
      technologies: ["Next.js", "GraphQL", "Redis"],
      image:
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
      links: { github: "#", live: "#" },
      scores: { perf: 99, acc: 100, pract: 98, seo: 100 },
    },
    {
      title: "AI Landing Page",
      description:
        "Site institucional com animações complexas e storytelling interativo.",
      technologies: ["Framer", "Vite", "Tailwind"],
      image:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
      links: { github: "#", live: "#" },
      scores: { perf: 100, acc: 100, pract: 100, seo: 100 },
    },
    {
      title: "Sistema de Delivery",
      description:
        "Plataforma multi-tenant com rastreamento em tempo real via WebSocket.",
      technologies: ["Vue.js", "Firebase", "Maps"],
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
      links: { github: "#", live: "#" },
      scores: { perf: 92, acc: 95, pract: 96, seo: 100 },
    },
    {
      title: "Plataforma LMS",
      description:
        "Ambiente de aprendizado com gamificação e certificados automáticos.",
      technologies: ["React", "Node.js", "Postgres"],
      image:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
      links: { github: "#", live: "#" },
      scores: { perf: 96, acc: 98, pract: 100, seo: 95 },
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`py-24 relative overflow-hidden transition-colors duration-1000 ${
        isDarkTheme ? "bg-[#030014]" : "bg-slate-50"
      }`}
    >
      {/* MARCA D'ÁGUA CINÉTICA */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none select-none z-0">
        <motion.h2
          style={{ x: textX }}
          className="text-[15vw] font-black opacity-[0.03] dark:opacity-[0.05] whitespace-nowrap dark:text-white text-black uppercase"
        >
          Projetos_Portfolio
        </motion.h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 text-center lg:text-left">
          <p className="font-mono text-xs tracking-[0.5em] text-cyan-400 uppercase mb-2">
            System_Initialize // 2026
          </p>
          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter dark:text-white text-slate-900">
            LASER{" "}
            <span className="italic bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              SCANNER_
            </span>
          </h2>
        </div>

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 5,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
          className="pb-24 !overflow-visible"
        >
          {allProjects.map((project, index) => (
            <SwiperSlide
              key={index}
              className="max-w-[320px] sm:max-w-[700px] group"
              onClick={() => swiperRef.current?.slideToLoop(index)}
            >
              <div
                className={`relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-[2.5rem] border-2 transition-all duration-500
                ${
                  activeIndex === index
                    ? "border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.2)]"
                    : "border-white/5 opacity-40 scale-90 grayscale"
                }`}
              >
                {/* EFEITO LASER (VARREDURA) */}
                {activeIndex === index && (
                  <div className="absolute inset-0 z-30 pointer-events-none">
                    <motion.div
                      animate={{ top: ["-10%", "110%"] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee] z-40"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,255,255,0.02)_50%)] bg-[length:100%_4px] z-20 opacity-30" />
                  </div>
                )}

                {/* IMAGEM E OVERLAY */}
                <div className="absolute inset-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/60 to-transparent z-10" />
                </div>

                {/* HUD INFO */}
                <div className="absolute top-6 left-8 right-8 flex justify-between items-start z-40">
                  <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md p-2 rounded-lg border border-white/10">
                    <ShieldCheck className="text-cyan-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-[8px] sm:text-[10px] font-mono text-white/70 uppercase tracking-widest">
                      Secure_Access: Granted
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={project.links.github}
                      className="p-2 sm:p-3 rounded-full bg-white/5 hover:bg-cyan-500 transition-colors border border-white/10"
                    >
                      <Github size={18} className="text-white" />
                    </a>
                  </div>
                </div>

                {/* CARD CONTENT */}
                <motion.div
                  animate={{
                    y: activeIndex === index ? 0 : 150,
                    opacity: activeIndex === index ? 1 : 0,
                  }}
                  className="absolute inset-x-0 bottom-0 p-6 sm:p-12 z-40 bg-gradient-to-t from-black via-black/90 to-transparent"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-end gap-6">
                    <div className="flex-1 space-y-3">
                      <h3 className="text-2xl sm:text-5xl font-black text-white tracking-tighter flex items-center gap-4">
                        {project.title}
                        <Zap
                          className="text-cyan-400 fill-cyan-400 animate-pulse hidden sm:block"
                          size={24}
                        />
                      </h3>
                      <p className="text-slate-300 text-[12px] sm:text-base max-w-md font-medium leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.technologies.map((t, i) => (
                          <span
                            key={i}
                            className="text-[8px] sm:text-[9px] font-bold px-2 sm:px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20 uppercase"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-2xl sm:rounded-3xl border border-white/10 backdrop-blur-xl shrink-0">
                      <CircularScore score={project.scores.perf} label="PERF" />
                      <CircularScore score={project.scores.acc} label="ACC" />
                      <CircularScore
                        score={project.scores.pract}
                        label="BEST"
                      />
                      <CircularScore score={project.scores.seo} label="SEO" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .swiper-pagination-bullet { 
          width: 8px !important; height: 8px !important; background: #22d3ee !important; 
          opacity: 0.2 !important; transition: all 0.3s;
        }
        .swiper-pagination-bullet-active { 
          width: 30px !important; border-radius: 4px !important; opacity: 1 !important;
          box-shadow: 0 0 15px rgba(34,211,238,0.8);
        }
      `,
        }}
      />
    </section>
  );
};

export default Projects;
