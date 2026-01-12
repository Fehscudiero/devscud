import { useEffect, useState, useRef } from "react";
import Eu from "../assets/eu.jpg";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTheme } from "./theme-provider";

const About = () => {
  const { theme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Efeitos Disruptivos de Scroll
  const clipPath = useTransform(smoothScroll, [0, 0.3], ["circle(0% at 50% 50%)", "circle(100% at 50% 50%)"]);
  const imageScale = useTransform(smoothScroll, [0, 0.5], [1.5, 1]);
  const textX = useTransform(smoothScroll, [0, 1], [0, 200]);
  const badgeRotate = useTransform(smoothScroll, [0, 0.5], [-20, 0]);

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkTheme(isDark);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [theme]);

  const sectionBgClass = isDarkTheme ? "bg-[#030014]" : "bg-slate-50";
  const titleColorClass = isDarkTheme ? "text-white" : "text-slate-900";
  const textColorClass = isDarkTheme ? "text-slate-400" : "text-slate-600";
  const gradientText = isDarkTheme ? "from-purple-500 via-cyan-400 to-blue-500" : "from-emerald-500 to-teal-600";

  // Cor dinâmica para o destaque no parágrafo
  const highlightTextClass = isDarkTheme ? "text-white" : "text-slate-900";

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`pt-20 pb-32 relative transition-colors duration-1000 overflow-hidden ${sectionBgClass}`}
    >
      {/* Grid de fundo tecnológica */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(${isDarkTheme ? '#fff' : '#000'} 1px, transparent 1px)`, backgroundSize: '30px 30px' }}
      />

      <div className="container mx-auto px-6 relative z-10">

        {/* TÍTULO KINETIC - MARCA D'ÁGUA DINÂMICA */}
        <div className="relative mb-24 overflow-hidden">
          <motion.h2
            style={{ x: textX }}
            className={`text-[15vw] font-black leading-none tracking-tighter uppercase opacity-[0.03] dark:opacity-[0.05] absolute -top-5 left-0 whitespace-nowrap pointer-events-none select-none ${isDarkTheme ? 'text-white' : 'text-black'}`}
          >
            DEV SCUD
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <h3 className={`text-6xl sm:text-9xl font-black ${titleColorClass} tracking-tight`}>
              SOBRE <br />
              <span className={`bg-gradient-to-r ${gradientText} bg-clip-text text-transparent italic`}>MIM_</span>
            </h3>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* FOTO: O PORTAL INTERATIVO */}
          <div className="relative group">
            <motion.div
              style={{ clipPath, scale: imageScale }}
              className={`relative aspect-[4/5] sm:aspect-square w-full max-w-[550px] mx-auto rounded-[2rem] overflow-hidden bg-black shadow-2xl ${isDarkTheme ? 'shadow-purple-500/20' : 'shadow-slate-300'}`}
            >
              {/* Efeito de Scanner de Luz */}
              <motion.div
                animate={{ top: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-20 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent z-10 pointer-events-none"
              />

              <img
                src={Eu}
                alt="Felipe Scudiero"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />

              {/* Overlay Futurista */}
              <div className="absolute top-6 left-6 flex gap-2">
                <div className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/20 rounded-full text-[10px] text-cyan-400 font-mono tracking-widest uppercase">
                  System: Active
                </div>
              </div>

              {/* Glassmorphism Label */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-black text-2xl tracking-tight uppercase">Felipe Scudiero</p>
                <p className="text-cyan-400 text-xs font-mono tracking-[0.2em]">Creative Developer</p>
              </div>
            </motion.div>

            {/* Badges Flutuantes (Neo-Brutalismo) - BUG CORRIGIDO AQUI */}
            <motion.div
              style={{ rotateZ: badgeRotate }}
              className="absolute -bottom-10 -right-4 sm:-right-10 z-20 flex flex-col gap-4"
            >
              <div className="p-6 bg-white dark:bg-zinc-900 border-4 border-purple-500 shadow-[8px_8px_0px_rgba(139,92,246,1)] rounded-xl transform -rotate-3 hover:rotate-0 transition-transform">
                <p className={`font-black text-3xl italic ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>
                  +3 ANOS
                </p>
                <p className={`text-[10px] font-bold uppercase tracking-tighter opacity-60 ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>
                  Professional Exp
                </p>
              </div>
            </motion.div>
          </div>

          {/* CONTEÚDO TEXTUAL */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className={`relative p-8 rounded-3xl border backdrop-blur-sm ${isDarkTheme ? 'bg-white/5 border-white/10' : 'bg-slate-100/50 border-slate-200'}`}
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-cyan-500" />
              <p className={`text-2xl sm:text-3xl font-medium leading-relaxed ${textColorClass}`}>
                Eu transformo <span className={`${highlightTextClass} font-bold underline decoration-cyan-500 underline-offset-8`}>visões complexas</span> em realidade digital.
                Meu foco é o ponto onde o design impecável e a engenharia de alta performance se encontram.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;