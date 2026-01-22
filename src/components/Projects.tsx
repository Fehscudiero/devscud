import { useState } from "react";
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
import { Pagination, Autoplay, EffectFade, Mousewheel } from "swiper/modules";

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
  /* Adicionado 'hidden sm:flex' para esconder todo o bloco no mobile */
  <div className="hidden sm:flex flex-1 border-r border-white/5 p-4 last:border-0 flex-col items-start">
    <Icon className="w-4 h-4 text-purple-500 mb-1" />
    <div className="text-xl font-black text-white">{value}%</div>
    <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold text-left">
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
      icon: Monitor,
    },
    {
      shortName: "Performance",
      title: "Performance Extrema",
      service: "Otimização de Sites",
      description:
        "Sites que carregam em milissegundos. Transformamos lentidão em velocidade.",
      image: performanceImg,
      metrics: { p: 100, a: 95, s: 99 },
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
      icon: Search,
    },
    {
      shortName: "E-commerce",
      title: "E-commerce Boutique",
      service: "E-commerce High-End",
      description:
        "Venda com experiência de luxo. Checkout fluido e gestão inteligente.",
      image: ecommerceImg,
      metrics: { p: 100, a: 97, s: 98 },
      icon: ShoppingCart,
    },
  ];

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="projects"
      className="py-24 bg-[#050505] min-h-screen relative overflow-hidden flex flex-col justify-center"
    >
      <div className="container mx-auto px-6">
        <header className="mb-12">
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter">
            PROJETOS<span className="text-zinc-800 italic">.WEB</span>
          </h2>
        </header>

        <Swiper
          modules={[Pagination, Autoplay, EffectFade, Mousewheel]}
          effect="fade"
          loop={true}
          speed={800}
          onSwiper={setSwiperInstance}
          autoplay={{ delay: 5000 }}
          onSlideChange={(swiper) => setActiveProject(swiper.realIndex)}
          className="w-full max-w-7xl rounded-[2rem] border border-white/5 bg-zinc-950 overflow-hidden"
        >
          {services.map((project, index) => (
            <SwiperSlide key={index}>
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-video lg:aspect-auto h-auto lg:h-[600px] bg-zinc-900 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    width="800"
                    height="600"
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-between">
                  <div className="space-y-6">
                    <span className="text-purple-500 font-bold text-xs uppercase tracking-widest">
                      {project.service}
                    </span>
                    <h3 className="text-3xl lg:text-5xl font-black text-white leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-lg">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center gap-6">
                    {/* Container de métricas: Agora fica oculto no mobile automaticamente via MetricsBox */}
                    <div className="flex w-full empty:hidden">
                      <MetricsBox
                        value={project.metrics.p}
                        labelDesktop="Performance"
                        icon={Zap}
                      />
                      <MetricsBox
                        value={project.metrics.a}
                        labelDesktop="Acessibilidade"
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
                      aria-label="Solicitar orçamento"
                      className="w-full sm:flex-1 bg-white text-black font-black py-4 rounded-xl hover:bg-purple-600 hover:text-white transition-all whitespace-nowrap px-4"
                    >
                      SOLICITAR ORÇAMENTO
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-2">
          {services.map((s, i) => (
            <button
              key={i}
              onClick={() => swiperInstance?.slideToLoop(i)}
              aria-label={`Ver ${s.shortName}`}
              className={`p-3 rounded-xl border transition-all flex flex-col items-center gap-1 ${activeProject === i ? "bg-purple-600 border-purple-500" : "bg-zinc-900/50 border-white/5"}`}
            >
              <s.icon
                className={`w-4 h-4 ${activeProject === i ? "text-white" : "text-zinc-500"}`}
              />
              <span
                className={`text-[8px] font-black uppercase ${activeProject === i ? "text-white" : "text-zinc-600"}`}
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
