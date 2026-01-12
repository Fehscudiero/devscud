import { useEffect, useState } from "react";
import {
  Globe,
  Gauge,
  Settings,
  LifeBuoy,
  Search,
  ShoppingCart,
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  { icon: Globe, title: "Criação de Websites", description: "Interfaces de alto impacto com foco em conversão e UX cinematográfica.", code: "UI_01" },
  { icon: Gauge, title: "Otimização de Sites", description: "Alta performance e Web Vitals no verde. Velocidade que o Google ama.", code: "PERF_02" },
  { icon: Settings, title: "Sistemas Web", description: "Dashboards e SaaS robustos desenvolvidos com escalabilidade absoluta.", code: "SYS_03" },
  { icon: LifeBuoy, title: "Suporte & Evolução", description: "Monitoramento contínuo para garantir que seu projeto nunca saia do ar.", code: "SUP_04" },
  { icon: Search, title: "SEO Técnico", description: "Estratégias avançadas para dominar a primeira página e ser encontrado.", code: "SEO_05" },
  { icon: ShoppingCart, title: "E-commerce High-End", description: "Lojas focadas em vendas com checkouts fluidos e experiência premium.", code: "SHOP_06" },
];

const Servicos = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

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

  const sectionBg = isDarkTheme ? "bg-[#030014]" : "bg-slate-50";
  const titleColor = isDarkTheme ? "text-white" : "text-slate-900";
  const descColor = isDarkTheme ? "text-slate-400" : "text-slate-600";
  const accentGradient = isDarkTheme
    ? "from-purple-500 via-cyan-400 to-blue-500"
    : "from-emerald-600 to-teal-600";

  return (
    <section id="servicos" className={`py-32 relative overflow-hidden transition-colors duration-1000 ${sectionBg}`}>

      {/* Elementos de Fundo (Aura) */}
      <div className={`absolute top-0 right-0 w-[600px] h-[600px] blur-[150px] opacity-10 pointer-events-none ${isDarkTheme ? 'bg-purple-600' : 'bg-emerald-300'}`} />
      <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] blur-[150px] opacity-10 pointer-events-none ${isDarkTheme ? 'bg-cyan-600' : 'bg-blue-300'}`} />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header Centralizado */}
        <div className="max-w-3xl mx-auto text-center mb-24 space-y-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`text-xs font-mono font-black tracking-[0.5em] uppercase ${isDarkTheme ? 'text-cyan-400' : 'text-emerald-600'}`}
          >
            Capabilities // 2026
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-5xl sm:text-7xl font-black leading-none tracking-tighter ${titleColor}`}
          >
            SOLUÇÕES <br />
            <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent italic`}>DIGITAIS_</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-lg sm:text-xl font-medium max-w-2xl mx-auto ${descColor}`}
          >
            Transformando conceitos complexos em experiências digitais de alta performance e design impecável.
          </motion.p>
        </div>

        {/* Grid de Serviços Centralizado */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              isDarkTheme={isDarkTheme}
              accentGradient={accentGradient}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index, isDarkTheme, accentGradient }: any) => {
  const { icon: Icon, title, description, code } = service;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className={`relative p-8 rounded-[2.5rem] border group overflow-hidden transition-all duration-500
        ${isDarkTheme
          ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-white/20'
          : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-emerald-500/30'}`}
    >
      {/* Efeito Glow Interno ao Hover */}
      <div className={`absolute -right-20 -top-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${isDarkTheme ? 'bg-cyan-400' : 'bg-emerald-400'}`} />

      <div className="relative z-10 flex flex-col items-center text-center space-y-6">

        {/* ID do Serviço (Estilo HUD) */}
        <div className="w-full flex justify-between items-center opacity-40 font-mono text-[10px] tracking-widest">
          <span>{code}</span>
          <div className={`h-[1px] flex-1 mx-4 ${isDarkTheme ? 'bg-white/10' : 'bg-black/10'}`} />
          <span className="animate-pulse">●</span>
        </div>

        {/* Ícone com Container Orgânico */}
        <div className={`relative p-5 rounded-2xl bg-gradient-to-br transition-transform duration-500 group-hover:rotate-[10deg]
          ${isDarkTheme ? 'from-white/10 to-transparent' : 'from-slate-100 to-white shadow-inner'}`}>
          <Icon className={`w-8 h-8 ${isDarkTheme ? 'text-cyan-400' : 'text-emerald-600'}`} />
        </div>

        <div className="space-y-3">
          <h3 className={`text-2xl font-black tracking-tight ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>
            {title}
          </h3>
          <p className={`text-sm leading-relaxed font-medium ${isDarkTheme ? 'text-slate-400' : 'text-slate-600'}`}>
            {description}
          </p>
        </div>

        {/* Indicador de Rodapé */}
        <div className={`h-1 w-0 group-hover:w-12 transition-all duration-500 rounded-full bg-gradient-to-r ${accentGradient}`} />
      </div>
    </motion.div>
  );
};

export default Servicos;