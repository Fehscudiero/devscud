import { useEffect, useState, useRef } from "react";
import { Quote, Star, BadgeCheck } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const Testimonials = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const sectionRef = useRef(null);

  // Efeito de Parallax para a marca d'água
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const textX = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkTheme(isDark);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: "Ricardo Oliveira",
      role: "CTO @ TechFlow",
      content: "A arquitetura que o Felipe desenhou permitiu escalarmos nossa operação em 300% sem gargalos. Não é apenas código, é engenharia de software de elite.",
      initials: "RO",
      highlight: "Escala de 300%",
    },
    {
      name: "Mariana Costa",
      role: "Head de Marketing",
      content: "Precisávamos de um site que convertesse, e o resultado foi um aumento de 40% nos leads já no primeiro mês. O design e a velocidade são surreais.",
      initials: "MC",
      highlight: "+40% Conversão",
    },
    {
      name: "Carlos Ferreira",
      role: "Founder @ StartUp Hub",
      content: "Já contratei dezenas de devs, mas a visão de produto do Felipe é única. Ele antecipa problemas de UX antes mesmo de codificar. Uma entrega impecável.",
      initials: "CF",
      highlight: "Visão de Produto",
    },
  ];

  // Configurações de Cores Padronizadas
  const accentColor = isDarkTheme ? "text-cyan-400" : "text-emerald-600";
  const accentGradient = isDarkTheme ? "from-purple-500 via-cyan-400 to-blue-500" : "from-emerald-600 to-teal-600";
  const sectionBg = isDarkTheme ? "bg-[#030014]" : "bg-slate-50";

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={`py-32 relative transition-colors duration-1000 z-30 overflow-visible ${sectionBg}`}
    >
      {/* Marca d'água Cinética (Igual ao About) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none">
        <motion.h2
          style={{ x: textX }}
          className={`text-[15vw] font-black leading-none tracking-tighter uppercase opacity-[0.03] dark:opacity-[0.05] whitespace-nowrap select-none ${isDarkTheme ? 'text-white' : 'text-black'}`}
        >
          TESTIMONIALS CLIENTS
        </motion.h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Header Padronizado */}
        <div className="mb-20 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`font-mono text-xs tracking-[0.5em] uppercase mb-4 ${accentColor}`}
          >
            Social_Proof // Trust
          </motion.p>
          <h2 className={`text-5xl lg:text-7xl font-black tracking-tight ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>
            IMPACTO <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent italic`}>REAL_</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group relative p-10 rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-3 
                ${isDarkTheme
                  ? 'bg-slate-900/50 border-white/10 hover:border-cyan-500/50 shadow-2xl shadow-black'
                  : 'bg-white border-slate-200 shadow-xl hover:border-emerald-500/50'}`}
            >
              {/* Efeito de Brilho Interno (Spotlight) */}
              <div className={`absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none bg-gradient-to-br ${accentGradient}`} />

              {/* Badge de Destaque */}
              <div className={`absolute -top-4 left-10 px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl 
                ${isDarkTheme ? 'bg-cyan-500 text-black' : 'bg-emerald-600 text-white'}`}>
                {testimonial.highlight}
              </div>

              {/* Aspas Decorativas */}
              <Quote className={`absolute top-10 right-10 w-12 h-12 opacity-10 ${accentColor}`} />

              {/* Estrelas Pro */}
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Conteúdo */}
              <blockquote className="relative z-10 mb-10">
                <p className={`text-lg leading-relaxed font-medium ${isDarkTheme ? 'text-slate-200' : 'text-slate-700'}`}>
                  "{testimonial.content}"
                </p>
              </blockquote>

              {/* Footer do Card */}
              <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                <div className="relative">
                  {/* Monograma com Gradiente do Tema */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner transform group-hover:rotate-6 transition-transform duration-500
                    bg-gradient-to-br ${accentGradient} text-white`}>
                    {testimonial.initials}
                  </div>

                  {/* Verificado Animado */}
                  <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-900 rounded-full p-1 shadow-lg">
                    <BadgeCheck className={`w-5 h-5 ${isDarkTheme ? 'text-cyan-400' : 'text-emerald-500'}`} />
                  </div>
                </div>

                <div>
                  <h4 className={`font-bold text-lg ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>
                    {testimonial.name}
                  </h4>
                  <p className={`text-xs font-mono uppercase tracking-wider ${accentColor}`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Glows dinâmicos */}
      <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-10 pointer-events-none 
        ${isDarkTheme ? 'bg-purple-600' : 'bg-emerald-200'}`} />
    </section>
  );
};

export default Testimonials;