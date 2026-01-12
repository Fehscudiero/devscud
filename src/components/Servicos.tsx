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
      "Lojas focadas em vendas com checkouts fluidos e experiência premium.",
    code: "SHOP_06",
  },
];

const Servicos = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Lógica da Marca d'água cinética
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  const textX = useTransform(smoothScroll, [0, 1], [-100, 100]);

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkTheme(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const nextService = () =>
    setActiveIndex((prev) => (prev + 1) % services.length);
  const prevService = () =>
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);

  const sectionBg = isDarkTheme ? "bg-[#030014]" : "bg-slate-50";
  const accentColor = isDarkTheme ? "text-cyan-400" : "text-emerald-600";
  const accentGradient = isDarkTheme
    ? "from-purple-500 via-cyan-400 to-blue-500"
    : "from-emerald-600 to-teal-600";

  return (
    <section
      ref={sectionRef}
      id="servicos"
      className={`py-20 min-h-[800px] flex items-center relative overflow-hidden transition-colors duration-1000 ${sectionBg}`}
    >
      {/* MARCA D'ÁGUA - PADRÃO TOPO ESQUERDA */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none select-none z-0">
        <motion.h2
          style={{ x: textX }}
          className={`text-[15vw] font-black leading-none tracking-tighter uppercase opacity-[0.03] dark:opacity-[0.05] whitespace-nowrap text-left ${
            isDarkTheme ? "text-white" : "text-black"
          }`}
        >
          SERVIÇOS
        </motion.h2>
      </div>

      {/* Background Cinético (Blur central) */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[150px] opacity-20 pointer-events-none transition-colors duration-1000 ${
          isDarkTheme ? "bg-indigo-600" : "bg-emerald-200"
        }`}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Minimalista */}
        <div className="mb-12 text-center lg:text-left">
          <motion.p
            className={`font-mono text-xs tracking-[0.5em] uppercase mb-4 ${accentColor}`}
          >
            Service_Module // 0{activeIndex + 1}
          </motion.p>
          <h2
            className={`text-4xl lg:text-6xl font-black tracking-tighter ${
              isDarkTheme ? "text-white" : "text-slate-900"
            }`}
          >
            SOLUÇÕES{" "}
            <span
              className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent italic`}
            >
              DIGITAIS_
            </span>
          </h2>
        </div>

        {/* Restante do layout permanece igual... */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Navegação Desktop */}
          <div className="hidden lg:flex flex-col gap-4 w-1/3">
            {services.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`text-left p-4 rounded-xl transition-all duration-300 border-l-4 ${
                  activeIndex === i
                    ? `bg-white/5 border-cyan-500 translate-x-4`
                    : `border-transparent opacity-30 hover:opacity-100`
                }`}
              >
                <span className={`block text-[10px] font-mono ${accentColor}`}>
                  {s.code}
                </span>
                <span
                  className={`text-lg font-bold ${
                    isDarkTheme ? "text-white" : "text-slate-900"
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
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className={`w-full max-w-[600px] p-8 lg:p-16 rounded-[3rem] border-2 shadow-2xl relative overflow-hidden
                  ${
                    isDarkTheme
                      ? "bg-zinc-900/50 border-white/10"
                      : "bg-white border-slate-100"
                  }`}
              >
                <div className="absolute top-8 right-8 text-[10px] font-mono opacity-30 uppercase tracking-widest">
                  Status: Active{" "}
                  <span className="animate-pulse text-green-500">●</span>
                </div>

                <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
                  <div
                    className={`p-6 rounded-3xl bg-gradient-to-br ${
                      isDarkTheme
                        ? "from-white/10 to-transparent"
                        : "from-slate-100 to-white shadow-inner"
                    }`}
                  >
                    {(() => {
                      const Icon = services[activeIndex].icon;
                      return <Icon className={`w-12 h-12 ${accentColor}`} />;
                    })()}
                  </div>

                  <div className="space-y-4">
                    <h3
                      className={`text-3xl lg:text-5xl font-black tracking-tight ${
                        isDarkTheme ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {services[activeIndex].title}
                    </h3>
                    <p
                      className={`text-lg leading-relaxed ${
                        isDarkTheme ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {services[activeIndex].description}
                    </p>
                  </div>
                  <div
                    className={`h-1 w-24 rounded-full bg-gradient-to-r ${accentGradient}`}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controles */}
            <div className="flex gap-6 mt-12">
              <button
                onClick={prevService}
                className={`p-4 rounded-full border border-white/10 hover:bg-white/10 transition-all ${
                  isDarkTheme ? "text-white" : "text-slate-900"
                }`}
              >
                <ChevronLeft size={32} />
              </button>
              <div className="flex items-center gap-2">
                {services.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 transition-all duration-500 rounded-full ${
                      activeIndex === i ? `w-8 bg-cyan-500` : `w-2 bg-white/20`
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextService}
                className={`p-4 rounded-full border border-white/10 hover:bg-white/10 transition-all ${
                  isDarkTheme ? "text-white" : "text-slate-900"
                }`}
              >
                <ChevronRight size={32} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Servicos;
