import { useEffect, useState, useRef } from "react";
import Eu from "../assets/eu.jpg";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTheme } from "./theme-provider";

const About = () => {
  const { theme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Ajuste do texto de fundo para Desktop: x inicial menor para manter visibilidade
  const textX = useTransform(smoothScroll, [0, 1], [-50, 100]);

  const clipPath = useTransform(smoothScroll, [0, 0.3], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const imageScale = useTransform(smoothScroll, [0, 0.5], [1.3, 1]);

  const saturate = useTransform(smoothScroll, [0.2, 0.5], [0, 1.2]);
  const contrast = useTransform(smoothScroll, [0.2, 0.5], [1.5, 1]);
  const filterEffect = useTransform(() => `saturate(${saturate.get()}) contrast(${contrast.get()})`);

  const badgeRotate = useTransform(smoothScroll, [0, 0.5], [-15, 0]);

  useEffect(() => {
    const checkTheme = () => setIsDarkTheme(document.documentElement.classList.contains("dark"));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [theme]);

  const sectionBgClass = isDarkTheme ? "bg-[#030014]" : "bg-slate-50";
  const titleColorClass = isDarkTheme ? "text-white" : "text-slate-900";
  const textColorClass = isDarkTheme ? "text-slate-400" : "text-slate-600";
  const gradientText = isDarkTheme ? "from-purple-500 via-cyan-400 to-blue-500" : "from-emerald-600 to-teal-600";

  // Cores dinâmicas para os números de projetos
  const statsNumberClass = isDarkTheme ? "text-white" : "text-black";

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`pt-20 pb-40 relative transition-colors duration-1000 overflow-hidden ${sectionBgClass}`}
    >
      {/* Background Decorativo */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: `linear-gradient(${isDarkTheme ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkTheme ? '#fff' : '#000'} 1px, transparent 1px)`, backgroundSize: '50px 50px' }}
      />

      <div className="container mx-auto px-6 relative z-10">

        {/* HEADER */}
        <div className="relative mb-20 flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.h2
            style={{ x: textX }}
            className={`text-[6vw] font-black leading-none uppercase opacity-[0.06] dark:opacity-[0.1] absolute top-0 left-[70%] whitespace-nowrap pointer-events-none select-none ${isDarkTheme ? 'text-white' : 'text-black'}`}          >
            SOBRE
          </motion.h2>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h3 className={`text-6xl sm:text-8xl font-black ${titleColorClass} tracking-tighter leading-none relative z-10`}>
              <br />
              <span className={`text-left bg-gradient-to-r ${gradientText} bg-clip-text text-transparent italic underline decoration-cyan-500/20`}>DESENVOLVEDOR</span>
            </h3>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* FOTO */}
          <div className="relative group mx-auto lg:mx-0 w-full max-w-[500px]">
            <div className={`absolute -inset-2 rounded-[2.5rem] bg-gradient-to-r ${gradientText} opacity-20 blur-xl group-hover:opacity-40 transition duration-700`} />

            <motion.div
              style={{ clipPath, scale: imageScale, filter: filterEffect }}
              className={`relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/10`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 pointer-events-none bg-[length:100%_2px,3px_100%]" />

              <motion.img
                src={Eu}
                alt="Felipe Scudiero"
                className="w-full h-full object-cover origin-bottom transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/40 to-transparent z-30">
                <p className="text-white font-black text-xl uppercase tracking-tighter">Felipe Scudiero</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                  <p className="text-cyan-400 text-[10px] font-mono uppercase tracking-[0.2em]">DESENVOLVEDOR</p>
                </div>
              </div>
            </motion.div>

            <motion.div style={{ rotateZ: badgeRotate }} className="absolute -bottom-6 -right-6 z-40">
              <div className={`p-6 ${isDarkTheme ? 'bg-zinc-900' : 'bg-white'} border-2 border-cyan-500 shadow-[8px_8px_0px_#06b6d4] rounded-2xl`}>
                <span className={`block text-4xl font-black ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>+3 ANOS</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-500">EXPERIÊNCIA</span>
              </div>
            </motion.div>
          </div>

          {/* TEXTO E STATS */}
          <div className="flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-12">
              <div className="space-y-4">
                <h4 className={`text-sm font-mono uppercase tracking-[0.5em] ${isDarkTheme ? 'text-cyan-400' : 'text-emerald-600'}`}>
                  01 // Background
                </h4>
                <p className={`text-2xl md:text-4xl font-bold leading-tight ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>
                  Construindo o amanhã com <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">código limpo</span> e design audacioso.
                </p>
              </div>

              <p className={`text-lg md:text-xl leading-relaxed ${textColorClass}`}>
                Minha missão é simples: fundir a robustez do backend com a fluidez do frontend.
                Não entrego apenas código, entrego <span className="font-bold text-cyan-500">vantagem competitiva</span> através da tecnologia.
              </p>

              {/* SEÇÃO DE STATS CENTRALIZADA COM EFEITO LASER */}
              <div className="pt-12 relative flex flex-col items-center lg:items-start">
                {/* Linha Laser de Topo */}
                <div className={`absolute top-0 w-full max-w-md h-[1px] ${isDarkTheme ? 'bg-white/10' : 'bg-black/10'}`}>
                  <motion.div
                    animate={{ left: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 w-24 h-[2px] shadow-[0_0_15px_#06b6d4] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
                  />
                </div>

                <div className="flex gap-10 md:gap-16 justify-center lg:justify-start items-center w-full">
                  {/* Projetos */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center lg:text-left group"
                  >
                    <div className="relative">
                      <p className={`text-4xl md:text-5xl font-black ${statsNumberClass} tracking-tighter`}>40+</p>
                      <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black mt-1">Projetos</p>
                  </motion.div>

                  {/* Divisor Vertical Laser */}
                  <div className={`h-12 w-[1px] ${isDarkTheme ? 'bg-white/10' : 'bg-black/10'} relative overflow-hidden`}>
                    <motion.div
                      animate={{ top: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute w-full h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent"
                    />
                  </div>

                  {/* Entrega */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center lg:text-left group"
                  >
                    <div className="relative">
                      <p className={`text-4xl md:text-5xl font-black ${statsNumberClass} tracking-tighter`}>100%</p>
                      <div className="absolute inset-0 bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black mt-1">Entrega</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;