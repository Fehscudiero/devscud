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

// --- Funções de Utilitário de Estilo (Otimização) ---
const getStyles = (isDarkTheme) => {
  return {
    // Fundo e Texto Base
    sectionBg: isDarkTheme ? "bg-[#030014]" : "bg-white",
    titleColor: isDarkTheme ? "text-white" : "text-slate-900",
    textColor: isDarkTheme ? "text-slate-400" : "text-slate-600",
    labelColor: isDarkTheme ? "text-slate-300" : "text-slate-700",

    // Gradientes
    gradientText: isDarkTheme
      ? "from-purple-600 via-indigo-500 to-blue-600"
      : "from-green-600 via-emerald-500 to-teal-600",

    // Badge
    badgeClass: isDarkTheme
      ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
      : "bg-green-100 text-green-700 border-green-200",

    // Ícone de Email
    iconBg: isDarkTheme ? "bg-white/5" : "bg-green-50 shadow-sm",
    iconColor: isDarkTheme ? "text-purple-500" : "text-green-600",

    // Card Glassmorphism
    cardClass: isDarkTheme
      ? "bg-white/5 border-white/10 shadow-purple-900/20"
      : "bg-white border-slate-200 shadow-xl shadow-green-900/5",

    // Inputs
    inputBg: isDarkTheme ? "bg-white/5" : "bg-slate-50",
    inputBorder: isDarkTheme ? "border-white/10" : "border-slate-200",
    focusRing: isDarkTheme ? "focus:ring-purple-500" : "focus:ring-green-500",
    activeRing: isDarkTheme
      ? "ring-2 ring-purple-500 border-transparent"
      : "ring-2 ring-green-500 border-transparent",

    // Botão de Envio
    btnGradient: isDarkTheme
      ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-500/25 hover:shadow-purple-500/40"
      : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-green-500/25 hover:shadow-green-500/40",
    btnColor: isDarkTheme ? "bg-purple-500" : "bg-emerald-500", // Cor sólida para o loader

    // Blobs de Fundo
    blob1: isDarkTheme ? "bg-purple-600" : "bg-green-400",
    blob2: isDarkTheme ? "bg-blue-600" : "bg-teal-400",
  };
};

