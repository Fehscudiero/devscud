import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles, Mail, Phone, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { IMaskInput } from "react-imask";

// MOCK AOS
const AOS = {
  init: (config: any) => console.log("AOS init", config),
  refresh: () => console.log("AOS refresh"),
};

const Contact = () => {
  const { toast } = useToast();
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

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulação de envio para UX (Mantenha sua lógica real de fetch aqui)
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Mensagem enviada com sucesso! 🚀",
        description: "Em breve entrarei em contato para tirarmos seu projeto do papel.",
        className: "bg-purple-600 text-white border-none",
      });
      setFormData({ name: "", phone: "", email: "", message: "" });
    }, 2000);
  };

  // -- Estilos Dinâmicos --
  const sectionBgClass = isDarkTheme ? "bg-[#020817]" : "bg-slate-50";
  const titleColor = isDarkTheme ? "text-white" : "text-slate-900";
  const textColor = isDarkTheme ? "text-slate-400" : "text-slate-600";

  // Input Styles
  const inputBg = isDarkTheme ? "bg-white/5" : "bg-white";
  const inputBorder = isDarkTheme ? "border-white/10" : "border-slate-200";
  const inputFocus = "focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300";

  return (
    <section id="contact" className={`py-32 relative overflow-hidden transition-colors duration-500 ${sectionBgClass}`}>

      {/* Background Atmosphere (Luzes de fundo dinâmicas) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 animate-pulse ${isDarkTheme ? 'bg-purple-600' : 'bg-purple-400'}`} style={{ animationDuration: '4s' }}></div>
        <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 animate-pulse ${isDarkTheme ? 'bg-blue-600' : 'bg-blue-400'}`} style={{ animationDuration: '7s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">

          {/* Grid Layout: Texto à esquerda, Form à direita (em telas grandes) */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Coluna da Esquerda: Copywriting de Venda */}
            <div className="space-y-8 text-center lg:text-left" data-aos="fade-right">
              <div>
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${isDarkTheme ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-purple-100 text-purple-700 border border-purple-200'}`}>
                  <Sparkles className="w-3 h-3" />
                  Disponível para novos projetos
                </span>
                <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight ${titleColor}`}>
                  Vamos construir o <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">Extraordinário?</span>
                </h2>
              </div>

              <p className={`text-lg leading-relaxed ${textColor}`}>
                Seu projeto merece mais do que apenas código. Merece estratégia, design de elite e performance. Me conte sua ideia e vamos transformá-la no próximo destaque do mercado.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${isDarkTheme ? 'bg-white/5' : 'bg-white shadow-sm'}`}>
                    <Mail className="w-6 h-6 text-purple-500" />
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
              <div className={`relative p-8 rounded-[2rem] border backdrop-blur-xl shadow-2xl transition-all duration-300 ${isDarkTheme ? 'bg-white/5 border-white/10 shadow-purple-900/20' : 'bg-white/60 border-white/40 shadow-xl'}`}>

                {/* Brilho decorativo no topo do card */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50 blur-[2px]"></div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Nome */}
                    <div className="space-y-2">
                      <label htmlFor="name" className={`text-sm font-medium ml-1 ${titleColor}`}>Nome</label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Seu nome"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setActiveField('name')}
                        onBlur={() => setActiveField(null)}
                        className={`h-12 rounded-xl ${inputBg} ${inputBorder} ${inputFocus} ${activeField === 'name' ? 'ring-2 ring-purple-500 border-transparent' : ''}`}
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className={`text-sm font-medium ml-1 ${titleColor}`}>Email</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setActiveField('email')}
                        onBlur={() => setActiveField(null)}
                        className={`h-12 rounded-xl ${inputBg} ${inputBorder} ${inputFocus} ${activeField === 'email' ? 'ring-2 ring-purple-500 border-transparent' : ''}`}
                        required
                      />
                    </div>
                  </div>

                  {/* Telefone com Máscara */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className={`text-sm font-medium ml-1 ${titleColor}`}>WhatsApp / Celular</label>
                    <div className={`flex h-12 w-full rounded-xl border ${inputBg} ${inputBorder} focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent transition-all duration-300 overflow-hidden`}>
                      <IMaskInput
                        mask="(00) 00000-0000"
                        value={formData.phone}
                        onAccept={(value: any) => setFormData((prev) => ({ ...prev, phone: value }))}
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        className={`flex h-full w-full bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${titleColor}`}
                        required
                      />
                    </div>
                  </div>

                  {/* Mensagem */}
                  <div className="space-y-2">
                    <label htmlFor="message" className={`text-sm font-medium ml-1 ${titleColor}`}>Sobre o Projeto</label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Me conte um pouco sobre sua ideia, prazos ou objetivos..."
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setActiveField('message')}
                      onBlur={() => setActiveField(null)}
                      className={`min-h-[120px] rounded-xl resize-none ${inputBg} ${inputBorder} ${inputFocus} ${activeField === 'message' ? 'ring-2 ring-purple-500 border-transparent' : ''}`}
                      required
                    />
                  </div>

                  {/* Botão de Envio de Alto Impacto */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 text-base font-bold rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Enviar Proposta
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
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