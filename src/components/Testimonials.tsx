import { useEffect, useState } from "react";
import { Quote, Star, BadgeCheck } from "lucide-react";

// MOCK AOS (Mantenha os imports reais no seu projeto)
// import AOS from "aos";
// import "aos/dist/aos.css";
const AOS = {
  init: (config: any) => console.log("AOS init", config),
  refresh: () => console.log("AOS refresh"),
};

const Testimonials = () => {
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

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });
    AOS.refresh();
  }, []);

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

  // -- Estilos Dinâmicos (Dual Personality) --

  // Fundo: Dark (Azul Profundo) vs Light (Branco)
  const sectionBgClass = isDarkTheme ? "bg-[#030014]" : "bg-white";

  const titleColor = isDarkTheme ? "text-foreground" : "text-slate-900";
  const textColor = isDarkTheme ? "text-muted-foreground" : "text-slate-600";

  // Gradiente do Título
  const gradientText = isDarkTheme
    ? "from-purple-600 via-indigo-500 to-blue-600"
    : "from-green-600 via-emerald-500 to-teal-600";

  // Card Styling - Glassmorphism Profundo
  const cardBg = isDarkTheme
    ? "bg-white/5 border-white/10 hover:border-purple-500/50"
    : "bg-white border-slate-200 shadow-lg hover:border-green-500/50 hover:shadow-xl";

  // Badge de Destaque
  const badgeClass = isDarkTheme
    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-900/20"
    : "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-green-900/10";

  // Monograma
  const monogramBg = isDarkTheme
    ? "bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700"
    : "bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600";

  const monogramText = "text-white"; // Sempre branco para contraste com o gradiente

  // Glow atrás do Monograma
  const glowColor = isDarkTheme ? "bg-purple-500" : "bg-green-400";

  // Texto do Cargo/Role
  const roleColor = isDarkTheme ? "text-purple-400" : "text-green-600";

  // Ícone de Aspas
  const quoteColor = isDarkTheme ? "text-white" : "text-emerald-800";

  // Verificado
  const verifiedColor = isDarkTheme ? "text-blue-500" : "text-teal-500";

  return (
    <section id="testimonials" className={`py-32 transition-colors duration-500 relative overflow-hidden ${sectionBgClass}`}>

      {/* Background Atmosphere (Luzes de fundo dinâmicas) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-96 h-96 rounded-full blur-[120px] opacity-20 transition-colors duration-500 ${isDarkTheme ? 'bg-purple-600' : 'bg-green-400'}`}></div>
        <div className={`absolute bottom-20 right-10 w-80 h-80 rounded-full blur-[120px] opacity-20 transition-colors duration-500 ${isDarkTheme ? 'bg-blue-600' : 'bg-teal-400'}`}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Cabeçalho */}
          <div className="text-center mb-24 space-y-6" data-aos="fade-down">
            <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight transition-colors duration-300 ${titleColor}`}>
              Impacto Real em <span className={`bg-gradient-to-r ${gradientText} bg-clip-text text-transparent animate-gradient-x`}>Negócios Reais</span>
            </h2>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto transition-colors duration-300 ${textColor}`}>
              Não acredite apenas na minha palavra. Veja os resultados que líderes de mercado alcançaram através da nossa parceria.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                className={`group relative p-8 rounded-[2rem] border transition-all duration-500 hover:-translate-y-2 ${cardBg}`}
              >
                {/* Badge de Resultado (Topo) */}
                <div className={`absolute -top-4 left-8 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg transform transition-transform duration-300 group-hover:scale-110 ${badgeClass}`}>
                  {testimonial.highlight}
                </div>

                {/* Ícone de Aspas Gigante (Decorativo) */}
                <Quote className={`absolute top-8 right-8 w-16 h-16 opacity-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 ${quoteColor}`} />

                {/* Estrelas */}
                <div className="flex gap-1 mb-6 relative">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                  ))}
                </div>

                {/* Conteúdo do Depoimento */}
                <div className="relative z-10 mb-8 min-h-[100px]">
                  <p className={`text-lg leading-relaxed font-medium italic ${isDarkTheme ? 'text-slate-200' : 'text-slate-700'}`}>
                    "{testimonial.content}"
                  </p>
                </div>

                {/* Autor e Monograma */}
                <div className="flex items-center gap-4 pt-6 border-t border-dashed border-gray-500/20">
                  <div className="relative">
                    {/* Glow atrás do monograma */}
                    <div className={`absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500 ${glowColor}`}></div>

                    {/* Monograma Premium */}
                    <div className={`relative w-14 h-14 rounded-full flex items-center justify-center border-2 border-white/10 shadow-sm overflow-hidden ${monogramBg}`}>
                      {/* Efeito de vidro sutil sobre o gradiente */}
                      <div className="absolute inset-0 backdrop-blur-[1px] bg-white/5"></div>
                      <span className={`relative z-10 font-bold text-xl tracking-wider ${monogramText}`}>
                        {testimonial.initials}
                      </span>
                    </div>

                    {/* Selo de Verificado */}
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-[2px] shadow-sm z-20">
                      <BadgeCheck className={`w-5 h-5 fill-white ${verifiedColor}`} />
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg leading-tight ${titleColor}`}>{testimonial.name}</h4>
                    <p className={`text-sm font-semibold mt-1 ${roleColor}`}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;