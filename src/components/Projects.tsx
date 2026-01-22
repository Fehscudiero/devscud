import { useState, useEffect, useCallback } from "react";
import {
  Trophy,
  Zap,
  Monitor,
  CheckCircle2,
  ShoppingCart,
  Search,
  Settings,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import websiteImg from "../assets/website.webp";
import performanceImg from "../assets/performance.webp";
import sistemawebImg from "../assets/sistemaweb.webp";
import evolucaoImg from "../assets/evolucao.webp";
import dominioImg from "../assets/dominio.webp";
import ecommerceImg from "../assets/ecomerce.webp";

const MetricsBox = ({
  value,
  labelDesktop,
  icon: Icon,
}: {
  value: number;
  labelDesktop: string;
  icon: any;
}) => (
  <div className="hidden sm:flex flex-1 border-r border-border p-4 last:border-0 flex-col items-start transition-colors">
    <Icon className="w-4 h-4 text-primary mb-1" />
    <div className="text-xl font-black text-foreground">{value}%</div>
    <div className="text-[8px] uppercase tracking-wider text-muted-foreground font-bold">
      {labelDesktop}
    </div>
  </div>
);

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

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
      id="projects"
      className="py-24 bg-background min-h-screen relative overflow-hidden flex flex-col justify-center"
      style={{ contain: "paint" }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <header className="mb-12">
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
          onSlideChange={(swiper) => setActiveProject(swiper.realIndex)}
          className="w-full max-w-7xl rounded-[2rem] border border-border bg-card shadow-2xl overflow-hidden"
        >
          {services.map((project, index) => (
            <SwiperSlide key={index}>
              <div className="grid lg:grid-cols-2 min-h-[500px]">
                {/* Imagem com Proporção Fixa para evitar CLS */}
                <div className="relative aspect-video lg:aspect-auto h-full bg-muted overflow-hidden">
                  <img
                    src={project.image}
                    alt={`Preview do projeto ${project.title}`}
                    width="800"
                    height="600"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading={index === 0 ? "eager" : "lazy"}
                    // @ts-ignore
                    fetchpriority={index === 0 ? "high" : "low"}
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
                      {project.highlights.map((h) => (
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
                      aria-label={`Solicitar orçamento para ${project.title}`}
                      className="w-full sm:flex-1 bg-foreground text-background font-black py-4 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 active:scale-95 shadow-lg"
                    >
                      SOLICITAR ORÇAMENTO
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navegação inferior Otimizada */}
        <div className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-2">
          {services.map((s, i) => (
            <button
              key={i}
              onClick={() => swiperInstance?.slideToLoop(i)}
              aria-label={`Ver projeto: ${s.shortName}`}
              className={`p-3 rounded-xl border transition-all duration-300 flex flex-col items-center gap-1 
                ${
                  activeProject === i
                    ? "bg-primary border-primary shadow-lg text-white"
                    : "bg-card/50 border-border text-muted-foreground hover:border-primary/50"
                }`}
            >
              <s.icon
                className={`w-4 h-4 ${activeProject === i ? "text-white" : "text-muted-foreground"}`}
              />
              <span
                className={`text-[8px] font-black uppercase tracking-tighter ${activeProject === i ? "text-white" : "text-muted-foreground"}`}
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
