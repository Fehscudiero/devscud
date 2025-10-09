import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

interface Props {
  id: string;
}

const CardParticles = ({ id }: Props) => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id={id}
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        particles: {
          number: { value: 20 },
          color: { value: ["#3C096C", "#5A189A", "#7B2CBF"] },
          shape: { type: "circle" },
          opacity: {
            value: { min: 0.3, max: 0.6 },
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
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default CardParticles;
