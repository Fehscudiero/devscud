import { Code2 } from "lucide-react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";

const Footer = () => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <footer className="relative border-t border-border bg-background/50 backdrop-blur-sm overflow-hidden">
      {/* Partículas no fundo */}
      <Particles
        id="footerParticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 20 },
            color: { value: ["#ff007f", "#00ffff", "#ffff00"] },
            shape: { type: "circle" },
            opacity: { value: 0.15 },
            size: {
              value: 2,
              random: { enable: true, minimumValue: 1 },
            },
            move: {
              enable: true,
              speed: 0.5,
              direction: "none",
              outModes: { default: "out" },
            },

            // 🔗 LINHAS ENTRE PARTÍCULAS
            links: {
              enable: true,
              distance: 100,
              color: "#ffffff",
              opacity: 0.1,
              width: 1,
            },
          },
          interactivity: {
            events: {
              onHover: { enable: false },
              onClick: { enable: false },
            },
          },
          retina_detect: true,
        }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />



      {/* Conteúdo do footer */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            <span className="font-semibold">Felipe Scudiero</span>
          </div>

          <p className="text-sm text-muted-foreground text-center sm:text-left">
            {new Date().getFullYear()} Felipe Scudiero | Todos os direitos reservados. ©
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
