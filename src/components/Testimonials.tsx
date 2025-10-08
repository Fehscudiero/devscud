import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ricardo Oliveira",
      role: "CEO, TechFlow Solutions",
      content:
        "Felipe entregou nossa plataforma SaaS com qualidade excepcional. A comunicação foi sempre clara e as entregas pontuais. Recomendo fortemente.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ricardo",
    },
    {
      name: "Mariana Costa",
      role: "Head de Marketing, Digital Brands",
      content:
        "Profissional extremamente técnico e criativo. Desenvolveu nosso site institucional com foco em performance e conversão. Resultado superou expectativas.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana",
    },
    {
      name: "Carlos Ferreira",
      role: "Founder, StartUp Hub",
      content:
        "Trabalhar com Felipe foi uma experiência incrível. Ele não apenas codifica, mas entende o negócio e propõe soluções escaláveis e eficientes.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold">
              O que dizem <span className="text-gradient">sobre mim</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Depoimentos de clientes e parceiros de projetos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 space-y-4 group"
              >
                <Quote className="w-10 h-10 text-primary/30 group-hover:text-primary/50 transition-colors" />
                
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full bg-primary/10"
                  />
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
