import { useEffect, useState } from "react";
import { Code2, Sparkles, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import Eu from "../assets/eu.jpg"; // Sua foto real
import AOS from "aos";
import "aos/dist/aos.css";
// Usando caminho relativo para garantir compatibilidade no preview e local
import { useTheme } from "./theme-provider";

const About = () => {
  const { theme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // -- Lógica de Detecção de Tema Blindada --
  useEffect(() => {
    const checkTheme = () => {
      const root = window.document.documentElement;
      const isDark = root.classList.contains("dark");
      setIsDarkTheme(isDark);
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [theme]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });
    AOS.refresh();
  }, []);

  // -- Estilos Dinâmicos (Dual Personality) --

  // Fundo: Dark (Azul Profundo Cyberpunk) vs Light (Branco Clean)
  const sectionBgClass = isDarkTheme ? "bg-[#030014]" : "bg-white";

  // Texto
  const titleColorClass = isDarkTheme ? "text-white" : "text-slate-900";
  const textColorClass = isDarkTheme ? "text-slate-400" : "text-slate-600";

  // Gradiente do Título
  const gradientText = isDarkTheme
    ? "from-purple-600 via-indigo-500 to-blue-600"
    : "from-green-600 via-emerald-500 to-teal-600";

  // Estilo dos Cards
  const cardClass = isDarkTheme
    ? "bg-white/5 border-white/10 hover:border-purple-500/50 hover:bg-white/10"
    : "bg-white border-slate-200 shadow-lg hover:border-green-500/50 hover:shadow-xl";

  // Ícones dos Cards
  const iconBgClass = isDarkTheme
    ? "bg-purple-500/10 group-hover:bg-purple-500/20"
    : "bg-green-100 group-hover:bg-green-200";

  const iconColorClass = isDarkTheme
    ? "text-purple-400"
    : "text-green-600";

  // Moldura da Foto
  const photoBorderClass = isDarkTheme
    ? "border-purple-500/30 shadow-purple-500/20"
    : "border-green-500/30 shadow-green-500/20";

  const highlights = [
    {
      icon: Code2,
      title: "Tecnologias",
      description: "React, JavaScript, TypeScript, UI/UX Design",
    },
    {
      icon: Sparkles,
      title: "Criatividade",
      description: "Transformo ideias em experiências digitais únicas",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Código otimizado e interfaces responsivas",
    },
  ];

  return (
    <section
      id="about"
      className={`py-20 relative transition-colors duration-500 overflow-hidden ${sectionBgClass}`}
    >
      {/* Luzes de Fundo Ambientais (Blobs) */}
      <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none ${isDarkTheme ? 'bg-purple-600' : 'bg-green-400'}`} />
      <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none ${isDarkTheme ? 'bg-blue-600' : 'bg-teal-400'}`} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Cabeçalho da Seção */}
          <div className="text-center mb-20 space-y-4">
            <h2
              className={`text-4xl sm:text-5xl font-bold tracking-tight transition-colors duration-300 ${titleColorClass}`}
              data-aos="fade-down"
            >
              Sobre <span className={`bg-gradient-to-r ${gradientText} bg-clip-text text-transparent animate-gradient-x`}>Mim</span>
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${textColorClass}`}
              data-aos="fade-up"
            >
              Codificando ideias, escalando soluções, impulsionando inovação.
            </p>
          </div>

          {/* Conteúdo Principal (Grid Assimétrico) */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">

            {/* Texto */}
            <div className="space-y-8" data-aos="fade-right">
              <div className="space-y-6 text-lg leading-relaxed">
                <p className={`transition-colors duration-300 ${textColorClass}`}>
                  Sou um desenvolvedor com foco em criar interfaces intuitivas
                  e experiências digitais que fazem a diferença. Especializado em{" "}
                  <span className={`font-semibold ${isDarkTheme ? 'text-purple-400' : 'text-green-600'}`}>React</span>,{" "}
                  <span className={`font-semibold ${isDarkTheme ? 'text-blue-400' : 'text-teal-600'}`}>JavaScript</span> e{" "}
                  <span className={`font-semibold ${isDarkTheme ? 'text-indigo-400' : 'text-emerald-600'}`}>UI/UX</span>, combino
                  criatividade com código limpo e performance.
                </p>
                <p className={`transition-colors duration-300 ${textColorClass}`}>
                  Minha abordagem é centrada no usuário, sempre buscando equilibrar
                  estética, funcionalidade e acessibilidade. Acredito que cada projeto
                  é uma oportunidade de aprender, inovar e criar algo excepcional.
                </p>
                <p className={`transition-colors duration-300 ${textColorClass}`}>
                  Quando não estou codificando, estou explorando novas tecnologias,
                  estudando design patterns ou contribuindo para a comunidade dev.
                </p>
              </div>
            </div>

            {/* Imagem com Efeito Glass/Glow */}
            <div className="relative group" data-aos="fade-left">
              {/* Glow Colorido no Fundo da Imagem */}
              <div className={`absolute -inset-1 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 ${isDarkTheme ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-green-600 to-teal-600'}`}></div>

              <div className={`relative aspect-square rounded-2xl overflow-hidden border shadow-2xl transition-all duration-300 ${photoBorderClass}`}>
                <img
                  src={Eu}
                  alt="Felipe Scudiero"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay sutil para integrar a imagem ao tema */}
                <div className={`absolute inset-0 bg-gradient-to-t opacity-20 ${isDarkTheme ? 'from-black via-transparent to-transparent' : 'from-green-900 via-transparent to-transparent'}`} />
              </div>
            </div>
          </div>

          {/* Cards de Destaque */}
          <div
            className="grid sm:grid-cols-3 gap-6"
            data-aos="zoom-in-up"
          >
            {highlights.map((item, index) => (
              <Card
                key={index}
                className={`p-8 border transition-all duration-300 group ${cardClass}`}
              >
                <div className="space-y-4 text-center">
                  <div className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center transition-colors duration-300 ${iconBgClass}`}>
                    <item.icon className={`w-7 h-7 transition-colors duration-300 ${iconColorClass}`} />
                  </div>
                  <h3 className={`text-xl font-bold transition-colors duration-300 ${titleColorClass}`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm leading-relaxed transition-colors duration-300 ${textColorClass}`}>
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;