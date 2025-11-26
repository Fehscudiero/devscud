import { useEffect, useState } from "react";
import {
  Globe,
  Gauge,
  Settings,
  LifeBuoy,
  Search,
  ShoppingCart,
} from "lucide-react";

// MOCK AOS (Mantenha os imports reais no seu projeto)
// import AOS from "aos";
// import "aos/dist/aos.css";
const AOS = {
  init: (config: any) => console.log("AOS init", config),
  refresh: () => console.log("AOS refresh"),
};

// MOCK CardParticles (Para preview). No seu projeto, descomente o import real abaixo:
// import CardParticles from "@/components/CardParticles";
const CardParticles = ({ id, color }: { id: string, color: string }) => (
  <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden rounded-xl">
    {/* Simulação visual de partículas */}
    <div className={`absolute -top-10 -right-10 w-20 h-20 rounded-full blur-xl ${color}`}></div>
    <div className={`absolute -bottom-10 -left-10 w-20 h-20 rounded-full blur-xl ${color}`}></div>
  </div>
);

const services = [
  {
    icon: Globe,
    title: "Criação de Websites",
    description:
      "Aumento suas taxas de conversão com design estratégico e experiência do usuário excepcional.",
  },
  {
    icon: Gauge,
    title: "Otimização de Sites",
    description:
      "Melhoro o Core Web Vitals e o tempo de resposta para garantir ranking máximo no Google.",
  },
  {
    icon: Settings,
    title: "Sistemas Web Complexos",
    description:
      "Desenvolvimento de plataformas SaaS, dashboards e aplicações sob medida para o seu negócio.",
  },
  {
    icon: LifeBuoy,
    title: "Suporte & Evolução",
    description:
      "Monitoramento contínuo e atualizações de segurança para manter sua operação sempre online.",
  },
  {
    icon: Search,
    title: "SEO Técnico",
    description:
      "Estruturação avançada de dados e otimização on-page para dominar os resultados de busca.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce High-End",
    description:
      "Lojas virtuais de alta performance focadas em vendas, com checkout otimizado e seguro.",
  },
];

const effects = [
  "fade-up",
  "fade-down",
  "zoom-in",
  "flip-up",
  "fade-right",
  "fade-left",
];

const Servicos = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // -- Detecção de Tema Blindada --
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
  }, []);

  // -- Estilos Dinâmicos (Dual Personality) --

  // Fundo: Dark (Azul Profundo) vs Light (Branco)
  const sectionBgClass = isDarkTheme ? "bg-[#030014]" : "bg-white";

  // Textos
  const titleColor = isDarkTheme ? "text-white" : "text-slate-900";
  const descColor = isDarkTheme ? "text-slate-400" : "text-slate-600";

  // Card Base
  const cardBg = isDarkTheme
    ? "bg-white/5 border-white/10 hover:border-purple-500/50"
    : "bg-white border-slate-200 shadow-lg hover:border-green-500/50 hover:shadow-xl";

  // Ícones
  const iconContainerBg = isDarkTheme
    ? "bg-purple-500/10 group-hover:bg-purple-500/20"
    : "bg-green-100 group-hover:bg-green-200";

  const iconColor = isDarkTheme ? "text-purple-400" : "text-green-600";

  // Gradiente do Título Principal
  const titleGradient = isDarkTheme
    ? "from-purple-600 via-indigo-500 to-blue-600"
    : "from-green-600 via-emerald-500 to-teal-600";

  // Cor das Partículas (Passado como prop para o mock ou componente real)
  const particleColorClass = isDarkTheme ? "bg-purple-500" : "bg-green-500";

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });
    AOS.refresh();
  }, []);

  return (
    <section
      id="servicos"
      className={`py-24 transition-colors duration-500 relative overflow-hidden ${sectionBgClass}`}
    >
      {/* Luzes Ambientais de Fundo */}
      <div className={`absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none ${isDarkTheme ? 'bg-blue-600' : 'bg-emerald-400'}`} />
      <div className={`absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none ${isDarkTheme ? 'bg-purple-600' : 'bg-green-400'}`} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Título */}
        <div
          className="max-w-4xl mx-auto text-center mb-20 space-y-4"
          data-aos="fade-down"
        >
          <h2 className={`text-4xl sm:text-5xl font-bold leading-tight transition-colors duration-300 ${titleColor}`}>
            Soluções Completas para{" "}
            <span className={`bg-gradient-to-r ${titleGradient} bg-clip-text text-transparent animate-gradient-x`}>
              Impulsionar seu Sucesso
            </span>
          </h2>
          <p className={`text-lg transition-colors duration-300 ${descColor}`} data-aos="fade-up">
            Tecnologia de ponta e estratégias validadas para levar o seu negócio ao próximo nível.
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map(({ icon: Icon, title, description }, index) => {
            const effect = effects[index % effects.length];
            const particleId = `cardParticles-${index}`;

            return (
              <div
                key={index}
                data-aos={effect}
                className={`relative overflow-hidden p-8 rounded-2xl border transition-all duration-300 group ${cardBg}`}
              >
                {/* Partículas no fundo do Card */}
                <CardParticles id={particleId} color={particleColorClass} />

                {/* Conteúdo do card */}
                <div className="relative z-10 space-y-6 text-center">
                  <div className="flex justify-center">
                    <div className={`p-4 rounded-2xl transition-colors duration-300 ${iconContainerBg}`}>
                      <Icon className={`w-8 h-8 transition-colors duration-300 ${iconColor}`} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className={`text-xl font-bold transition-colors duration-300 ${titleColor}`}>
                      {title}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-colors duration-300 ${descColor}`}>
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Servicos;