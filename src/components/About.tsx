import { useEffect } from "react";
import { Code2, Sparkles, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import Eu from "../assets/eu.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true // garante que os efeitos se repitam ao rolar
    });
    AOS.refresh(); // força reprocessamento dos elementos
  }, []);

  const highlights = [
    {
      icon: Code2,
      title: "Tecnologias",
      description: "React, JavaScript, TypeScript, UI/UX Design",
    },
    {
      icon: Sparkles,
      title: "Criatividade",
      description: "Transformo ideias em experiências digitais únicas",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Código otimizado e interfaces responsivas",
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2
              className="text-4xl sm:text-5xl font-bold"
              data-aos="fade-down"
              data-aos-once="false"
            >
              Sobre <span className="text-gradient">Mim</span>
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-once="false"
            >
              Desenvolvedor apaixonado por tecnologia e inovação
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6" data-aos="fade-right" data-aos-once="false">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sou um desenvolvedor com foco em criar interfaces intuitivas
                e experiências digitais que fazem a diferença. Especializado em{" "}
                <span className="text-primary font-semibold">React</span>,{" "}
                <span className="text-primary font-semibold">JavaScript</span> e{" "}
                <span className="text-primary font-semibold">UI/UX</span>, combino
                criatividade com código limpo e performance.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Minha abordagem é centrada no usuário, sempre buscando equilibrar
                estética, funcionalidade e acessibilidade. Acredito que cada projeto
                é uma oportunidade de aprender, inovar e criar algo excepcional.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Quando não estou codificando, estou explorando novas tecnologias,
                estudando design patterns ou contribuindo para a comunidade dev.
              </p>
            </div>

            <div className="relative" data-aos="fade-left" data-aos-once="false">
              <div className="aspect-square rounded-2xl overflow-hidden border border-primary/30 glow-purple">
                <img
                  src={Eu}
                  alt="Felipe Scudiero"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div
            className="grid sm:grid-cols-3 gap-6 justify-center text-center"
            data-aos="zoom-in-up"
            data-aos-once="false"
          >
            {highlights.map((item, index) => (
              <Card
                key={index}
                className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:glow-purple group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
