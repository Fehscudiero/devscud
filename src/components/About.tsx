import { useEffect, useState } from "react";
import { Code2, Sparkles, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import Eu from "../assets/eu.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from "@/components/theme-provider";

const About = () => {
  const { theme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // -- Lógica de Detecção de Tema (Igual ao Hero) --
  useEffect(() => {
    const checkTheme = () => {
      const root = window.document.documentElement;
      const isDark = root.classList.contains("dark");
      setIsDarkTheme(isDark);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [theme]);

  // -- Estilos Dinâmicos Manuais --
  const sectionBgClass = isDarkTheme ? "bg-[#020817]" : "bg-white"; // Fundo da seção
  const titleColorClass = isDarkTheme ? "text-white" : "text-slate-900"; // Cor dos títulos
  const textColorClass = isDarkTheme ? "text-slate-400" : "text-slate-600"; // Cor do texto corrido

  // Estilo dos Cards: No Light mode usamos branco com sombra para destacar do fundo branco
  const cardClass = isDarkTheme
    ? "bg-card border-border hover:border-primary/50"
    : "bg-white border-slate-200 shadow-lg hover:border-primary/50 hover:shadow-xl";

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
    AOS.refresh();
  }, []);

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
      className={`py-20 relative transition-colors duration-500 ${sectionBgClass}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Cabeçalho da Seção */}
          <div className="text-center mb-16 space-y-4">
            <h2
              className={`text-4xl sm:text-5xl font-bold transition-colors duration-300 ${titleColorClass}`}
              data-aos="fade-down"
              data-aos-once="false"
            >
              Sobre{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Mim
              </span>
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${textColorClass}`}
              data-aos="fade-up"
              data-aos-once="false"
            >
              Codificando ideias, escalando soluções, impulsionando inovação.
            </p>
          </div>

          {/* Conteúdo Principal (Texto + Imagem) */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6" data-aos="fade-right" data-aos-once="false">
              <p className={`text-lg leading-relaxed transition-colors duration-300 ${textColorClass}`}>
                Sou um desenvolvedor com foco em criar interfaces intuitivas
                e experiências digitais que fazem a diferença. Especializado em{" "}
                <span className="text-primary font-semibold">React</span>,{" "}
                <span className="text-primary font-semibold">JavaScript</span> e{" "}
                <span className="text-primary font-semibold">UI/UX</span>, combino
                criatividade com código limpo e performance.
              </p>
              <p className={`text-lg leading-relaxed transition-colors duration-300 ${textColorClass}`}>
                Minha abordagem é centrada no usuário, sempre buscando equilibrar
                estética, funcionalidade e acessibilidade. Acredito que cada projeto
                é uma oportunidade de aprender, inovar e criar algo excepcional.
              </p>
              <p className={`text-lg leading-relaxed transition-colors duration-300 ${textColorClass}`}>
                Quando não estou codificando, estou explorando novas tecnologias,
                estudando design patterns ou contribuindo para a comunidade dev.
              </p>
            </div>

            <div className="relative" data-aos="fade-left" data-aos-once="false">
              <div className="aspect-square rounded-2xl overflow-hidden border border-primary/30 glow-purple shadow-2xl">
                <img
                  src={Eu}
                  alt="Felipe Scudiero"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Cards de Destaque */}
          <div
            className="grid sm:grid-cols-3 gap-6 justify-center text-center"
            data-aos="zoom-in-up"
            data-aos-once="false"
          >
            {highlights.map((item, index) => (
              <Card
                key={index}
                className={`p-6 transition-all duration-300 hover:glow-purple group ${cardClass}`}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className={`text-xl font-semibold transition-colors duration-300 ${titleColorClass}`}>
                    {item.title}
                  </h3>
                  <p className={`transition-colors duration-300 ${textColorClass}`}>
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