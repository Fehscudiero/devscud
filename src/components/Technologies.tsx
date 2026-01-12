import { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Braces,
  Server,
  BarChart2,
  MonitorSmartphone,
  ChevronRight,
  Cpu,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

const techCategories = [
  {
    icon: Braces,
    title: "Linguagens",
    techs: ["TypeScript", "JavaScript", "Python", "Java", "PHP"],
    code: "01",
    desc: "Desenvolvimento de lógica de alto nível com foco em tipagem estática e escalabilidade absoluta.",
  },
  {
    icon: Server,
    title: "Frameworks",
    techs: ["React", "Next.js", "Node.js", "Tailwind", "Docker"],
    code: "02",
    desc: "Construção de ecossistemas modernos, otimizados para SEO e alta performance de renderização.",
  },
  {
    icon: BarChart2,
    title: "Arquitetura de Dados",
    techs: ["PostgreSQL", "MySQL", "Prisma", "Redis", "MongoDB"],
    code: "03",
    desc: "Modelagem de bancos de dados relacionais e não-relacionais com foco total em integridade.",
  },
  {
    icon: MonitorSmartphone,
    title: "Interface & UX",
    techs: ["Framer Motion", "UX/UI Design", "Storybook", "Testes Vitest"],
    code: "04",
    desc: "Criação de experiências de utilizador fluidas, com foco em usabilidade e UX cinematográfica.",
  },
];

const Technologies = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Lógica da Marca d'água cinética (TECNOLOGIA)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  const textX = useTransform(smoothScroll, [0, 1], [100, -100]); // Movimento oposto para variação visual

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

  const accentColor = isDarkTheme ? "text-cyan-400" : "text-emerald-600";
  const accentBg = isDarkTheme ? "bg-cyan-500" : "bg-emerald-500";
  const accentGradient = isDarkTheme
    ? "from-purple-500 via-cyan-400 to-blue-500"
    : "from-emerald-600 to-teal-600";

  return (
    <section
      ref={sectionRef}
      id="technologies"
      className={`py-24 relative overflow-hidden transition-colors duration-1000 ${
        isDarkTheme ? "bg-[#030014]" : "bg-slate-50"
      }`}
    >
      {/* MARCA D'ÁGUA - PADRÃO TOPO DIREITO */}
      <div className="absolute top-0 right-0 w-full overflow-hidden pointer-events-none select-none z-0">
        <motion.h2
          style={{ x: textX }}
          className={`text-[15vw] font-black leading-none tracking-tighter uppercase opacity-[0.03] dark:opacity-[0.05] whitespace-nowrap text-right pr-10 ${
            isDarkTheme ? "text-white" : "text-black"
          }`}
        >
          TECNOLOGIA
        </motion.h2>
      </div>

      {/* Background Cinético (Blur) */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[150px] opacity-10 pointer-events-none transition-colors duration-1000 ${
          isDarkTheme ? "bg-indigo-600" : "bg-emerald-200"
        }`}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* HEADER PADRONIZADO */}
        <div className="mb-16 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`font-mono text-xs tracking-[0.5em] uppercase mb-4 ${accentColor}`}
          >
            Capabilities_Module // 0{selectedIndex + 1}
          </motion.p>
          <h2
            className={`text-4xl lg:text-6xl font-black tracking-tighter ${
              isDarkTheme ? "text-white" : "text-slate-900"
            }`}
          >
            STACK{" "}
            <span
              className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent italic`}
            >
              TÉCNICA_
            </span>
          </h2>
        </div>

        {/* Grid de Conteúdo */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Menu Lateral */}
          <div className="lg:col-span-4 space-y-3 order-2 lg:order-1">
            {techCategories.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`w-full group relative flex items-center justify-between p-6 rounded-2xl border transition-all duration-500 
                  ${
                    selectedIndex === idx
                      ? `border-white/10 ${
                          isDarkTheme
                            ? "bg-white/5 shadow-2xl"
                            : "bg-white shadow-lg"
                        }`
                      : "border-transparent opacity-40 hover:opacity-100"
                  }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`font-mono text-xs ${accentColor}`}>
                    {item.code}
                  </span>
                  <h3
                    className={`text-xl font-bold ${
                      isDarkTheme ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>
                <ChevronRight
                  className={`transition-transform duration-500 ${
                    selectedIndex === idx
                      ? "rotate-90 opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />
                {selectedIndex === idx && (
                  <motion.div
                    layoutId="activeTabTech"
                    className={`absolute left-0 w-1 h-8 ${accentBg} rounded-full`}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Painel Central de Detalhes */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className={`relative p-8 lg:p-14 rounded-[3rem] border-2 overflow-hidden
                  ${
                    isDarkTheme
                      ? "bg-zinc-900/40 border-white/5 backdrop-blur-xl"
                      : "bg-white border-slate-100 shadow-2xl"
                  }`}
              >
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-6">
                    <div
                      className={`p-5 rounded-3xl ${
                        isDarkTheme
                          ? "bg-white/5 text-cyan-400"
                          : "bg-slate-100 text-emerald-600"
                      }`}
                    >
                      {(() => {
                        const Icon = techCategories[selectedIndex].icon;
                        return <Icon size={42} strokeWidth={1.5} />;
                      })()}
                    </div>
                    <div>
                      <h4
                        className={`text-3xl lg:text-4xl font-black ${
                          isDarkTheme ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {techCategories[selectedIndex].title.toUpperCase()}
                      </h4>
                      <div
                        className={`h-1 w-20 rounded-full bg-gradient-to-r ${accentGradient} mt-2`}
                      />
                    </div>
                  </div>

                  <p
                    className={`text-lg lg:text-xl font-medium leading-relaxed max-w-2xl ${
                      isDarkTheme ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {techCategories[selectedIndex].desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {techCategories[selectedIndex].techs.map((t, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className={`px-4 py-2 text-sm font-bold border-none rounded-xl
                          ${
                            isDarkTheme
                              ? "bg-white/5 text-slate-300"
                              : "bg-slate-100 text-slate-700"
                          }`}
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Elemento Decorativo */}
                <div className="absolute bottom-[-30px] right-[-30px] opacity-[0.03] pointer-events-none">
                  <Cpu size={250} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
