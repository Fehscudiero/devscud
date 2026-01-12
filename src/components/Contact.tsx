import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  User,
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Send,
} from "lucide-react";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    msg: string;
  }>({ type: null, msg: "" });
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textX = useTransform(
    useSpring(scrollYProgress, { stiffness: 100, damping: 30 }),
    [0, 1],
    [-150, 150]
  );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
        .replace(/(-\d{4})\d+?$/, "$1");
    }
    return value;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData(e.currentTarget);
    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/seu-email@exemplo.com",
        {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        }
      );
      if (response.ok) {
        setStatus({
          type: "success",
          msg: "CONEXÃO ESTABELECIDA COM SUCESSO!",
        });
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        throw new Error();
      }
    } catch {
      setStatus({ type: "error", msg: "FALHA NO PROTOCOLO. TENTE NOVAMENTE." });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus({ type: null, msg: "" }), 6000);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 relative overflow-hidden transition-colors duration-1000 z-30 bg-background"
    >
      {/* MARCA D'ÁGUA PADRONIZADA */}
      <div className="absolute top-0 left-0 w-full flex justify-start overflow-hidden pointer-events-none select-none z-0">
        <motion.h2
          style={{ x: textX }}
          className="text-[15vw] font-black leading-none tracking-tighter uppercase opacity-[0.03] dark:opacity-[0.05] whitespace-nowrap text-foreground"
        >
          CONTATO
        </motion.h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-16 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                Disponível para Projetos
              </span>
            </div>

            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground">
              VAMOS TIRAR DO{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent italic">
                PAPEL_
              </span>
            </h2>
          </motion.div>

          {/* CARD DE CONTATO COM BORDA ANIMADA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative w-full group"
          >
            {/* Efeito de Borda Animada Adaptativa */}
            <div className="absolute -inset-[1px] rounded-[3rem] opacity-30 group-hover:opacity-100 transition duration-1000 overflow-hidden">
              <div className="absolute inset-[-1000%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary)_0%,transparent_50%,var(--primary)_100%)]" />
            </div>

            <div className="relative p-8 md:p-16 rounded-[3rem] backdrop-blur-3xl shadow-2xl z-20 bg-card/40 border border-border">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-10 text-left">
                  <div className="relative group/input">
                    <User className="absolute left-0 -top-6 w-4 h-4 opacity-40 group-focus-within/input:opacity-100 group-focus-within/input:text-primary transition-all" />
                    <Input
                      name="name"
                      placeholder="QUAL SEU NOME?"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="bg-transparent border-0 border-b border-border rounded-none focus-visible:ring-0 focus:border-primary text-xl font-bold uppercase tracking-widest h-14 transition-all"
                    />
                  </div>

                  <div className="relative group/input">
                    <Phone className="absolute left-0 -top-6 w-4 h-4 opacity-40 group-focus-within/input:opacity-100 group-focus-within/input:text-primary transition-all" />
                    <Input
                      name="phone"
                      placeholder="WHATSAPP"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: formatPhone(e.target.value),
                        })
                      }
                      className="bg-transparent border-0 border-b border-border rounded-none focus-visible:ring-0 focus:border-primary text-xl font-bold uppercase tracking-widest h-14 transition-all"
                    />
                  </div>
                </div>

                <div className="relative group/input text-left">
                  <Mail className="absolute left-0 -top-6 w-4 h-4 opacity-40 group-focus-within/input:opacity-100 group-focus-within/input:text-primary transition-all" />
                  <Input
                    name="email"
                    type="email"
                    placeholder="SEU MELHOR E-MAIL"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-transparent border-0 border-b border-border rounded-none focus-visible:ring-0 focus:border-primary text-xl font-bold uppercase tracking-widest h-14 transition-all"
                  />
                </div>

                <div className="relative group/input text-left">
                  <MessageSquare className="absolute left-0 -top-6 w-4 h-4 opacity-40 group-focus-within/input:opacity-100 group-focus-within/input:text-primary transition-all" />
                  <Textarea
                    name="message"
                    placeholder="FALE UM POUCO SOBRE O PROJETO..."
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="bg-transparent border-0 border-b border-border rounded-none focus-visible:ring-0 focus:border-primary text-xl font-bold uppercase tracking-widest min-h-[100px] resize-none overflow-hidden transition-all"
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    disabled={isSubmitting}
                    className="w-full h-24 rounded-full text-lg md:text-2xl font-black uppercase tracking-widest md:tracking-[0.3em] transition-all duration-500 relative overflow-hidden bg-foreground text-background hover:text-white group/btn"
                  >
                    <div className="absolute inset-0 w-0 group-hover/btn:w-full transition-all duration-700 bg-gradient-primary" />
                    <span className="relative z-10 flex items-center justify-center gap-4">
                      {isSubmitting
                        ? "ENVIANDO PROTOCOLO..."
                        : "INICIAR CONVERSA"}
                      <Send className="w-5 h-5 md:w-6 md:h-6" />
                    </span>
                  </Button>
                </motion.div>
              </form>

              <AnimatePresence>
                {status.type && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-10 p-6 rounded-2xl flex items-center justify-center gap-4 border-2 backdrop-blur-md
                      ${
                        status.type === "success"
                          ? "bg-primary/10 border-primary/50 text-primary"
                          : "bg-destructive/10 border-destructive/50 text-destructive"
                      }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle2 />
                    ) : (
                      <AlertCircle />
                    )}
                    <p className="font-black text-sm uppercase tracking-widest">
                      {status.msg}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* RODAPÉ DE CONTATO DIRETO */}
          <div className="mt-20 flex flex-col items-center gap-6">
            <p className="font-mono text-sm tracking-[0.3em] opacity-50 text-foreground uppercase font-bold">
              scudiero.dev@yahoo.com
            </p>
            <div className="h-20 w-[1px] bg-gradient-to-b from-primary to-transparent"></div>
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
