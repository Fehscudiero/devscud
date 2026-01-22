import { useRef } from "react";
import { Quote, Star, BadgeCheck } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const Testimonials = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax suave para a marca d'água (Otimizado com Spring)
  const textX = useTransform(
    useSpring(scrollYProgress, { stiffness: 100, damping: 30 }),
    [0, 1],
    [150, -150],
  );

  const testimonials = [
    {
      name: "Ricardo Oliveira",
      role: "CTO @ TechFlow",
      content:
        "A arquitetura que o Felipe desenhou permitiu escalarmos nossa operação em 300% sem gargalos. Não é apenas código, é engenharia de software de elite.",
      initials: "RO",
      highlight: "Escala de 300%",
    },
    {
      name: "Mariana Costa",
      role: "Head de Marketing",
      content:
        "Precisávamos de um site que convertesse, e o resultado foi um aumento de 40% nos leads já no primeiro mês. O design e a velocidade são surreais.",
      initials: "MC",
      highlight: "+40% Conversão",
    },
    {
      name: "Carlos Ferreira",
      role: "Founder @ StartUp Hub",
      content:
        "Já contratei dezenas de devs, mas a visão de produto do Felipe é única. Ele antecipa problemas de UX antes mesmo de codificar. Uma entrega impecável.",
      initials: "CF",
      highlight: "Visão de Produto",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-32 relative z-30 overflow-hidden bg-background"
      style={{ contain: "paint" }} // Isolamento de renderização para performance
    >
      {/* MARCA D'ÁGUA DINÂMICA */}
      <div className="absolute top-0 right-0 w-full flex justify-end overflow-hidden pointer-events-none select-none z-0">
        <motion.div
          style={{ x: textX }}
          className="text-[15vw] font-black leading-none tracking-tighter uppercase opacity-[0.03] dark:opacity-[0.05] whitespace-nowrap text-foreground will-change-transform"
        >
          CLIENTES
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs tracking-[0.5em] uppercase mb-4 text-primary font-bold"
          >
            Social_Proof // Trust
          </motion.p>

          <h2 className="text-5xl lg:text-7xl font-black tracking-tight text-foreground">
            IMPACTO{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent italic">
              REAL_
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-10 rounded-[2.5rem] border border-border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:border-primary/50"
            >
              <div className="absolute -top-4 left-10 px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl bg-primary text-primary-foreground">
                {testimonial.highlight}
              </div>

              <Quote
                className="absolute top-10 right-10 w-12 h-12 opacity-10 text-primary"
                aria-hidden="true"
              />

              <div
                className="flex gap-1 mb-8"
                aria-label="Avaliação 5 estrelas"
              >
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-500 text-yellow-500"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className="relative z-10 mb-10">
                <p className="text-lg leading-relaxed font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                  "{testimonial.content}"
                </p>
              </blockquote>

              <div className="flex items-center gap-4 pt-8 border-t border-border">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner bg-gradient-primary text-white">
                    {testimonial.initials}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1 shadow-lg border border-border">
                    <BadgeCheck className="w-5 h-5 text-primary" />
                  </div>
                </div>

                <div className="text-left">
                  {/* CORREÇÃO DE ACESSIBILIDADE: h4 para h3 */}
                  <h3 className="font-bold text-lg text-foreground">
                    {testimonial.name}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-primary font-bold">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-[0.07] pointer-events-none bg-primary" />
    </section>
  );
};

export default Testimonials;
