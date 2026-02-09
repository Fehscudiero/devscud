import { useEffect, useState, useRef } from "react";
import Robot3D from "./Robot3D"; // IMPORTAR O NOVO COMPONENTE
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { CheckCircle2, Rocket, Code2, Cpu } from "lucide-react";

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
          {/* LADO DO ROBÔ 3D */}
          <div className="relative group mx-auto lg:mx-0 w-full max-w-[450px]">
            {/* Glow de fundo - múltiplas camadas para efeito mais rico */}
            <div className="absolute -inset-4 rounded-[2.5rem] bg-primary opacity-10 blur-2xl group-hover:opacity-30 transition-opacity duration-700" />
            <div className="absolute -inset-2 rounded-[2.5rem] bg-cyan-500 opacity-5 blur-xl group-hover:opacity-20 transition-opacity duration-700" />

            {/* Container do Robô 3D */}
            <motion.div
              style={{ clipPath }}
              className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-gradient-to-br from-background via-card to-background border-2 border-border group-hover:border-primary/50 shadow-2xl transition-all duration-500"
            >
              <Robot3D />
              
              {/* Label inferior */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none">
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
                  +4 ANOS
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

            {/* DIFERENCIAIS RÁPIDOS - MODERNIZADOS E CENTRALIZADOS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              {expertise.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  {/* Glow de fundo */}
                  <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  
                  {/* Card */}
                  <div className="relative flex flex-col items-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-card via-card to-card/80 border-2 border-border group-hover:border-primary transition-all duration-300 backdrop-blur-sm">
                    {/* Ícone */}
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      {item.icon}
                    </div>
                    
                    {/* Texto */}
                    <span className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider text-center leading-tight">
                      {item.text}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* FRASE DE COMPROMETIMENTO - REDESENHADA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative mt-8 group"
            >
              {/* Background animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              
              {/* Card principal */}
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 border-2 border-primary/30 group-hover:border-primary/60 transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  {/* Ícone com animação */}
                  <div className="flex-shrink-0">
                    <div className="p-2 rounded-xl bg-primary/20 group-hover:bg-primary/30 transition-colors duration-300">
                      <CheckCircle2 className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  {/* Texto */}
                  <div className="flex-1">
                    <p className="text-base sm:text-lg font-semibold text-foreground leading-relaxed">
                      Comprometido com a{" "}
                      <span className="text-primary font-bold">excelência técnica</span>
                      {" "}e{" "}
                      <span className="text-primary font-bold">prazos rigorosos</span>.
                    </p>
                  </div>
                </div>
                
                {/* Barra de ênfase inferior */}
                <div className="mt-4 h-1 w-full bg-gradient-to-r from-primary via-primary/50 to-transparent rounded-full group-hover:from-primary group-hover:via-primary group-hover:to-primary/50 transition-all duration-500" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
