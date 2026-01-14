import { useState } from "react";
import {
  ExternalLink,
  Trophy,
  Zap,
  Rocket,
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

import dominioImg from "../assets/dominio.webp";
import ecommerceImg from "../assets/ecomerce.webp";
import evolucaoImg from "../assets/evolucao.webp";
import performanceImg from "../assets/performance.webp";
import sistemawebImg from "../assets/sistemaweb.webp";
import websiteImg from "../assets/website.webp";

const MetricsBox = ({
  value,
  label,
  icon: Icon,
}: {
  value: number;
  label: string;
  icon: any;
}) => (
  <div className="flex-1 border-r border-white/5 p-4 last:border-0">
    <Icon className="w-4 h-4 text-purple-500 mb-1" />
    <div className="text-xl font-black text-white">{value}%</div>
    <div className="text-[8px] uppercase tracking-wider text-slate-500 font-bold">
      {label}
    </div>
  </div>
);

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const services = [
    {
      id: "UI_01",
      shortName: "Websites",
      title: "Websites de Alta Conversão",
      service: "Criação de Websites",
      description:
        "Interfaces que vendem. Focamos em UX Design para guiar o usuário até a conversão final, com carregamento instantâneo.",
      image: websiteImg, // Alterado
      metrics: { p: 100, a: 98, s: 100 },
      highlights: ["Design Exclusivo", "Mobile First", "Copywriting"],
      icon: Monitor,
    },
    {
      id: "PERF_02",
      shortName: "Performance",
      title: "Performance Extrema",
      service: "Otimização de Sites",
      description:
        "Sites que carregam em milissegundos. Transformamos lentidão em velocidade, melhorando o ranking no Google.",
      image: performanceImg, // Alterado
      metrics: { p: 100, a: 95, s: 99 },
      highlights: ["Lighthouse 100", "Compressão", "Cache Pro"],
      icon: Zap,
    },
    {
      id: "SYS_03",
      shortName: "Sistemas",
      title: "Sistemas Web Sob Medida",
      service: "Sistemas Web",
      description:
        "Automatize processos complexos com Dashboards e ERPs customizados integrados ao seu ecossistema de negócio.",
      image: sistemawebImg, // Alterado
      metrics: { p: 98, a: 100, s: 95 },
      highlights: ["Escalável", "API First", "Segurança"],
      icon: Settings,
    },
    {
      id: "SUP_04",
      shortName: "Suporte",
      title: "Evolução Contínua",
      service: "Suporte & Evolução",
      description:
        "Monitoramento 24/7 e evolução constante para garantir que sua tecnologia nunca fique obsoleta.",
      image: evolucaoImg, // Alterado
      metrics: { p: 99, a: 99, s: 100 },
      highlights: ["SLA Garantido", "Real-time", "Updates"],
      icon: CheckCircle2,
    },
    {
      id: "SEO_05",
      shortName: "SEO",
      title: "Domínio Orgânico",
      service: "SEO Técnico",
      description:
        "Apareça na primeira página. Técnicas estruturais para alcançar o topo do Google sem depender de anúncios.",
      image: dominioImg, // Alterado
      metrics: { p: 96, a: 98, s: 100 },
      highlights: ["Indexação", "Link Building", "Rank+"],
      icon: Search,
    },
    {
      id: "SHOP_06",
      shortName: "E-commerce",
      title: "E-commerce Boutique",
      service: "E-commerce High-End",
      description:
        "Venda com experiência de luxo. Checkout fluido e gestão de estoque inteligente para ticket médio alto.",
      image: ecommerceImg, // Alterado
      metrics: { p: 100, a: 97, s: 98 },
      highlights: ["One-Click Pay", "Inventário", "Upsell"],
      icon: ShoppingCart,
    },
  ];

  return (
    <section
      id="projects"
      className="py-24 bg-[#050505] min-h-screen relative flex flex-col justify-center overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-purple-500 font-mono text-xs uppercase tracking-[0.3em]">
              <Rocket className="w-4 h-4 fill-current" />
              <span>Expertise Técnica v2.0</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none">
              PROJETOS<span className="text-zinc-800 italic">.WEB</span>
            </h2>
          </div>
        </header>

        <Swiper
          modules={[Pagination, Autoplay, EffectFade, Mousewheel]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          speed={800}
          onSwiper={setSwiperInstance}
          autoplay={{ delay: 2500 }}
          onSlideChange={(swiper) => setActiveProject(swiper.realIndex)}
          className="w-full max-w-7xl rounded-[2rem] overflow-hidden border border-white/5 bg-zinc-950 shadow-2xl"
        >
          {services.map((project, index) => (
            <SwiperSlide key={index}>
              <div className="grid lg:grid-cols-2 min-h-[500px]">
                {/* IMAGEM COM LOADING PLACEHOLDER */}
                <div className="relative h-[250px] lg:h-auto bg-zinc-900 overflow-hidden">
                  <img
                    src={project.image}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    alt={project.title}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-transparent hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent lg:hidden" />
                </div>

                {/* CONTEÚDO */}
                <div className="p-8 lg:p-12 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div>
                      <span className="text-purple-500 font-bold text-xs uppercase tracking-widest">
                        {project.service}
                      </span>
                      <h3 className="text-3xl lg:text-5xl font-black text-white tracking-tighter mt-2 mb-4 leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-base lg:text-lg text-slate-400 font-medium leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.highlights.map((h) => (
                        <div
                          key={h}
                          className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-3 h-3 text-purple-500" />
                          <span className="text-[10px] font-bold text-zinc-300 uppercase">
                            {h}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center gap-6">
                    <div className="flex w-full sm:w-auto">
                      <MetricsBox
                        value={project.metrics.p}
                        label="Perf."
                        icon={Zap}
                      />
                      <MetricsBox
                        value={project.metrics.a}
                        label="Acess."
                        icon={Monitor}
                      />
                      <MetricsBox
                        value={project.metrics.s}
                        label="SEO"
                        icon={Trophy}
                      />
                    </div>

                    <button className="w-full sm:flex-1 bg-white text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-purple-600 hover:text-white transition-all group">
                      SOLICITAR ORÇAMENTO <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* INDICADOR DE NAVEGAÇÃO PREMIUM */}
        <div className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-2">
          {services.map((s, i) => (
            <button
              key={i}
              onClick={() => swiperInstance?.slideToLoop(i)}
              className={`p-3 rounded-xl border transition-all text-center flex flex-col items-center gap-1 group ${
                activeProject === i
                  ? "bg-purple-600 border-purple-500 shadow-lg shadow-purple-900/20"
                  : "bg-zinc-900/50 border-white/5 hover:border-white/20"
              }`}
            >
              <s.icon
                className={`w-4 h-4 ${
                  activeProject === i
                    ? "text-white"
                    : "text-zinc-500 group-hover:text-purple-400"
                }`}
              />
              <span
                className={`text-[8px] font-black uppercase tracking-tighter ${
                  activeProject === i ? "text-white" : "text-zinc-600"
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
