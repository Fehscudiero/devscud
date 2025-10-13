import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Instagram, Mail, Send } from "lucide-react";
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

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/fehscudiero" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/devscud/" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/scudiero.js/" },
    { icon: Mail, label: "Email", href: "mailto:scudiero.dev@yahoo.com" },
  ];

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

    // Toast de carregamento imediato
    const loadingToast = toast({
      title: "Enviando mensagem...",
      description: "Aguarde enquanto processamos seu contato.",
      duration: 10000,
      className: "bg-muted text-muted-foreground",
    });

    // Timeout de segurança
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

      loadingToast.dismiss(); // ✅ agora corretamente acessando o método do objeto retornado

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
    <section id="contact" className="py-6 pb-1">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold" data-aos="fade-down">
              Meu <span className="text-gradient">Contato</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-aos="fade-up">
              Tem um projeto em mente? Vamos conversar!
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <Card className="lg:col-span-3 p-8 bg-card border-border" data-aos="fade-right">
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
                      className="bg-background border-border focus:border-primary"
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
                        className="bg-background border-border focus:border-primary"
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
                    className="bg-background border-border focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 glow-purple transition-all duration-300"
                >
                  {isSubmitting ? "Enviando..." : <><Send className="w-4 h-4 mr-2" />Enviar Mensagem</>}
                </Button>
              </form>
            </Card>

            <div className="lg:col-span-2 space-y-6">
              <Card className="p-8 bg-card border-border" data-aos="fade-left">
                <h3 className="text-xl font-semibold mb-6">Redes Sociais</h3>
                <div className="space-y-4">
                  {socialLinks.map(({ icon: Icon, label, href }, index) => (
                    <a
                      key={index}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium">{label}</span>
                    </a>
                  ))}
                </div>
              </Card>

              <Card className="p-10 bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/30" data-aos="zoom-in-up">
                <h3 className="text-xl font-semibold mb-3">Vamos trabalhar juntos?</h3>
                <p className="text-sm text-muted-foreground">
                  Aberto a colaborações que impulsionem resultados reais. Se você busca soluções digitais com impacto nos negócios, vamos conversar e construir algo de valor.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
