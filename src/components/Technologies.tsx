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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  const textX = useTransform(smoothScroll, [0, 1], [100, -100]);

  return (
    <section
      ref={sectionRef}
      id="technologies"
      className="py-24 relative overflow-hidden transition-colors duration-1000 bg-background"
    >
      {/* MARCA D'ÁGUA PADRONIZADA */}
      <div className="absolute top-0 right-0 w-full overflow-hidden pointer-events-none select-none z-0">
        <motion.h2
          style={{ x: textX }}
          className="text-[15vw] font-black leading-none tracking-tighter uppercase opacity-[0.03] dark:opacity-[0.05] whitespace-nowrap text-right pr-10 text-foreground"
        >
          TECNOLOGIA
        </motion.h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* HEADER PADRONIZADO */}
        <div className="mb-16 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-mono text-xs tracking-[0.5em] uppercase mb-4 text-primary font-bold"
          >
            Capabilities_Module // 0{selectedIndex + 1}
          </motion.p>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-foreground">
            STACK{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent italic">
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
                      ? "border-primary/20 bg-card shadow-xl"
                      : "border-transparent opacity-40 hover:opacity-100 hover:bg-primary/5"
                  }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`font-mono text-xs font-bold ${
                      selectedIndex === idx
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.code}
                  </span>
                  <h3 className="text-xl font-bold text-foreground">
                    {item.title}
                  </h3>
                </div>
                <ChevronRight
                  className={`transition-transform duration-500 text-primary ${
                    selectedIndex === idx
                      ? "rotate-90 opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />
                {selectedIndex === idx && (
                  <motion.div
                    layoutId="activeTabTech"
                    className="absolute left-0 w-1.5 h-8 bg-primary rounded-full shadow-[0_0_15px_var(--primary)]"
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
                className="relative p-8 lg:p-14 rounded-[3rem] border border-border overflow-hidden bg-card/40 backdrop-blur-xl shadow-2xl"
              >
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="p-5 rounded-3xl bg-primary/10 text-primary border border-primary/20">
                      {(() => {
                        const Icon = techCategories[selectedIndex].icon;
                        return <Icon size={42} strokeWidth={1.5} />;
                      })()}
                    </div>
                    <div>
                      <h4 className="text-3xl lg:text-4xl font-black text-foreground">
                        {techCategories[selectedIndex].title.toUpperCase()}
                      </h4>
                      <div className="h-1 w-20 rounded-full bg-gradient-primary mt-2" />
                    </div>
                  </div>

                  <p className="text-lg lg:text-xl font-medium leading-relaxed max-w-2xl text-muted-foreground">
                    {techCategories[selectedIndex].desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {techCategories[selectedIndex].techs.map((t, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="px-4 py-2 text-sm font-bold border border-border rounded-xl bg-background text-foreground hover:border-primary/50 transition-colors"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Elemento Decorativo de Fundo */}
                <div className="absolute bottom-[-30px] right-[-30px] opacity-[0.05] pointer-events-none text-primary">
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
