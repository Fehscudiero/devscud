import { useState, useRef, memo } from "react";
import {
  Trophy,
  Zap,
  Monitor,
  CheckCircle2,
  ShoppingCart,
  Search,
  Settings,
  ArrowRight,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Mantenha seus imports de imagem aqui
// @ts-ignore
import websiteImg from "../assets/website.webp?w=600;1200&format=webp&as=srcset";
// @ts-ignore
import performanceImg from "../assets/performance.webp?w=600;1200&format=webp&as=srcset";
// @ts-ignore
import sistemawebImg from "../assets/sistemaweb.webp?w=600;1200&format=webp&as=srcset";
// @ts-ignore
import evolucaoImg from "../assets/evolucao.webp?w=600;1200&format=webp&as=srcset";
// @ts-ignore
import dominioImg from "../assets/dominio.webp?w=600;1200&format=webp&as=srcset";
// @ts-ignore
import ecommerceImg from "../assets/ecomerce.webp?w=600;1200&format=webp&as=srcset";

// 1. Componente de Métricas extraído e Memoizado (Evita recálculos)
const MetricsBox = memo(
  ({
    value,
    labelDesktop,
    icon: Icon,
  }: {
    value: number;
    labelDesktop: string;
    icon: any;
  }) => (
    <div className="hidden sm:flex flex-1 border-r border-border p-4 last:border-0 flex-col items-start">
      <Icon className="w-4 h-4 text-primary mb-1" />
      <div className="text-xl font-black text-foreground">{value}%</div>
      <div className="text-[8px] uppercase tracking-wider text-muted-foreground font-bold">
        {labelDesktop}
      </div>
    </div>
  ),
);

// 2. Slide isolado para evitar re-render do Swiper inteiro ao mudar estado
const ProjectSlideContent = memo(({ project, index, scrollToContact }: any) => {
  return (
    <div className="grid lg:grid-cols-2 min-h-[500px] will-change-transform">
      <div className="relative aspect-video lg:aspect-auto h-full bg-muted overflow-hidden">
        <img
          srcSet={
            typeof project.image === "string"
              ? project.image
              : (project.image as any).srcSet
          }
          sizes="(max-width: 768px) 100vw, 800px"
          src={
            typeof project.image === "string"
              ? project.image
              : (project.image as any).src
          }
          alt={`Preview do projeto ${project.title}`}
          // Otimização LCP: Apenas o primeiro é eager
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent hidden lg:block" />
      </div>

      <div className="p-8 lg:p-12 flex flex-col justify-between">
        <div className="space-y-6">
          <div>
            <span className="text-primary font-bold text-xs uppercase tracking-widest">
              {project.service}
            </span>
            <h3 className="text-3xl lg:text-5xl font-black text-foreground tracking-tighter mt-2 mb-4 leading-tight">
              {project.title}
            </h3>
            <p className="text-base lg:text-lg text-muted-foreground font-medium leading-relaxed">
              {project.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.highlights.map((h: string) => (
              <div
                key={h}
                className="bg-primary/5 border border-primary/10 px-3 py-1 rounded-lg flex items-center gap-2"
              >
                <CheckCircle2 className="w-3 h-3 text-primary" />
                <span className="text-[10px] font-bold text-foreground uppercase">
                  {h}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center gap-6">
          <div className="flex w-full sm:w-auto">
            <MetricsBox
              value={project.metrics.p}
              labelDesktop="Perf."
              icon={Zap}
            />
            <MetricsBox
              value={project.metrics.a}
              labelDesktop="Acess."
              icon={Monitor}
            />
            <MetricsBox
              value={project.metrics.s}
              labelDesktop="SEO"
              icon={Trophy}
            />
          </div>

          <button
            onClick={scrollToContact}
            className="group relative w-full sm:flex-1 bg-foreground text-background font-black py-4 rounded-xl transition-all duration-300 overflow-hidden shadow-lg flex items-center justify-center gap-2 active:scale-95"
          >
            {/* Removi a animação infinita complexa do botão para poupar CPU mobile */}
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 -skew-x-12 pointer-events-none" />
            <span className="relative z-10 uppercase tracking-tighter">
              Solicitar Orçamento
            </span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
          </button>
        </div>
      </div>
    </div>
  );
});

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  // Removido isDarkTheme observer (causava reflow e não estava sendo usado criticamente)

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 50, // Reduzido stiffness para suavizar e consumir menos FPS
    damping: 20,
  });

  const textX = useTransform(smoothScroll, [0, 1], [100, -100]);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const services = [
    {
      shortName: "Websites",
      title: "Websites de Alta Conversão",
      service: "Criação de Websites",
      description:
        "Interfaces que vendem. Focamos em UX Design para guiar o usuário até a conversão final.",
      image: websiteImg,
      metrics: { p: 100, a: 98, s: 100 },
      highlights: ["Design Exclusivo", "Mobile First"],
      icon: Monitor,
    },
    {
      shortName: "Perf.",
      title: "Performance Extrema",
      service: "Otimização de Sites",
      description:
        "Sites que carregam em milissegundos. Transformamos lentidão em velocidade.",
      image: performanceImg,
      metrics: { p: 100, a: 95, s: 99 },
      highlights: ["Lighthouse 100", "Cache Pro"],
      icon: Zap,
    },
    {
      shortName: "Sistemas",
      title: "Sistemas Web Sob Medida",
      service: "Sistemas Web",
      description:
        "Automatize processos complexos com Dashboards e ERPs customizados.",
      image: sistemawebImg,
      metrics: { p: 98, a: 100, s: 95 },
      highlights: ["Escalável", "Segurança"],
      icon: Settings,
    },
    {
      shortName: "Suporte",
      title: "Evolução Contínua",
      service: "Suporte & Evolução",
      description:
        "Monitoramento 24/7 e evolução constante para sua tecnologia.",
      image: evolucaoImg,
      metrics: { p: 99, a: 99, s: 100 },
      highlights: ["SLA Garantido", "Updates"],
      icon: CheckCircle2,
    },
    {
      shortName: "SEO",
      title: "Domínio Orgânico",
      service: "SEO Técnico",
      description:
        "Apareça na primeira página. Técnicas estruturais para o topo do Google.",
      image: dominioImg,
      metrics: { p: 96, a: 98, s: 100 },
      highlights: ["Indexação", "Rank+"],
      icon: Search,
    },
    {
      shortName: "Shop",
      title: "E-commerce Boutique",
      service: "E-commerce High-End",
      description:
        "Venda com experiência de luxo. Checkout fluido e gestão inteligente.",
      image: ecommerceImg,
      metrics: { p: 100, a: 97, s: 98 },
      highlights: ["One-Click Pay", "Upsell"],
      icon: ShoppingCart,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-24 bg-background min-h-screen relative overflow-hidden flex flex-col justify-center content-visibility-auto"
      // content-visibility-auto ajuda o navegador a não renderizar se estiver fora da tela
    >
      {/* MARCA D'ÁGUA PADRONIZADA */}
      <div className="absolute top-0 right-0 w-full overflow-hidden pointer-events-none select-none z-0">
        <motion.h2
          style={{ x: textX }}
          className="text-[15vw] font-black leading-none tracking-tighter uppercase opacity-[0.03] dark:opacity-[0.05] whitespace-nowrap text-right pr-10 text-foreground will-change-transform"
        >
          PROJETOS
        </motion.h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <header className="mb-12">
          {/* Removido o motion.p inicial complexo para evitar CLS */}
          <p className="font-mono text-xs tracking-[0.5em] uppercase mb-4 text-primary font-bold">
            Portfolio_Module // 0{activeProject + 1}
          </p>
          <h2 className="text-5xl md:text-8xl font-black text-foreground tracking-tighter leading-none">
            PROJETOS<span className="text-muted italic">.WEB</span>
          </h2>
        </header>

        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          speed={800}
          onSwiper={setSwiperInstance}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          // A mágica acontece aqui: debounce visual ou apenas atualiza o indice
          onSlideChange={(swiper) => setActiveProject(swiper.realIndex)}
          className="w-full max-w-7xl rounded-[2rem] border border-border bg-card shadow-2xl overflow-hidden"
        >
          {services.map((project, index) => (
            <SwiperSlide key={index}>
              {/* Usando o componente memoizado */}
              <ProjectSlideContent
                project={project}
                index={index}
                scrollToContact={scrollToContact}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* NAVEGAÇÃO */}
        <div className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-2">
          {services.map((s, i) => (
            <button
              key={i}
              onClick={() => swiperInstance?.slideToLoop(i)}
              className={`p-3 rounded-xl border transition-colors duration-200 flex flex-col items-center gap-1 ${
                activeProject === i
                  ? "bg-primary border-primary shadow-lg text-white"
                  : "bg-card/50 border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              <s.icon
                className={`w-4 h-4 ${
                  activeProject === i ? "text-white" : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-[8px] font-black uppercase tracking-tighter ${
                  activeProject === i ? "text-white" : "text-muted-foreground"
                }`}
              >
                {s.shortName}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
