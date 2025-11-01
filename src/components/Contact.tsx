import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import InputMask from "react-input-mask";

const Contact = () => {
  const { toast } = useToast();

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });
    AOS.refresh();
  }, []);

  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => formDataToSend.append(key, value));
    formDataToSend.append("_captcha", "false");
    formDataToSend.append("_subject", "Novo contato via portfólio");

    const loadingToast = toast({
      title: "Enviando mensagem...",
      description: "Aguarde enquanto processamos seu contato.",
      duration: 10000,
      className: "bg-muted text-muted-foreground",
    });

    const timeout = new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), 8000)
    );

    try {
      const response = await Promise.race([
        fetch("https://formsubmit.co/scudiero.dev@yahoo.com", {
          method: "POST",
          body: formDataToSend,
        }),
        timeout,
      ]);

      loadingToast.dismiss();

      toast({
        title: response.ok ? "Mensagem enviada!" : "Erro ao enviar",
        description: response.ok
          ? "Obrigado pelo contato. Responderei em breve!"
          : "Não foi possível enviar sua mensagem. Tente novamente.",
        variant: response.ok ? undefined : "destructive",
        className: response.ok ? "bg-purple-600 text-white" : undefined,
      });

      if (response.ok) {
        setFormData({ name: "", phone: "", email: "", message: "" });
      }

    } catch (error) {
      loadingToast.dismiss();

      toast({
        title: "Erro inesperado",
        description: "Verifique sua conexão ou tente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="pb-6 pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold" data-aos="fade-down">
              Entre em  <span className="text-gradient">Contato</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto" data-aos="fade-up">
              Me conte sobre seu projeto. Estou aqui para transformar ideias em soluções digitais.
            </p>
          </div>

          <Card className="p-8 bg-card border-border" data-aos="fade-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { id: "name", label: "Nome", type: "text", placeholder: "Seu nome completo", maxLength: 100 },
                { id: "email", label: "Email", type: "email", placeholder: "seu.email@example.com", maxLength: 255 },
              ].map(({ id, label, ...props }) => (
                <div key={id} className="space-y-2">
                  <label htmlFor={id} className="text-sm font-medium">{label}</label>
                  <Input
                    id={id}
                    name={id}
                    value={formData[id as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    className="bg-background border-border focus-visible:ring-2 focus-visible:ring-primary"
                    {...props}
                  />
                </div>
              ))}

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">Celular</label>
                <InputMask
                  mask="(99) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                >
                  {(inputProps) => (
                    <Input
                      {...inputProps}
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(11) 98462-3116"
                      required
                      className="bg-background border-border focus-visible:ring-2 focus-visible:ring-primary"
                    />
                  )}
                </InputMask>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Mensagem</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Conte-me sobre seu projeto..."
                  required
                  maxLength={1000}
                  rows={5}
                  className="bg-background border-border focus-visible:ring-2 focus-visible:ring-primary resize-none"
                />
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground pb-3 mb-2">Responderei pessoalmente em até 24h!</p>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-36 bg-primary hover:bg-primary/90 glow-purple aura-button animated-gradient text-white font-semibold transition-all duration-300"
                >
                  {isSubmitting ? "Enviando..." : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>

              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
