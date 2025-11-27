import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Mail, ArrowRight } from "lucide-react";

// MOCK AOS (Para evitar erro no preview)
const AOS = {
  init: (config) => console.log("AOS init", config),
  refresh: () => console.log("AOS refresh"),
};

const Contact = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // ------------------------------------------------------------------
  // 🚨 MUDANÇA AQUI: ENDPOINT DO FORMSPREE
  // O Formspree exige um ID do formulário (que é gerado após a primeira submissão com seu e-mail).
  // Usamos o seu e-mail para a primeira ativação:
  const FORMSPREE_EMAIL = "fehscudiero@gmail.com";
  const FORM_ACTION_ENDPOINT = `https://formspree.io/f/${FORMSPREE_EMAIL}`;

  // URL para onde o Formspree deve redirecionar após o sucesso
  const REDIRECT_URL = "https://www.scudiero.com.br/#contact?success=true";
  // ------------------------------------------------------------------


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

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  // isSubmitting e handleSubmit não são mais usados, mas mantemos o estado e o handler para controlar os inputs
  const [activeField, setActiveField] = useState(null);

  // -- Máscara de Telefone Manual --
  const formatPhone = (value) => {
    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, "");

    // Aplica a máscara (XX) XXXXX-XXXX visualmente
    let formatted = numbers;
    if (numbers.length > 2) {
      formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }
    if (numbers.length > 7) {
      formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }

    return formatted.slice(0, 15); // Limita o tamanho
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setFormData((prev) => ({ ...prev, [name]: formatPhone(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Funções de envio foram removidas, o formulário agora usa o POST nativo

  // -- Estilos Dinâmicos (Dual Personality) --

  // Fundo
  const sectionBgClass = isDarkTheme ? "bg-[#030014]" : "bg-white";

  // Texto
  const titleColor = isDarkTheme ? "text-white" : "text-slate-900";
  const textColor = isDarkTheme ? "text-slate-400" : "text-slate-600";
  const labelColor = isDarkTheme ? "text-slate-300" : "text-slate-700";


  // Gradiente do Título
  const gradientText = isDarkTheme
    ? "from-purple-600 via-indigo-500 to-blue-600"
    : "from-green-600 via-emerald-500 to-teal-600";

  // Badge
  const badgeClass = isDarkTheme
    ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
    : "bg-green-100 text-green-700 border-green-200";

  // Ícone de Email
  const iconBg = isDarkTheme ? "bg-white/5" : "bg-green-50 shadow-sm";
  const iconColor = isDarkTheme ? "text-purple-500" : "text-green-600";

  // Card Glassmorphism
  const cardClass = isDarkTheme
    ? "bg-white/5 border-white/10 shadow-purple-900/20"
    : "bg-white border-slate-200 shadow-xl shadow-green-900/5";

  // Inputs
  const inputBg = isDarkTheme ? "bg-white/5" : "bg-slate-50";
  const inputBorder = isDarkTheme ? "border-white/10" : "border-slate-200";

  // Foco do Input
  const focusRing = isDarkTheme
    ? "focus:ring-purple-500"
    : "focus:ring-green-500";

  const activeRing = isDarkTheme
    ? "ring-2 ring-purple-500 border-transparent"
    : "ring-2 ring-green-500 border-transparent";

  // Botão de Envio (Gradiente)
  const btnGradient = isDarkTheme
    ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-500/25 hover:shadow-purple-500/40"
    : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-green-500/25 hover:shadow-green-500/40";

  // Blobs de Fundo
  const blob1 = isDarkTheme ? "bg-purple-600" : "bg-green-400";
  const blob2 = isDarkTheme ? "bg-blue-600" : "bg-teal-400";

  return (
    <section id="contact" className={`py-24 relative overflow-hidden transition-colors duration-500 ${sectionBgClass}`}>

      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 animate-pulse ${blob1}`} style={{ animationDuration: '4s' }}></div>
        <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 animate-pulse ${blob2}`} style={{ animationDuration: '7s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Coluna da Esquerda: Copywriting de Venda */}
            <div className="space-y-8 text-center lg:text-left" data-aos="fade-right">
              <div>
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border ${badgeClass}`}>
                  <Sparkles className="w-3 h-3" />
                  Disponível para novos projetos
                </span>
                <h2 className={`text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight ${titleColor}`}>
                  Vamos transformar sua presença <span className={`bg-gradient-to-r ${gradientText} bg-clip-text text-transparent animate-gradient-x`}>Digital?</span>
                </h2>
              </div>

              <p className={`text-lg leading-relaxed ${textColor}`}>
                Mais do que linhas de código, entrego soluções digitais. Do conceito à implementação, meu foco é criar produtos consistentes que resolvam problemas reais e entreguem resultados.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full transition-colors duration-300 ${iconBg}`}>
                    <Mail className={`w-6 h-6 ${iconColor}`} />
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-medium ${textColor}`}>Email</p>
                    <p className={`font-semibold ${titleColor}`}>scudiero.dev@yahoo.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna da Direita: O Formulário Glassmorphism */}
            <div data-aos="fade-left">
              <div className={`relative p-8 rounded-[2rem] border backdrop-blur-xl shadow-2xl transition-all duration-300 ${cardClass}`}>

                {/* Brilho decorativo no topo */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-${isDarkTheme ? 'purple' : 'green'}-500 to-transparent opacity-50 blur-[2px]`}></div>

                {/* O FORMULÁRIO AGORA USA O MÉTODO POST DIRETO COM FORMSPREE */}
                <form
                  action={FORM_ACTION_ENDPOINT}
                  method="POST"
                  className="space-y-6"
                >
                  {/* Campos Ocultos para Formspree: */}

                  {/* 1. Assunto do Email (Formspree usa 'subject' em vez de '_subject') */}
                  <input
                    type="hidden"
                    name="subject"
                    value={`[PORTFÓLIO] Novo Contato de ${formData.name || "Cliente Novo"}`}
                  />
                  {/* 2. Redirecionamento após o sucesso (Formspree usa '_next') */}
                  <input
                    type="hidden"
                    name="_next"
                    value={REDIRECT_URL}
                  />

                  {/* 3. Para que você possa responder ao e-mail do cliente diretamente */}
                  <input
                    type="hidden"
                    name="_replyto"
                    value={formData.email}
                  />


                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Nome */}
                    <div className="space-y-2">
                      <label htmlFor="name" className={`text-sm font-medium ml-1 ${labelColor}`}>Nome</label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Seu nome"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setActiveField('name')}
                        onBlur={() => setActiveField(null)}
                        className={`h-12 rounded-xl ${inputBg} ${inputBorder} ${focusRing} focus:border-transparent transition-all duration-300 ${activeField === 'name' ? activeRing : ''} ${titleColor}`}
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className={`text-sm font-medium ml-1 ${labelColor}`}>Email</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setActiveField('email')}
                        onBlur={() => setActiveField(null)}
                        className={`h-12 rounded-xl ${inputBg} ${inputBorder} ${focusRing} focus:border-transparent transition-all duration-300 ${activeField === 'email' ? activeRing : ''} ${titleColor}`}
                        required
                      />
                    </div>
                  </div>

                  {/* Telefone (Máscara Manual) */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className={`text-sm font-medium ml-1 ${labelColor}`}>WhatsApp / Celular</label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setActiveField('phone')}
                      onBlur={() => setActiveField(null)}
                      className={`h-12 rounded-xl ${inputBg} ${inputBorder} ${focusRing} focus:border-transparent transition-all duration-300 ${activeField === 'phone' ? activeRing : ''} ${titleColor}`}
                      required
                    />
                  </div>

                  {/* Mensagem */}
                  <div className="space-y-2">
                    <label htmlFor="message" className={`text-sm font-medium ml-1 ${labelColor}`}>Sobre o Projeto</label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Me conte um pouco sobre sua ideia, prazos ou objetivos..."
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setActiveField('message')}
                      onBlur={() => setActiveField(null)}
                      className={`min-h-[120px] rounded-xl resize-none ${inputBg} ${inputBorder} ${focusRing} focus:border-transparent transition-all duration-300 ${activeField === 'message' ? activeRing : ''} ${titleColor}`}
                      required
                    />
                  </div>

                  {/* Botão de Envio */}
                  <Button
                    type="submit"
                    // isSubmitting não é mais necessário, o próprio browser lida com o estado de envio
                    className={`w-full h-14 text-base font-bold rounded-xl text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group ${btnGradient}`}
                  >
                    <span className="flex items-center gap-2">
                      Enviar Proposta
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>

                  <p className={`text-xs text-center ${textColor}`}>
                    Respondo geralmente em menos de 2 horas em horário comercial.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;