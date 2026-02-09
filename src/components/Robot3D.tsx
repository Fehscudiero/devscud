import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const Robot3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileHint, setShowMobileHint] = useState(true);
  const [touchEffect, setTouchEffect] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configuração do canvas
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Detectar se é mobile
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    setIsMobile(isMobileDevice);
    
    // Esconde hint após 5 segundos
    if (isMobileDevice) {
      setTimeout(() => setShowMobileHint(false), 5000);
    }

    // Estado do robô - DECLARAR TODAS AS VARIÁVEIS PRIMEIRO
    let mouseX = 0;
    let mouseY = 0;
    let eyeX = 0;
    let eyeY = 0;
    let headRotation = 0;
    let targetHeadRotation = 0;
    let time = 0;

    // Detectar se é mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;

    // Rastreamento do mouse - DESKTOP
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return; // Ignora no mobile
      
      const rect = canvas.getBoundingClientRect();
      const canvasCenterX = rect.left + rect.width / 2;
      const canvasCenterY = rect.top + rect.height / 2;
      
      mouseX = ((e.clientX - canvasCenterX) / (window.innerWidth / 2)) * 1.5;
      mouseY = ((e.clientY - canvasCenterY) / (window.innerHeight / 2)) * 1.5;
      
      mouseX = Math.max(-1.5, Math.min(1.5, mouseX));
      mouseY = Math.max(-1.5, Math.min(1.5, mouseY));
      
      targetHeadRotation = mouseX * 0.4;
    };

    // Rastreamento GIROSCÓPIO - MOBILE
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (!isMobile) return;
      
      // Beta: inclinação frente/trás (-180 a 180)
      // Gamma: inclinação esquerda/direita (-90 a 90)
      const beta = e.beta || 0;  // Frente/trás
      const gamma = e.gamma || 0; // Esquerda/direita
      
      // Normaliza para -1 a 1
      mouseX = Math.max(-1.5, Math.min(1.5, gamma / 30)); // Divide por 30 para suavizar
      mouseY = Math.max(-1.5, Math.min(1.5, (beta - 90) / 30)); // Beta centrado em 90
      
      targetHeadRotation = mouseX * 0.4;
    };

    // Rastreamento por TOQUE - MOBILE (fallback)
    const handleTouch = (e: TouchEvent) => {
      if (!isMobileDevice) return;
      
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const canvasCenterX = rect.left + rect.width / 2;
      const canvasCenterY = rect.top + rect.height / 2;
      
      mouseX = ((touch.clientX - canvasCenterX) / rect.width) * 2;
      mouseY = ((touch.clientY - canvasCenterY) / rect.height) * 2;
      
      mouseX = Math.max(-1.5, Math.min(1.5, mouseX));
      mouseY = Math.max(-1.5, Math.min(1.5, mouseY));
      
      targetHeadRotation = mouseX * 0.4;
      
      // Esconde hint no primeiro toque
      setShowMobileHint(false);
      
      // Mostra efeito visual no ponto de toque
      const touchX = touch.clientX - rect.left;
      const touchY = touch.clientY - rect.top;
      setTouchEffect({ x: touchX, y: touchY });
      setTimeout(() => setTouchEffect(null), 600);
    };

    // SETUP DOS EVENTOS
    if (isMobile) {
      // Tenta usar giroscópio primeiro
      if (typeof DeviceOrientationEvent !== 'undefined') {
        // Verifica se precisa de permissão (iOS 13+)
        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
          // iOS precisa de interação do usuário primeiro
          // Vamos adicionar um listener de toque que pede permissão
          const requestPermission = async () => {
            try {
              const permission = await (DeviceOrientationEvent as any).requestPermission();
              if (permission === 'granted') {
                window.addEventListener('deviceorientation', handleOrientation as EventListener);
              } else {
                // Fallback para toque se permissão negada
                canvas.addEventListener('touchmove', handleTouch as EventListener);
              }
            } catch (error) {
              canvas.addEventListener('touchmove', handleTouch as EventListener);
            }
          };
          
          // Espera primeiro toque para pedir permissão
          canvas.addEventListener('touchstart', requestPermission, { once: true });
        } else {
          // Android e navegadores que não precisam de permissão
          window.addEventListener('deviceorientation', handleOrientation as EventListener);
        }
      } else {
        // Fallback para toque se não tem giroscópio
        canvas.addEventListener('touchmove', handleTouch as EventListener);
      }
      
      // Sempre permite toque como alternativa
      canvas.addEventListener('touchstart', handleTouch as EventListener);
    } else {
      // Desktop - rastreia mouse
      window.addEventListener("mousemove", handleMouseMove);
    }

    // Animação
    const animate = () => {
      time += 0.01;

      // Suavização do movimento - com range aumentado
      eyeX += (mouseX * 20 - eyeX) * 0.12; // Aumentado de 15 para 20
      eyeY += (mouseY * 20 - eyeY) * 0.12; // Aumentado de 15 para 20
      headRotation += (targetHeadRotation - headRotation) * 0.08;

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const centerX = w / 2;
      const centerY = h / 2 - 20; // Ajustado para centralizar melhor

      // Limpar canvas
      ctx.clearRect(0, 0, w, h);

      // Background gradient sutil
      const bgGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.max(w, h) / 2
      );
      bgGradient.addColorStop(0, "rgba(139, 92, 246, 0.03)");
      bgGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.translate(centerX, centerY);

      // Corpo principal do robô
      const bodyScale = Math.min(w, h) / 320; // Aumentado de 400 para 320 = robô 25% maior

      // Sombra
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.beginPath();
      ctx.ellipse(0, 160 * bodyScale, 100 * bodyScale, 20 * bodyScale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Corpo
      ctx.save();
      ctx.rotate(headRotation * 0.2);

      // Torso - forma trapezoidal moderna
      const gradient = ctx.createLinearGradient(
        0,
        -50 * bodyScale,
        0,
        150 * bodyScale
      );
      gradient.addColorStop(0, "rgba(139, 92, 246, 0.9)");
      gradient.addColorStop(0.5, "rgba(109, 40, 217, 1)");
      gradient.addColorStop(1, "rgba(88, 28, 135, 0.95)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(-60 * bodyScale, 30 * bodyScale);
      ctx.lineTo(60 * bodyScale, 30 * bodyScale);
      ctx.lineTo(70 * bodyScale, 130 * bodyScale);
      ctx.lineTo(-70 * bodyScale, 130 * bodyScale);
      ctx.closePath();
      ctx.fill();

      // Borda do torso
      ctx.strokeStyle = "rgba(167, 139, 250, 0.6)";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Detalhes do peito - linha central
      ctx.strokeStyle = "rgba(216, 180, 254, 0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 40 * bodyScale);
      ctx.lineTo(0, 120 * bodyScale);
      ctx.stroke();

      // Indicadores luminosos no peito
      const indicators = [
        { x: -25, y: 70, active: time % 2 < 1 },
        { x: 0, y: 65, active: true },
        { x: 25, y: 70, active: (time + 1) % 2 < 1 },
      ];

      indicators.forEach((ind) => {
        const lightGlow = ctx.createRadialGradient(
          ind.x * bodyScale,
          ind.y * bodyScale,
          0,
          ind.x * bodyScale,
          ind.y * bodyScale,
          8 * bodyScale
        );
        lightGlow.addColorStop(
          0,
          ind.active ? "rgba(167, 139, 250, 1)" : "rgba(139, 92, 246, 0.3)"
        );
        lightGlow.addColorStop(1, "rgba(139, 92, 246, 0)");
        ctx.fillStyle = lightGlow;
        ctx.beginPath();
        ctx.arc(
          ind.x * bodyScale,
          ind.y * bodyScale,
          6 * bodyScale,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      ctx.restore();

      // Cabeça
      ctx.save();
      ctx.rotate(headRotation);
      ctx.translate(0, -20 * bodyScale);

      // Cabeça - formato hexagonal moderno
      const headGradient = ctx.createLinearGradient(
        0,
        -70 * bodyScale,
        0,
        30 * bodyScale
      );
      headGradient.addColorStop(0, "rgba(167, 139, 250, 1)");
      headGradient.addColorStop(0.6, "rgba(139, 92, 246, 1)");
      headGradient.addColorStop(1, "rgba(109, 40, 217, 0.95)");

      ctx.fillStyle = headGradient;
      ctx.beginPath();
      
      // Hexágono
      const headSize = 55 * bodyScale;
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const x = Math.cos(angle) * headSize;
        const y = Math.sin(angle) * headSize - 20 * bodyScale;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "rgba(216, 180, 254, 0.6)";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Visor - tela frontal
      ctx.fillStyle = "rgba(17, 24, 39, 0.9)";
      ctx.beginPath();
      ctx.roundRect(
        -40 * bodyScale,
        -50 * bodyScale,
        80 * bodyScale,
        40 * bodyScale,
        10 * bodyScale
      );
      ctx.fill();

      ctx.strokeStyle = "rgba(139, 92, 246, 0.5)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Olhos que seguem o mouse
      const eyeSpacing = 25 * bodyScale;
      const eyeBaseY = -30 * bodyScale; // Renomeado para evitar conflito

      // Olho esquerdo
      const leftEyeGlow = ctx.createRadialGradient(
        -eyeSpacing + eyeX * bodyScale,
        eyeBaseY + eyeY * bodyScale,
        0,
        -eyeSpacing + eyeX * bodyScale,
        eyeBaseY + eyeY * bodyScale,
        12 * bodyScale
      );
      leftEyeGlow.addColorStop(0, "rgba(34, 211, 238, 1)");
      leftEyeGlow.addColorStop(0.5, "rgba(6, 182, 212, 0.8)");
      leftEyeGlow.addColorStop(1, "rgba(6, 182, 212, 0)");

      ctx.fillStyle = leftEyeGlow;
      ctx.beginPath();
      ctx.arc(
        -eyeSpacing + eyeX * bodyScale,
        eyeBaseY + eyeY * bodyScale,
        10 * bodyScale,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Pupila esquerda
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.beginPath();
      ctx.arc(
        -eyeSpacing + eyeX * bodyScale,
        eyeBaseY + eyeY * bodyScale,
        4 * bodyScale,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Olho direito
      const rightEyeGlow = ctx.createRadialGradient(
        eyeSpacing + eyeX * bodyScale,
        eyeBaseY + eyeY * bodyScale,
        0,
        eyeSpacing + eyeX * bodyScale,
        eyeBaseY + eyeY * bodyScale,
        12 * bodyScale
      );
      rightEyeGlow.addColorStop(0, "rgba(34, 211, 238, 1)");
      rightEyeGlow.addColorStop(0.5, "rgba(6, 182, 212, 0.8)");
      rightEyeGlow.addColorStop(1, "rgba(6, 182, 212, 0)");

      ctx.fillStyle = rightEyeGlow;
      ctx.beginPath();
      ctx.arc(
        eyeSpacing + eyeX * bodyScale,
        eyeBaseY + eyeY * bodyScale,
        10 * bodyScale,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Pupila direita
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.beginPath();
      ctx.arc(
        eyeSpacing + eyeX * bodyScale,
        eyeBaseY + eyeY * bodyScale,
        4 * bodyScale,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Antena
      ctx.strokeStyle = "rgba(139, 92, 246, 0.8)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -65 * bodyScale);
      ctx.lineTo(
        Math.sin(time * 2) * 5 * bodyScale,
        -85 * bodyScale
      );
      ctx.stroke();

      // Luz da antena
      const antennaGlow = ctx.createRadialGradient(
        Math.sin(time * 2) * 5 * bodyScale,
        -85 * bodyScale,
        0,
        Math.sin(time * 2) * 5 * bodyScale,
        -85 * bodyScale,
        8 * bodyScale
      );
      antennaGlow.addColorStop(0, "rgba(244, 114, 182, 1)");
      antennaGlow.addColorStop(1, "rgba(244, 114, 182, 0)");
      ctx.fillStyle = antennaGlow;
      ctx.beginPath();
      ctx.arc(
        Math.sin(time * 2) * 5 * bodyScale,
        -85 * bodyScale,
        5 * bodyScale,
        0,
        Math.PI * 2
      );
      ctx.fill();

      ctx.restore();

      // Braços
      const armBounce = Math.sin(time * 1.5) * 3;

      // Braço esquerdo
      ctx.save();
      ctx.translate(-75 * bodyScale, 60 * bodyScale + armBounce * bodyScale);
      ctx.rotate(-0.2);

      ctx.fillStyle = "rgba(109, 40, 217, 0.9)";
      ctx.beginPath();
      ctx.roundRect(
        -8 * bodyScale,
        0,
        16 * bodyScale,
        50 * bodyScale,
        8 * bodyScale
      );
      ctx.fill();

      ctx.strokeStyle = "rgba(167, 139, 250, 0.5)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Mão esquerda
      ctx.fillStyle = "rgba(139, 92, 246, 1)";
      ctx.beginPath();
      ctx.arc(0, 55 * bodyScale, 12 * bodyScale, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Braço direito
      ctx.save();
      ctx.translate(75 * bodyScale, 60 * bodyScale - armBounce * bodyScale);
      ctx.rotate(0.2);

      ctx.fillStyle = "rgba(109, 40, 217, 0.9)";
      ctx.beginPath();
      ctx.roundRect(
        -8 * bodyScale,
        0,
        16 * bodyScale,
        50 * bodyScale,
        8 * bodyScale
      );
      ctx.fill();

      ctx.strokeStyle = "rgba(167, 139, 250, 0.5)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Mão direita
      ctx.fillStyle = "rgba(139, 92, 246, 1)";
      ctx.beginPath();
      ctx.arc(0, 55 * bodyScale, 12 * bodyScale, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      ctx.restore();

      requestAnimationFrame(animate);
    };

    setIsLoaded(true);
    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener('deviceorientation', handleOrientation as EventListener);
      canvas.removeEventListener('touchmove', handleTouch as EventListener);
      canvas.removeEventListener('touchstart', handleTouch as EventListener);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-full"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
        style={{ display: "block" }}
      />
      
      {/* Hint para Mobile - Instruções Interativas */}
      {isMobile && showMobileHint && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <div className="bg-background/95 backdrop-blur-md border-2 border-primary/30 rounded-2xl p-6 mx-4 shadow-2xl max-w-[280px]">
            {/* Ícone animado */}
            <motion.div
              animate={{
                rotateY: [0, 15, -15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-6xl text-center mb-3"
            >
              📱
            </motion.div>
            
            {/* Texto */}
            <div className="text-center space-y-2">
              <p className="text-sm font-bold text-primary uppercase tracking-wider">
                Interaja comigo!
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="text-foreground font-semibold">Incline o celular</span> ou{" "}
                <span className="text-foreground font-semibold">toque na tela</span>
              </p>
            </div>

            {/* Indicador de movimento */}
            <motion.div
              animate={{
                x: [-10, 10, -10],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mt-4 flex justify-center"
            >
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-primary/60"></div>
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="w-2 h-2 rounded-full bg-primary/60"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Efeito de Toque - Ripple */}
      {touchEffect && (
        <motion.div
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute pointer-events-none z-20"
          style={{
            left: touchEffect.x,
            top: touchEffect.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-20 h-20 rounded-full border-4 border-primary/60 shadow-lg shadow-primary/20"></div>
        </motion.div>
      )}
      
      {/* Partículas flutuantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Robot3D;
