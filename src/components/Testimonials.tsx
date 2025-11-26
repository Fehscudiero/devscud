import { useEffect, useState } from "react";
import { Quote, Star, BadgeCheck } from "lucide-react";

// MOCK AOS
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
      initials: "RO", // Substituímos avatar por iniciais
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

  // -- Estilos Dinâmicos --
  const sectionBgClass = isDarkTheme ? "bg-secondary/20" : "bg-slate-50";
  const titleColor = isDarkTheme ? "text-foreground" : "text-slate-900";
  const textColor = isDarkTheme ? "text-muted-foreground" : "text-slate-600";

  // Card Styling - Glassmorphism Profundo
  const cardBg = isDarkTheme
    ? "bg-card/40 backdrop-blur-md border-white/5"
    : "bg-white/80 backdrop-blur-md border-slate-200/60 shadow-lg";

  const cardHover = isDarkTheme
    ? "hover:bg-card/60 hover:border-purple-500/30 hover:shadow-purple-500/10"
    : "hover:bg-white hover:border-purple-300 hover:shadow-xl";

  // Estilo do Monograma (Novo)
  const monogramBg = isDarkTheme
    ? "bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700"
    : "bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-200 border-purple-200";
  const monogramText = isDarkTheme ? "text-white" : "text-purple-700";

  return (
    <section id="testimonials" className={`py-32 transition-colors duration-500 relative overflow-hidden ${sectionBgClass}`}>
      {/* Background Atmosphere (Luzes de fundo) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-96 h-96 rounded-full blur-[120px] opacity-20 ${isDarkTheme ? 'bg-purple-600' : 'bg-purple-400'}`}></div>
        <div className={`absolute bottom-20 right-10 w-80 h-80 rounded-full blur-[120px] opacity-20 ${isDarkTheme ? 'bg-blue-600' : 'bg-blue-400'}`}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho de Impacto */}
          <div className="text-center mb-24 space-y-6" data-aos="fade-down">
            <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight transition-colors duration-300 ${titleColor}`}>
              Impacto Real em <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Negócios Reais</span>
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
                className={`group relative p-8 rounded-[2rem] border transition-all duration-500 hover:-translate-y-2 ${cardBg} ${cardHover}`}
              >
                {/* Badge de Resultado (Topo) */}
                <div className={`absolute -top-4 left-8 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg transform transition-transform duration-300 group-hover:scale-110 ${isDarkTheme ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'bg-white text-purple-700 border border-purple-100'}`}>
                  {testimonial.highlight}
                </div>

                {/* Ícone de Aspas Gigante (Decorativo) */}
                <Quote className={`absolute top-8 right-8 w-16 h-16 opacity-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 ${isDarkTheme ? 'text-white' : 'text-purple-900'}`} />

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

                {/* Autor e Avatar (Substituído por Monograma Profissional) */}
                <div className="flex items-center gap-4 pt-6 border-t border-dashed border-gray-500/20">
                  <div className="relative">
                    {/* Glow atrás do monograma */}
                    <div className={`absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500 ${isDarkTheme ? 'bg-purple-500' : 'bg-purple-300'}`}></div>

                    {/* Novo Monograma Premium */}
                    <div className={`relative w-14 h-14 rounded-full flex items-center justify-center border-2 border-white/10 shadow-sm overflow-hidden ${monogramBg}`}>
                      {/* Efeito de vidro sutil sobre o gradiente */}
                      <div className="absolute inset-0 backdrop-blur-[1px] bg-white/5"></div>
                      <span className={`relative z-10 font-bold text-xl tracking-wider ${monogramText}`}>
                        {testimonial.initials}
                      </span>
                    </div>

                    {/* Selo de Verificado */}
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-[2px] shadow-sm z-20">
                      <BadgeCheck className="w-5 h-5 text-blue-500 fill-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg leading-tight ${titleColor}`}>{testimonial.name}</h4>
                    <p className={`text-sm font-semibold mt-1 ${isDarkTheme ? 'text-purple-400' : 'text-purple-600'}`}>{testimonial.role}</p>
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