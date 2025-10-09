import { useEffect } from "react";
import {
  Globe,
  Gauge,
  Settings,
  LifeBuoy,
  Search,
  ShoppingCart,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const services = [
  {
    icon: Globe,
    title: "Criação de Websites",
    description:
      "Aumento suas taxas de detecção, proporcionando uma experiência excepcional para seus clientes.",
  },
  {
    icon: Gauge,
    title: "Otimização de Sites",
    description:
      "Melhoro o tempo de resposta do seu site nas ferramentas de busca, garantindo uma navegação mais inteligente e qualificada.",
  },
  {
    icon: Settings,
    title: "Customização Avançada",
    description:
      "Crio soluções sob medida que atendem às necessidades específicas do seu negócio.",
  },
  {
    icon: LifeBuoy,
    title: "Suporte Personalizado",
    description:
      "Ofereço assistência técnica especializada para garantir o funcionamento contínuo e seguro do seu site.",
  },
  {
    icon: Search,
    title: "Otimização para SEO",
    description:
      "Aumento a visibilidade do seu site nos mecanismos de busca, atraindo mais visitantes qualificados.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description:
      "Crio soluções personalizadas de comércio eletrônico para expandir seu alcance e aumentar suas vendas.",
  },
];

const Servicos = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
    AOS.refresh();
  }, []);

  const effects = ["fade-up", "fade-down", "zoom-in", "flip-up", "fade-right", "fade-left"];

  return (
    <section className="py-20 bg-secondary/30" id="servicos">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="max-w-4xl mx-auto text-center mb-16 space-y-4"
          data-aos="fade-down"
          data-aos-once="false"
        >
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            SOLUÇÕES COMPLETAS PARA{" "}
            <span className="text-gradient">IMPULSIONAR SEU SUCESSO DIGITAL</span>
          </h2>
          <p
            className="text-lg text-muted-foreground"
            data-aos="fade-up"
            data-aos-once="false"
          >
            Serviços completos para impulsionar o seu negócio.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            const effect = effects[index % effects.length];

            return (
              <div
                key={index}
                data-aos={effect}
                data-aos-once="false"
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group space-y-4 text-center"
              >
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Servicos;
