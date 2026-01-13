import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  User,
  MessageSquare,
  Send,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 4.754a8.117 8.117 0 01-3.8-.94l-.272-.162-2.822.74.752-2.751-.177-.282a8.121 8.121 0 01-1.248-4.322c0-4.495 3.657-8.151 8.156-8.151 2.18 0 4.228.85 5.761 2.38 1.533 1.532 2.381 3.58 2.381 5.761 0 4.496-3.658 8.152-8.156 8.152m6.415-14.561A9.721 9.721 0 0012.658 2c-5.39 0-9.778 4.388-9.778 9.778 0 1.723.45 3.405 1.305 4.888L2 23l6.447-1.69a9.71 9.71 0 004.21 1.014h.004c5.388 0 9.776-4.388 9.776-9.778 0-2.607-1.015-5.059-2.86-6.904z" />
  </svg>
);

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [latency, setLatency] = useState(4);
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const textX = useTransform(
    useSpring(scrollYProgress, { stiffness: 100, damping: 30 }),
    [0, 1],
    [-50, 250]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * (5 - 2 + 1)) + 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/seu-email@exemplo.com",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            _subject: `🔥 NOVO PROJETO: ${formData.name}`,
          }),
        }
      );
      if (response.ok) {
        setIsSuccess(true);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#9333ea", "#25D366"],
        });
        setTimeout(
          () =>
            window.open(
              `https://wa.me/5511984623116?text=${encodeURIComponent(
                `Fala Scudiero! Sou ${formData.name}. Projeto: ${formData.message}`
              )}`,
              "_blank"
            ),
          3000
        );
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({ name: "", phone: "", email: "", message: "" });
        }, 10000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-40 md:py-60 relative overflow-hidden bg-background"
    >
      {/* Background Text */}
      <div className="absolute top-20 left-0 w-full opacity-[0.04] pointer-events-none z-0">
        <motion.h2
          style={{ x: textX }}
          className="text-[20vw] font-black uppercase whitespace-nowrap"
        >
          CONTATO
        </motion.h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Alinhamento da Grid alterado para items-end para descer a barra lateral */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_350px] gap-16 items-end">
          <div className="space-y-16">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Zap
                  size={16}
                  className="text-purple-500 fill-purple-500 animate-pulse"
                />
                <span className="text-purple-500 font-mono text-xs tracking-[0.6em] uppercase font-bold">
                  Iniciação de Protocolo
                </span>
              </div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
                VAMOS TIRAR <br /> DO{" "}
                <span className="text-purple-600 italic">PAPEL?</span>
              </h2>
            </div>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  className="bg-card/20 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-14 shadow-2xl"
                >
                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                          <User size={14} /> Nome
                        </label>
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="bg-transparent border-0 border-b-2 rounded-none px-0 h-14 text-xl font-bold focus-visible:ring-0 focus:border-purple-500 transition-all"
                          placeholder="Seu nome"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                          <WhatsAppIcon /> WhatsApp
                        </label>
                        <Input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="bg-transparent border-0 border-b-2 rounded-none px-0 h-14 text-xl font-bold focus-visible:ring-0 focus:border-[#25D366] transition-all"
                          placeholder="+55..."
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Mail size={14} /> E-mail
                      </label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="bg-transparent border-0 border-b-2 rounded-none px-0 h-14 text-xl font-bold focus-visible:ring-0 focus:border-purple-500 transition-all"
                        placeholder="contato@empresa.com"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <MessageSquare size={14} /> Ideia
                      </label>
                      <Textarea
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="bg-transparent border-0 border-b-2 rounded-none px-0 min-h-[100px] text-xl font-bold focus-visible:ring-0 focus:border-purple-500 transition-all resize-none"
                        placeholder="O que vamos construir hoje?"
                      />
                    </div>
                    <Button
                      disabled={isSubmitting}
                      className="w-full h-24 rounded-[2rem] text-2xl font-black bg-white text-black hover:bg-purple-600 hover:text-white transition-all duration-500 shadow-xl active:scale-95"
                    >
                      {isSubmitting ? "PROCESSANDO..." : "ENVIAR PROPOSTA"}
                    </Button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-[600px] flex flex-col items-center justify-center text-center bg-black/40 border-2 border-purple-500/50 rounded-[3rem] p-12 relative overflow-hidden shadow-[0_0_80px_rgba(147,51,234,0.2)]"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-32 h-32 bg-purple-600 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(147,51,234,0.5)]"
                  >
                    <CheckCircle2 size={60} className="text-white" />
                  </motion.div>
                  <h3 className="text-5xl font-black uppercase italic mb-4">
                    Sistema Alimentado!
                  </h3>
                  <p className="text-purple-400 font-mono text-sm uppercase tracking-[0.4em] mb-10">
                    Celebrando sua nova jornada...
                  </p>
                  <div className="w-full max-w-xs h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 10 }}
                      className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-400"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Barra Lateral - pt-64 para garantir que fique bem abaixo, acompanhando o formulário */}
          <div className="hidden lg:flex flex-col gap-10 border-l border-white/5 pl-12 pt-64">
            <div className="space-y-6">
              <span className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em]">
                Engine Status
              </span>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase">
                  <span className="opacity-40 tracking-widest">
                    Site Latency
                  </span>
                  <motion.span
                    key={latency}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-emerald-400 font-bold tracking-tighter"
                  >
                    {latency}ms
                  </motion.span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: `${100 - latency * 2}%` }}
                    transition={{ type: "spring", stiffness: 50 }}
                    className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981]"
                  />
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 space-y-4 backdrop-blur-sm">
              <ShieldCheck className="text-purple-500" size={24} />
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground leading-relaxed italic">
                Criptografia de ponta a ponta ativa. Seus dados estão em um
                ambiente 100% seguro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
