import { Code2, Github, Linkedin, Instagram, Mail } from "lucide-react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/fehscudiero" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/devscud/" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/scudiero.js/" },
  { icon: Mail, label: "Email", href: "mailto:scudiero.dev@yahoo.com" },
];

const Footer = () => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <footer className="relative border-t border-border bg-background/50 backdrop-blur-sm">
      {/* Partículas no fundo */}
      <Particles
        id="footerParticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 40 },
            color: { value: ["#3C096C", "#5A189A", "#7B2CBF"] },
            shape: { type: "circle" },
            opacity: {
              value: 0.5,
              random: { enable: true, minimumValue: 0.2 },
              animation: { enable: true, speed: 0.3, sync: false },
            },
            size: {
              value: { min: 1, max: 3 },
              animation: { enable: true, speed: 1, sync: false },
            },
            move: {
              enable: true,
              speed: 0.6,
              direction: "none",
              outModes: { default: "out" },
              random: true,
              straight: false,
            },
            links: { enable: false },
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
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          maxHeight: "100%",
        }}
      />

      {/* Conteúdo do footer */}
      <div className="relative z-10 container mx-auto sm:px-6 lg:px-8 py-1" >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          {/* Nome e ícone */}
          <div className="flex items-center gap-1">
            <Code2 className="h-5 w-5 text-primary" />
            <span className="font-semibold">Felipe Scudiero</span>
          </div>

          {/* Texto legal */}
          <p className="text-sm text-muted-foreground">
            © 2025 Felipe Scudiero — Todos os direitos reservados.
          </p>

          {/* Ícones sociais */}
          <div className="flex gap-2">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="transition transform hover:scale-110 hover:text-purple-500 text-purple-600"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
