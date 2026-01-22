import { useEffect, useState, useRef } from "react";
import Eu from "../assets/eu.webp";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { CheckCircle2, Rocket, Code2, Cpu } from "lucide-react"; // Importando ícones para autoridade

const About = () => {
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
  const clipPath = useTransform(
    smoothScroll,
    [0, 0.3],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );
  const imageScale = useTransform(smoothScroll, [0, 0.5], [1.3, 1]);
  const filterEffect = useTransform(
    smoothScroll,
    [0.2, 0.5],
    ["saturate(0) contrast(1.5)", "saturate(1.2) contrast(1)"],
  );
  const badgeRotate = useTransform(smoothScroll, [0, 0.5], [-15, 0]);

  const expertise = [
    { icon: <Code2 className="w-5 h-5" />, text: "Arquiteturas Escaláveis" },
    { icon: <Cpu className="w-5 h-5" />, text: "Performance Extrema" },
    { icon: <Rocket className="w-5 h-5" />, text: "Foco em Conversão" },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="pt-20 pb-40 relative overflow-hidden bg-background"
    >
      {/* Grid de fundo */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none select-none">
        <motion.h2
          style={{ x: textX }}
          className="text-[15vw] font-black uppercase opacity-[0.03] dark:opacity-[0.05] whitespace-nowrap text-right pr-10 text-foreground"
        >
          SOBRE
        </motion.h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center lg:text-left"
        >
          <h3 className="text-5xl sm:text-7xl font-black tracking-tighter italic bg-gradient-primary bg-clip-text text-transparent">
            ALTA PERFORMANCE
          </h3>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LADO DA IMAGEM */}
          <div className="relative group mx-auto lg:mx-0 w-full max-w-[450px]">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-primary opacity-10 blur-2xl group-hover:opacity-30 transition-opacity duration-700" />

            <motion.div
              style={{ clipPath, scale: imageScale, filter: filterEffect }}
              className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-card border border-border shadow-2xl"
            >
              <img
                src={Eu}
                alt="Felipe Scudiero"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background via-background/80 to-transparent">
                <p className="text-foreground font-black text-2xl uppercase tracking-tighter">
                  Felipe Scudiero
                </p>
                <p className="text-primary font-mono text-xs font-bold tracking-[0.3em]">
                  DESENVOLVEDOR
                </p>
              </div>
            </motion.div>

            {/* SELO DE EXPERIÊNCIA COM BORDA 3D E RESPONSIVIDADE */}
            <motion.div
              style={{ rotateZ: badgeRotate }}
              className="absolute -bottom-8 -right-4 sm:-bottom-6 sm:-right-6 z-40 scale-75 sm:scale-100 origin-bottom-right"
            >
              <div className="relative group/badge p-4 sm:p-6 bg-card border-2 border-primary rounded-2xl shadow-[4px_4px_0px_var(--primary)] sm:shadow-[8px_8px_0px_var(--primary)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-300">
                {/* Efeito de Borda Interna para Profundidade 3D */}
                <div className="absolute inset-0 border-b-4 border-r-4 border-black/10 rounded-2xl pointer-events-none" />

                <span className="block text-3xl sm:text-4xl font-black text-foreground leading-none">
                  +3 ANOS
                </span>
                <span className="text-[8px] text-center sm:text-[10px] font-bold uppercase text-primary tracking-widest block mt-1">
                  DE RESULTADOS
                </span>
              </div>
            </motion.div>
          </div>

          {/* LADO DO TEXTO - PERSUASIVO */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h4 className="text-sm font-mono uppercase tracking-[0.5em] text-primary font-bold">
                01 // Especialista
              </h4>
              <p className="text-3xl md:text-5xl font-extrabold text-foreground leading-[1.1] tracking-tight">
                Transformo linhas de código em{" "}
                <span className="text-gradient">lucro e autoridade</span>{" "}
                digital.
              </p>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Ao longo dos últimos 3 anos, refinei a arte de criar interfaces
                que não apenas encantam os olhos, mas
                <span className="text-foreground font-semibold">
                  {" "}
                  guiam o usuário para a conversão.
                </span>
              </p>
              <p>
                Minha experiência vai além do "fazer funcionar". Eu foco em
                <span className="text-foreground font-semibold">
                  {" "}
                  escalabilidade e velocidade
                </span>
                , garantindo que sua plataforma esteja preparada para o
                crescimento real, sem gargalos técnicos ou bugs imprevistos.
              </p>
            </div>

            {/* DIFERENCIAIS RÁPIDOS */}
            <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 gap-4 pt-4">
              {expertise.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border group hover:border-primary transition-colors min-w-[240px] flex-1 sm:flex-none"
                >
                  <div className="text-primary group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-sm font-bold text-foreground uppercase tracking-wider">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <p className="italic text-primary font-medium flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Comprometido com a excelência técnica e prazos rigorosos.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