const Contact = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [activeField, setActiveField] = useState(null);

  // ------------------------------------------------------------------
  // 🔑 ENDPOINT FORMSUBMIT (AJAX)
  const FORM_ACTION_ENDPOINT = "https://formsubmit.co/ajax/scudiero.dev@yahoo.com";
  const PUBLIC_EMAIL_DISPLAY = "scudiero.dev@yahoo.com";
  // ------------------------------------------------------------------

  // --- Efeitos ---

  // Efeito 1: Detecção de Tema
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

  // Efeito 2: Inicialização do AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });
    AOS.refresh();
  }, []);

  // NOVO Efeito 3: Fazer o modal sumir após 5 segundos
  useEffect(() => {
    if (isSuccess || isError) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        setIsError(false);
      }, 5000); // 5 segundos

      return () => clearTimeout(timer);
    }
  }, [isSuccess, isError]);


  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });


  // -- Máscara de Telefone Manual --
  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "");
    let formatted = numbers;
    if (numbers.length > 2) {
      formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }
    if (numbers.length > 7) {
      formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
    return formatted.slice(0, 15);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setFormData((prev) => ({ ...prev, [name]: formatPhone(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // --- Lógica de envio AJAX com FormSubmit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);
    setIsError(false);

    // Preparando os dados, incluindo os campos ocultos do FormSubmit
    const dataToSend = new FormData(e.target);
    dataToSend.append("_subject", `[PORTFÓLIO] Novo Contato de ${formData.name || "Cliente Novo"}`);
    dataToSend.append("_replyto", formData.email);
    dataToSend.append("_captcha", "false");

    try {
      const response = await fetch(FORM_ACTION_ENDPOINT, {
        method: "POST",
        body: dataToSend,
        headers: {
          'Accept': 'application/json' // Crucial para o modo AJAX
        }
      });

      if (response.ok) {
        // SUCESSO
        setIsSuccess(true);
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        // ERRO
        setIsError(true);
      }
    } catch (error) {
      console.error("Erro no envio do formulário:", error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };
  // --- FIM: Lógica de envio AJAX ---

  // --- OTIMIZAÇÃO: Obtendo todas as classes de estilo em um único objeto ---
  const styles = getStyles(isDarkTheme);

  return (
    <section id="contact" className={`py-24 relative overflow-hidden transition-colors duration-500 ${styles.sectionBg}`}>

      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 animate-pulse ${styles.blob1}`} style={{ animationDuration: '4s' }}></div>
        <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 animate-pulse ${styles.blob2}`} style={{ animationDuration: '7s' }}></div>
        <style>
          {`
            @keyframes gradient-x {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
            .animate-gradient-x {
              background-size: 200% auto;
              animation: gradient-x 10s ease infinite;
            }
             /* ESTILO DA BARRA DE CARREGAMENTO AVANÇADA */
             @keyframes loading-bar-animation {
                 0% { width: 0%; left: -100%; background-color: rgba(255, 255, 255, 0.4); }
                 50% { width: 60%; left: 20%; background-color: rgba(255, 255, 255, 0.8); }
                 100% { width: 0%; left: 100%; background-color: rgba(255, 255, 255, 0.4); }
             }
             .loader-bar {
                 content: '';
                 position: absolute;
                 top: 0;
                 bottom: 0;
                 // As cores da barra se adaptam ao tema
                 background: ${isDarkTheme ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)' : 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.4), transparent)'};
                 animation: loading-bar-animation 1.5s ease-in-out infinite;
                 border-radius: 9999px; // Para acompanhar o arredondamento do botão
             }
          `}
        </style>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Coluna da Esquerda: Copywriting de Venda */}
            <div className="space-y-8 text-center lg:text-left" data-aos="fade-right">
              <div>
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border ${styles.badgeClass}`}>
                  <Sparkles className="w-3 h-3" />
                  Disponível para novos projetos
                </span>
                <h2 className={`text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight ${styles.titleColor}`}>
                  Vamos transformar sua presença <span className={`bg-gradient-to-r ${styles.gradientText} bg-clip-text text-transparent animate-gradient-x`}>Digital?</span>
                </h2>
              </div>

              <p className={`text-lg leading-relaxed ${styles.textColor}`}>
                Mais do que linhas de código, entrego soluções digitais. Do conceito à implementação, meu foco é criar produtos consistentemente que resolvam problemas reais e entreguem resultados.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full transition-colors duration-300 ${styles.iconBg}`}>
                    <Mail className={`w-6 h-6 ${styles.iconColor}`} />
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-medium ${styles.textColor}`}>Email</p>
                    {/* Usa o e-mail de exibição público */}
                    <p className={`font-semibold ${styles.titleColor}`}>{PUBLIC_EMAIL_DISPLAY}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna da Direita: O Formulário Glassmorphism */}
            <div data-aos="fade-left">
              <div className={`relative p-8 rounded-[2rem] border backdrop-blur-xl shadow-2xl transition-all duration-300 ${styles.cardClass}`}>

                {/* Brilho decorativo no topo */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-${isDarkTheme ? 'purple' : 'green'}-500 to-transparent opacity-50 blur-[2px]`}></div>

                {/* FEEDBACK DE MENSAGEM (Com auto-dismissal de 5s) */}
                {isSuccess && (
                  <div className="p-4 mb-4 text-sm rounded-xl bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200 transition-opacity duration-500" role="alert">
                    Mensagem enviada com sucesso!
                  </div>
                )}
                {isError && (
                  <div className="p-4 mb-4 text-sm rounded-xl bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200 transition-opacity duration-500" role="alert">
                    Erro ao enviar. Se o problema persistir, entre em contato diretamente pelo e-mail. O modal sumirá em 5s.
                  </div>
                )}

                {/* O FORMULÁRIO COM LÓGICA AJAX */}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Os campos ocultos são incluídos no handleSubmit, não mais no HTML */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Nome */}
                    <div className="space-y-2">
                      <label htmlFor="name" className={`text-sm font-medium ml-1 ${styles.labelColor}`}>Nome</label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Seu nome"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setActiveField('name')}
                        onBlur={() => setActiveField(null)}
                        className={`h-12 rounded-xl ${styles.inputBg} ${styles.inputBorder} ${styles.focusRing} focus:border-transparent transition-all duration-300 ${activeField === 'name' ? styles.activeRing : ''} ${styles.titleColor}`}
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className={`text-sm font-medium ml-1 ${styles.labelColor}`}>Email</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setActiveField('email')}
                        onBlur={() => setActiveField(null)}
                        className={`h-12 rounded-xl ${styles.inputBg} ${styles.inputBorder} ${styles.focusRing} focus:border-transparent transition-all duration-300 ${activeField === 'email' ? styles.activeRing : ''} ${styles.titleColor}`}
                        required
                      />
                    </div>
                  </div>

                  {/* Telefone (Máscara Manual) */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className={`text-sm font-medium ml-1 ${styles.labelColor}`}>WhatsApp / Celular</label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setActiveField('phone')}
                      onBlur={() => setActiveField(null)}
                      className={`h-12 rounded-xl ${styles.inputBg} ${styles.inputBorder} ${styles.focusRing} focus:border-transparent transition-all duration-300 ${activeField === 'phone' ? styles.activeRing : ''} ${styles.titleColor}`}
                      required
                    />
                  </div>

                  {/* Mensagem */}
                  <div className="space-y-2">
                    <label htmlFor="message" className={`text-sm font-medium ml-1 ${styles.labelColor}`}>Sobre o Projeto</label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Me conte um pouco sobre sua ideia, prazos ou objetivos..."
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setActiveField('message')}
                      onBlur={() => setActiveField(null)}
                      className={`min-h-[120px] rounded-xl resize-none ${styles.inputBg} ${styles.inputBorder} ${styles.focusRing} focus:border-transparent transition-all duration-300 ${activeField === 'message' ? styles.activeRing : ''} ${styles.titleColor}`}
                      required
                    />
                  </div>

                  {/* Botão de Envio */}
                  <Button
                    type="submit"
                    disabled={isSubmitting} // Desativa o botão durante o envio
                    className={`w-full h-14 text-base font-bold rounded-xl text-white transition-all duration-300 relative overflow-hidden ${styles.btnGradient} ${isSubmitting ? 'cursor-wait' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
                  >
                    {/* Barra de Carregamento Avançada (visível apenas durante o envio) */}
                    {isSubmitting && <span className="loader-bar" />}

                    <span className="flex items-center gap-2 relative z-10">
                      {isSubmitting ? "ENVIANDO..." : "ENVIAR PROPOSTA"}
                      {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                    </span>
                  </Button>

                  <p className={`text-xs text-center ${styles.textColor}`}>
                    Respondo geralmente em menos de 1 horas em horário comercial.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
        <style>
          {`
            @keyframes gradient-x {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
            .animate-gradient-x {
              background-size: 200% auto;
              animation: gradient-x 10s ease infinite;
            }
             /* ESTILO DA BARRA DE CARREGAMENTO AVANÇADA (Shimmer Effect) */
             @keyframes loading-bar-animation {
                 0% { width: 0%; left: -100%; }
                 50% { width: 60%; left: 20%; }
                 100% { width: 0%; left: 100%; }
             }
             .loader-bar {
                 content: '';
                 position: absolute;
                 top: 0;
                 bottom: 0;
                 // Gradient shimmer effect
                 background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
                 animation: loading-bar-animation 1.5s ease-in-out infinite;
                 border-radius: 9999px; // Para acompanhar o arredondamento do botão
             }
          `}
        </style>
      </div>
    </section>
  );
};

export default Contact;