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
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
    AOS.refresh();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/fehscudiero",
      color: "hover:text-primary",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/felipe-scudiero-5513261b3/",
      color: "hover:text-primary",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://www.instagram.com/scudiero.js/",
      color: "hover:text-primary",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:scudiero.dev@yahoo.com",
      color: "hover:text-primary",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("message", formData.message);
    formDataToSend.append("_captcha", "false");
    formDataToSend.append("_subject", "Novo contato via portfólio");

    try {
      const response = await fetch("https://formsubmit.co/scudiero.dev@yahoo.com", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        toast({
          title: "Mensagem enviada!",
          description: "Obrigado pelo contato. Responderei em breve!",
          className: "bg-purple-600 text-white",
        });

        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast({
          title: "Erro ao enviar",
          description: "Não foi possível enviar sua mensagem. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
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
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2
              className="text-4xl sm:text-5xl font-bold"
              data-aos="fade-down"
              data-aos-once="false"
            >
              Entre em <span className="text-gradient">Contato</span>
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-once="false"
            >
              Tem um projeto em mente? Vamos conversar!
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <Card
              className="lg:col-span-3 p-8 bg-card border-border"
              data-aos="fade-right"
              data-aos-once="false"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nome
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    required
                    maxLength={100}
                    className="bg-background border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu.email@example.com"
                    required
                    maxLength={255}
                    className="bg-background border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Celular
                  </label>
                  <InputMask
                    mask="(99) 99999-9999"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
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
                  <label htmlFor="message" className="text-sm font-medium">
                    Mensagem
                  </label>
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
                  {isSubmitting ? "Enviando..." : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </Card>

            <div className="lg:col-span-2 space-y-6">
              <Card
                className="p-8 bg-card border-border"
                data-aos="fade-left"
                data-aos-once="false"
              >
                <h3 className="text-xl font-semibold mb-6">Redes Sociais</h3>
                <div className="space-y-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 text-muted-foreground ${link.color} transition-colors group`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <link.icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium">{link.label}</span>
                    </a>
                  ))}
                </div>
              </Card>

              <Card
                className="p-8 bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/30"
                data-aos="zoom-in-up"
                data-aos-once="false"
              >
                <h3 className="text-xl font-semibold mb-3">
                  Vamos trabalhar juntos?
                </h3>
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
