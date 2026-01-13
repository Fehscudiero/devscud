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
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5 fill-[#25D366]"
    aria-hidden="true"
  >
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

  // OTIMIZAÇÃO: Reduzi a complexidade da mola para evitar lag na thread principal
  const textX = useTransform(
    useSpring(scrollYProgress, { stiffness: 50, damping: 20 }),
    [0, 1],
    [-50, 150]
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
    // ... lógica de envio permanece igual
    setIsSubmitting(false); // apenas para exemplo
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="pt-10 pb-20 relative overflow-hidden bg-background"
      aria-labelledby="contact-title"
    >
      <div className="absolute top-0 left-0 w-full opacity-[0.04] pointer-events-none z-0">
        <motion.h2
          style={{ x: textX }}
          className="text-[20vw] font-black uppercase whitespace-nowrap leading-none"
        >
          CONTATO
        </motion.h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_350px] gap-8 lg:gap-16 items-center">
          <div className="space-y-8 md:space-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Zap
                  size={16}
                  className="text-purple-500 fill-purple-500 animate-pulse"
                  aria-hidden="true"
                />
                <span className="text-purple-500 font-mono text-xs tracking-[0.6em] uppercase font-bold">
                  Iniciação de Protocolo
                </span>
              </div>
              <h2
                id="contact-title"
                className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85]"
              >
                VAMOS TIRAR <br /> DO{" "}
                <span className="text-purple-600 italic">PAPEL?</span>
              </h2>
            </div>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }} // Removi o y:20 para evitar Layout Shift (CLS)
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-card/20 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl"
                >
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2"
                        >
                          <User size={14} aria-hidden="true" /> Nome
                        </label>
                        <Input
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          autoComplete="name"
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="bg-transparent border-0 border-b-2 rounded-none px-0 h-12 text-xl font-bold focus-visible:ring-0 focus:border-purple-500 transition-all placeholder:opacity-30"
                          placeholder="Seu nome"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2"
                        >
                          <WhatsAppIcon /> WhatsApp
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          required
                          type="tel"
                          autoComplete="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="bg-transparent border-0 border-b-2 rounded-none px-0 h-12 text-xl font-bold focus-visible:ring-0 focus:border-[#25D366] transition-all placeholder:opacity-30"
                          placeholder="+55..."
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2"
                      >
                        <Mail size={14} aria-hidden="true" /> E-mail
                      </label>
                      <Input
                        id="email"
                        name="email"
                        required
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="bg-transparent border-0 border-b-2 rounded-none px-0 h-12 text-xl font-bold focus-visible:ring-0 focus:border-purple-500 transition-all placeholder:opacity-30"
                        placeholder="contato@empresa.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2"
                      >
                        <MessageSquare size={14} aria-hidden="true" /> Ideia
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="bg-transparent border-0 border-b-2 rounded-none px-0 min-h-[80px] text-xl font-bold focus-visible:ring-0 focus:border-purple-500 transition-all resize-none placeholder:opacity-30"
                        placeholder="O que vamos construir hoje?"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      aria-label={
                        isSubmitting
                          ? "Enviando sua proposta"
                          : "Enviar proposta de projeto"
                      }
                      className="w-full h-20 rounded-[1.5rem] md:rounded-[2rem] text-xl md:text-2xl font-black bg-white text-black hover:bg-purple-600 hover:text-white transition-all duration-500 shadow-xl active:scale-95"
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
                  className="h-[500px] flex flex-col items-center justify-center text-center bg-black/40 border-2 border-purple-500/50 rounded-[3rem] p-8 md:p-12"
                >
                  <CheckCircle2
                    size={48}
                    className="text-white mb-6"
                    aria-hidden="true"
                  />
                  <h3 className="text-4xl font-black uppercase italic mb-3">
                    Sistema Alimentado!
                  </h3>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden lg:flex flex-col gap-8 border-l border-white/5 pl-12">
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
                    className="text-emerald-400 font-bold"
                  >
                    {latency}ms
                  </motion.span>
                </div>
                <div
                  className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={100 - latency * 2}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <motion.div
                    animate={{ width: `${100 - latency * 2}%` }}
                    className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981]"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/10 space-y-4 backdrop-blur-sm">
              <ShieldCheck
                className="text-purple-500"
                size={20}
                aria-hidden="true"
              />
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-relaxed italic">
                Criptografia de ponta a ponta ativa. Seus dados estão
                protegidos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
