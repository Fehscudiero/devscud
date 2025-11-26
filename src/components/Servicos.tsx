import { useEffect, useState } from "react";
import {
  Globe,
  Gauge,
  Settings,
  LifeBuoy,
  Search,
  ShoppingCart,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
// Ajuste para o seu caminho real. Se der erro no preview aqui, ignore, vai funcionar no seu VS Code.
import CardParticles from "@/components/CardParticles";
import { useTheme } from "@/components/theme-provider";

const services = [
  {
    icon: Globe,
    title: "Criação de Websites",
    description:
      "Aumento suas taxas de detecção, proporcionando uma experiência excepcional para seus clientes.",
  },
  {
    icon: Gauge,
    title: "Otimização de Sites",
    description:
      "Melhoro o tempo de resposta do seu site nas ferramentas de busca, garantindo uma navegação mais inteligente e qualificada.",
  },
  {
    icon: Settings,
    title: "Customização Avançada",
    description:
      "Crio soluções sob medida que atendem às necessidades específicas do seu negócio.",
  },
  {
    icon: LifeBuoy,
    title: "Suporte Personalizado",
    description:
      "Ofereço assistência técnica especializada para garantir o funcionamento contínuo e seguro do seu site.",
  },
  {
    icon: Search,
    title: "Otimização para SEO",
    description:
      "Aumento a visibilidade do seu site nos mecanismos de busca, atraindo mais visitantes qualificados.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description:
      "Crio soluções personalizadas de comércio eletrônico para expandir seu alcance e aumentar suas vendas.",
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
  const { theme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // -- Detecção de Tema --
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

  // -- Estilos Dinâmicos --
  // Fundo da seção: Escuro translúcido no Dark | Cinza claro no Light
  const sectionBgClass = isDarkTheme ? "bg-secondary/30" : "bg-slate-50";

  // Títulos e Textos
  const titleColor = isDarkTheme ? "text-foreground" : "text-slate-900";
  const descColor = isDarkTheme ? "text-muted-foreground" : "text-slate-600";

  // Card: Escuro com borda no Dark | Branco com sombra no Light
  const cardClass = isDarkTheme
    ? "bg-card border-border hover:border-primary/50"
    : "bg-white border-slate-200 shadow-md hover:shadow-xl hover:border-primary/50";

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });
    AOS.refresh();
  }, []);

  return (
    <section
      id="servicos"
      className={`py-20 transition-colors duration-500 ${sectionBgClass}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <div
          className="max-w-4xl mx-auto text-center mb-16 space-y-4"
          data-aos="fade-down"
        >
          <h2 className={`text-4xl sm:text-5xl font-bold leading-tight transition-colors duration-300 ${titleColor}`}>
            SOLUÇÕES COMPLETAS PARA{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              IMPULSIONAR SEU SUCESSO DIGITAL
            </span>
          </h2>
          <p className={`text-lg transition-colors duration-300 ${descColor}`} data-aos="fade-up">
            Serviços completos para impulsionar o seu negócio.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map(({ icon: Icon, title, description }, index) => {
            const effect = effects[index % effects.length];
            const particleId = `cardParticles-${index}`;

            return (
              <div
                key={index}
                data-aos={effect}
                className={`relative overflow-hidden p-6 rounded-xl transition-all duration-300 group ${cardClass}`}
              >
                {/* Partículas no fundo - Nota: Se as partículas forem brancas, podem não aparecer no modo Light */}
                <CardParticles id={particleId} />

                {/* Conteúdo do card */}
                <div className="relative z-10 space-y-4 text-center">
                  <div className="flex justify-center">
                    <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className={`text-lg font-semibold transition-colors duration-300 ${titleColor}`}>
                    {title}
                  </h3>
                  <p className={`text-sm leading-relaxed transition-colors duration-300 ${descColor}`}>
                    {description}
                  </p>
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