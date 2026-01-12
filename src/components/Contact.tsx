import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Mail, User, Phone, MessageSquare, CheckCircle2, AlertCircle, Send } from "lucide-react";

const Contact = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; msg: string }>({ type: null, msg: "" });
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax do título gigante (fundo)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const textX = useTransform(scrollYProgress, [0, 1], [200, -200]);

  useEffect(() => {
    const checkTheme = () => setIsDarkTheme(document.documentElement.classList.contains("dark"));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3").replace(/(-\d{4})\d+?$/, "$1");
    }
    return value;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData(e.currentTarget);
    try {
      const response = await fetch("https://formsubmit.co/ajax/scudiero.dev@yahoo.com", {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setStatus({ type: 'success', msg: "PROPOSTA ENVIADA COM SUCESSO!" });
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else { throw new Error(); }
    } catch {
      setStatus({ type: 'error', msg: "ERRO CRÍTICO. TENTE NOVAMENTE." });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus({ type: null, msg: "" }), 6000);
    }
  };

  const accentGradient = isDarkTheme
    ? "from-cyan-500 via-purple-500 to-blue-500"
    : "from-emerald-500 via-teal-500 to-green-600";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`py-32 relative overflow-hidden transition-colors duration-1000 z-30 ${isDarkTheme ? 'bg-[#030014]' : 'bg-slate-50'}`}
    >
      {/* 1. TEXTO KINETIC DE FUNDO (Brutalista) */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full overflow-hidden pointer-events-none select-none z-0">
        <motion.h2
          style={{ x: textX }}
          className={`text-[25vw] font-black leading-none uppercase opacity-[0.03] dark:opacity-[0.07] whitespace-nowrap ${isDarkTheme ? 'text-white' : 'text-black'}`}
        >
          LET'S WORK TOGETHER • CONTACT •
        </motion.h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

          {/* 2. HEADER CENTRALIZADO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-16 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkTheme ? 'text-cyan-400' : 'text-emerald-600'}`}>
                Disponível para Projetos
              </span>
            </div>

            <h2 className={`text-6xl md:text-8xl font-black tracking-tighter ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>
              START A <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent italic`}>PROJECT_</span>
            </h2>
          </motion.div>

          {/* 3. O CARD "SUPER FODA" (COM BORDA ANIMADA) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative w-full group"
          >
            {/* Efeito de Borda Giratória (Neon) */}
            <div className={`absolute -inset-[2px] rounded-[3rem] opacity-70 group-hover:opacity-100 transition duration-1000 overflow-hidden`}>
              <div className={`absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00EAFF_0%,#FF00D4_50%,#00EAFF_100%)] opacity-40`} />
            </div>

            <div className={`relative p-8 md:p-16 rounded-[3rem] backdrop-blur-3xl shadow-2xl ${isDarkTheme ? 'bg-slate-950/90' : 'bg-white/90'}`}>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                  {/* Nome */}
                  <div className="relative group/input">
                    <User className="absolute left-0 -top-6 w-4 h-4 opacity-40 group-focus-within/input:opacity-100 transition-opacity" />
                    <Input
                      name="name"
                      placeholder="NOME"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-transparent border-0 border-b border-white/10 rounded-none focus-visible:ring-0 focus:border-cyan-500 text-center text-xl font-bold uppercase tracking-widest h-14"
                    />
                  </div>

                  {/* Telefone */}
                  <div className="relative group/input">
                    <Phone className="absolute left-0 -top-6 w-4 h-4 opacity-40 group-focus-within/input:opacity-100 transition-opacity" />
                    <Input
                      name="phone"
                      placeholder="WHATSAPP"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                      className="bg-transparent border-0 border-b border-white/10 rounded-none focus-visible:ring-0 focus:border-cyan-500 text-center text-xl font-bold uppercase tracking-widest h-14"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative group/input">
                  <Mail className="absolute left-0 -top-6 w-4 h-4 opacity-40 group-focus-within/input:opacity-100 transition-opacity" />
                  <Input
                    name="email"
                    type="email"
                    placeholder="E-MAIL"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-transparent border-0 border-b border-white/10 rounded-none focus-visible:ring-0 focus:border-cyan-500 text-center text-xl font-bold uppercase tracking-widest h-14"
                  />
                </div>

                {/* Mensagem */}
                <div className="relative group/input">
                  <MessageSquare className="absolute left-0 -top-6 w-4 h-4 opacity-40 group-focus-within/input:opacity-100 transition-opacity" />
                  <Textarea
                    name="message"
                    placeholder="DESCREVA O PROJETO..."
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-transparent border-0 border-b border-white/10 rounded-none focus-visible:ring-0 focus:border-cyan-500 text-center text-xl font-bold uppercase tracking-widest min-h-[100px] resize-none overflow-hidden"
                  />
                </div>

                {/* Botão Magnético */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    disabled={isSubmitting}
                    className={`w-full h-24 rounded-full text-2xl font-black uppercase tracking-[0.3em] transition-all duration-500 relative overflow-hidden
                      ${isDarkTheme ? 'bg-white text-black hover:text-white' : 'bg-black text-white hover:text-white'}`}
                  >
                    <div className={`absolute inset-0 w-0 group-hover:w-full transition-all duration-700 bg-gradient-to-r ${accentGradient}`} />
                    <span className="relative z-10 flex items-center gap-4">
                      {isSubmitting ? "ENVIANDO..." : "ENVIAR AGORA"}
                      <Send className="w-6 h-6" />
                    </span>
                  </Button>
                </motion.div>
              </form>

              {/* Feedback de Status */}
              <AnimatePresence>
                {status.type && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-10 p-6 rounded-2xl flex items-center justify-center gap-4 border-2 ${status.type === 'success' ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400' : 'bg-red-500/10 border-red-500/50 text-red-400'}`}
                  >
                    {status.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                    <p className="font-black text-sm uppercase tracking-widest">{status.msg}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* 4. FOOTER DO CONTATO */}
          <div className="mt-20 flex flex-col items-center gap-6">
            <p className={`font-mono text-sm tracking-widest opacity-50 ${isDarkTheme ? 'text-white' : 'text-black'}`}>
              SCUDIERO.DEV@YAHOO.COM
            </p>
            <div className="h-20 w-[2px] bg-gradient-to-b from-cyan-500 to-transparent"></div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Contact;