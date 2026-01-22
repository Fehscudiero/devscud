import { useEffect, useState, useRef } from "react";

import {
  Globe,
  Gauge,
  Settings,
  LifeBuoy,
  Search,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

const services = [
  {
    icon: Globe,

    title: "Criação de Websites",

    description:
      "Interfaces de alto impacto com foco em conversão e UX cinematográfica.",

    code: "UI_01",
  },

  {
    icon: Gauge,

    title: "Otimização de Sites",

    description:
      "Alta performance e Web Vitals no verde. Velocidade que o Google ama.",

    code: "PERF_02",
  },

  {
    icon: Settings,

    title: "Sistemas Web",

    description:
      "Dashboards e SaaS robustos desenvolvidos com escalabilidade absoluta.",

    code: "SYS_03",
  },

  {
    icon: LifeBuoy,

    title: "Suporte & Evolução",

    description:
      "Monitoramento contínuo para garantir que seu projeto nunca saia do ar.",

    code: "SUP_04",
  },

  {
    icon: Search,

    title: "SEO Técnico",

    description:
      "Estratégias avançadas para dominar a primeira página e ser encontrado.",

    code: "SEO_05",
  },

  {
    icon: ShoppingCart,

    title: "E-commerce High-End",

    description:
      "Lojas focadas em vendas com checkouts fluidos e experiênca premium.",

    code: "SHOP_06",
  },
];

const Servicos = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,

    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,

    damping: 30,
  });

  const textX = useTransform(smoothScroll, [0, 1], [-100, 100]);

  const nextService = () =>
    setActiveIndex((prev) => (prev + 1) % services.length);

  const prevService = () =>
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);

  return (
    <section
      ref={sectionRef}
      id="servicos"
      className="py-32 min-h-[800px] flex items-center relative overflow-hidden transition-colors duration-1000"
    >
      {/* MARCA D'ÁGUA PADRONIZADA */}

      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none select-none z-0">
        <motion.h2
          style={{ x: textX }}
          className="text-[15vw] font-black leading-none tracking-tighter uppercase opacity-[0.03] dark:opacity-[0.05] whitespace-nowrap text-left text-foreground"
        >
          SERVIÇOS
        </motion.h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}

        <div className="mb-20 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-mono text-xs tracking-[0.5em] uppercase mb-4 text-primary font-bold"
          >
            Service_Module // 0{activeIndex + 1}
          </motion.p>

          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter text-foreground">
            SOLUÇÕES{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent italic">
              DIGITAIS_
            </span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Navegação Desktop */}

          <div
            className="hidden lg:flex flex-col gap-4 w-1/3"
            role="tablist"
            aria-orientation="vertical"
          >
            {services.map((s, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={activeIndex === i}
                aria-controls={`service-panel-${i}`}
                onClick={() => setActiveIndex(i)}
                className={`text-left p-6 rounded-2xl transition-all duration-300 border-l-4 ${
                  activeIndex === i
                    ? `bg-primary/10 border-primary translate-x-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)]`
                    : `border-transparent opacity-30 hover:opacity-100`
                }`}
              >
                <span className="block text-[10px] font-mono text-primary font-bold uppercase tracking-widest">
                  {s.code}
                </span>

                <span
                  className={`text-xl font-bold transition-colors ${
                    activeIndex === i
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {s.title}
                </span>
              </button>
            ))}
          </div>

          {/* Card em Foco */}

          <div className="w-full lg:w-2/3 relative flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                role="tabpanel"
                id={`service-panel-${activeIndex}`}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="w-full max-w-[650px] p-10 lg:p-16 rounded-[3rem] border border-border shadow-2xl relative overflow-hidden bg-card/50 backdrop-blur-sm group hover:border-primary/50 transition-colors duration-500"
              >
                <div className="absolute inset-0 rounded-[3rem] opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 pointer-events-none bg-primary" />

                <div className="absolute top-10 right-10 text-[10px] font-mono opacity-30 uppercase tracking-widest text-foreground">
                  Status: Active{" "}
                  <span className="animate-pulse text-primary">●</span>
                </div>

                <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
                  <div className="p-6 rounded-3xl bg-primary/10 border border-primary/20 shadow-inner">
                    {(() => {
                      const Icon = services[activeIndex].icon;

                      return <Icon className="w-14 h-14 text-primary" />;
                    })()}
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-4xl lg:text-6xl font-black tracking-tight text-foreground leading-none">
                      {services[activeIndex].title}
                    </h3>

                    <p className="text-xl leading-relaxed text-muted-foreground font-medium">
                      {services[activeIndex].description}
                    </p>
                  </div>

                  <div className="h-1.5 w-24 rounded-full bg-gradient-primary shadow-sm" />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controles Padronizados com ARIA-LABEL (Correção do Lighthouse) */}

            <div className="flex gap-6 mt-12 items-center">
              <button
                onClick={prevService}
                aria-label="Ver serviço anterior"
                className="p-5 rounded-full border border-border bg-card/50 hover:bg-primary/10 hover:border-primary/50 transition-all text-foreground shadow-lg"
              >
                <ChevronLeft size={28} />
              </button>

              <div className="flex items-center gap-3">
                {services.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Ir para serviço: ${s.title}`}
                    aria-current={activeIndex === i ? "true" : "false"}
                    className={`h-2 transition-all duration-500 rounded-full ${
                      activeIndex === i
                        ? `w-12 bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]`
                        : `w-3 bg-border hover:bg-muted-foreground/30`
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextService}
                aria-label="Ver próximo serviço"
                className="p-5 rounded-full border border-border bg-card/50 hover:bg-primary/10 hover:border-primary/50 transition-all text-foreground shadow-lg"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[150px] opacity-[0.05] pointer-events-none bg-primary" />
    </section>
  );
};

export default Servicos;
