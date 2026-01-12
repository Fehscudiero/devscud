import { useState, useEffect, useCallback, useMemo } from "react";
import { Menu, X, ArrowUp, Moon, Sun, Terminal, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- CUSTOM HOOK PARA TEMA (Sincronizado com o sistema) ---
const useTheme = () => {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("vite-ui-theme") || "dark";
    }
    return "dark";
  });

  const setTheme = (newTheme: string) => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(newTheme);
    setThemeState(newTheme);
    localStorage.setItem("vite-ui-theme", newTheme);
  };

  return { theme, setTheme };
};

// --- COMPONENTE LOGO (Identidade Visual Scudiero) ---
const Logo = ({ isDarkTheme }: { isDarkTheme: boolean }) => {
  const textColor = isDarkTheme ? "#ffffff" : "#0f172a";
  const colorStart = isDarkTheme ? "#9333ea" : "#059669"; // Roxo (Dark) ou Esmeralda (Light)
  const colorEnd = isDarkTheme ? "#2563eb" : "#0d9488"; // Azul (Dark) ou Teal (Light)

  return (
    <div className="flex items-center gap-2 font-sans select-none">
      <div className="relative">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          className="transition-transform duration-500 hover:rotate-180"
        >
          <defs>
            <linearGradient
              id="logoGradNav"
              x1="0"
              y1="0"
              x2="40"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={colorStart} />
              <stop offset="100%" stopColor={colorEnd} />
            </linearGradient>
          </defs>
          <path
            d="M12 20L4 12L12 4"
            stroke="url(#logoGradNav)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28 20L36 28L28 36"
            stroke="url(#logoGradNav)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 4L18 36"
            stroke={textColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeOpacity="0.5"
          />
        </svg>
      </div>
      <div className="flex flex-col justify-center">
        <span
          className="text-xl font-black tracking-tighter leading-none"
          style={{ color: textColor }}
        >
          DEV
          <span
            style={{
              backgroundImage: `linear-gradient(to right, ${colorStart}, ${colorEnd})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SCUD
          </span>
        </span>
        <span
          className="text-[8px] uppercase tracking-[0.3em] font-bold opacity-50"
          style={{ color: textColor }}
        >
          SYSTEMS v4.0
        </span>
      </div>
    </div>
  );
};

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const { setTheme, theme } = useTheme();

  // --- LOGICA DE SLA (Sincronizada com o horário comercial) ---
  const [availabilityStatus, setAvailabilityStatus] = useState({
    status: "LENTA",
    color: "red",
  });

  const checkSLA = useCallback(() => {
    const now = new Date();
    const isWorking =
      now.getDay() >= 1 &&
      now.getDay() <= 5 &&
      now.getHours() >= 8 &&
      now.getHours() < 17;
    setAvailabilityStatus(
      isWorking
        ? { status: "ONLINE", color: "green" }
        : { status: "OFFLINE", color: "red" }
    );
  }, []);

  useEffect(() => {
    checkSLA();
    const interval = setInterval(checkSLA, 60000);
    const checkTheme = () =>
      setIsDarkTheme(document.documentElement.classList.contains("dark"));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [checkSLA]);

  const navItems = [
    { id: "home", label: "Início" },
    { id: "servicos", label: "Serviços" },
    { id: "technologies", label: "Stack" },
    { id: "projects", label: "Projetos" },
    { id: "contact", label: "Contato" },
  ];

  // --- INTERSECTION OBSERVER PARA SCROLL ---
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 500);
      const scrollPosition = window.scrollY + 100;

      navItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (
          el &&
          scrollPosition >= el.offsetTop &&
          scrollPosition < el.offsetTop + el.offsetHeight
        ) {
          setActiveSection(item.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const isAvailable = availabilityStatus.color === "green";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 backdrop-blur-md 
        ${
          scrolled
            ? isDarkTheme
              ? "bg-[#030014]/80 border-b border-white/10 shadow-2xl"
              : "bg-white/90 border-b border-slate-200 shadow-lg"
            : "bg-transparent border-transparent"
        }`}
      >
        {/* LASER LINE ANIMATION (Top Bar) */}
        <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className={`w-[150px] h-full shadow-[0_0_15px] ${
              isDarkTheme
                ? "bg-cyan-400 shadow-cyan-400"
                : "bg-emerald-500 shadow-emerald-500"
            }`}
          />
        </div>

        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* LADO ESQUERDO: LOGO */}
            <button
              onClick={() => scrollToSection("home")}
              className="hover:opacity-80 transition-all active:scale-95"
            >
              <Logo isDarkTheme={isDarkTheme} />
            </button>

            {/* CENTRO: DESKTOP NAV */}
            <div className="hidden md:flex items-center bg-white/5 border border-white/5 rounded-full px-2 py-1 backdrop-blur-sm">
              <ul className="flex items-center gap-1">
                {navItems.map(({ id, label }) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollToSection(id)}
                      className={`text-[11px] font-black uppercase tracking-wider px-4 py-2 rounded-full transition-all relative group
                        ${
                          activeSection === id
                            ? isDarkTheme
                              ? "text-cyan-400"
                              : "text-emerald-600"
                            : isDarkTheme
                            ? "text-slate-400 hover:text-white"
                            : "text-slate-600 hover:text-black"
                        }`}
                    >
                      {label}
                      {activeSection === id && (
                        <motion.div
                          layoutId="nav-active-pill"
                          className={`absolute inset-0 rounded-full border ${
                            isDarkTheme
                              ? "border-cyan-500/50 bg-cyan-500/5"
                              : "border-emerald-500/50 bg-emerald-500/5"
                          }`}
                        />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* LADO DIREITO: STATUS & TOGGLE */}
            <div className="flex items-center gap-4">
              <div
                className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors duration-500 text-[9px] font-bold font-mono tracking-tighter
                ${
                  isAvailable
                    ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-500"
                    : "border-red-500/30 bg-red-500/5 text-red-500"
                }`}
              >
                <div className="relative flex h-1.5 w-1.5">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isAvailable ? "bg-emerald-400" : "bg-red-400"
                    }`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                      isAvailable ? "bg-emerald-500" : "bg-red-500"
                    }`}
                  ></span>
                </div>
                SLA: {availabilityStatus.status}
              </div>

              <div className="h-4 w-[1px] bg-white/10 hidden md:block" />

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className={`p-2 rounded-xl border transition-all hover:scale-110 active:scale-90 ${
                    isDarkTheme
                      ? "border-white/5 bg-white/5 text-yellow-400"
                      : "border-black/5 bg-black/5 text-indigo-600"
                  }`}
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={`md:hidden overflow-hidden border-b ${
                isDarkTheme
                  ? "bg-[#030014]/95 border-white/10"
                  : "bg-white/95 border-slate-200"
              }`}
            >
              <div className="flex flex-col p-6 gap-2">
                {navItems.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`text-left text-sm font-black uppercase tracking-[0.2em] py-4 border-b border-white/5 transition-colors
                      ${
                        activeSection === id
                          ? isDarkTheme
                            ? "text-cyan-400"
                            : "text-emerald-600"
                          : "text-slate-500"
                      }`}
                  >
                    {label}
                  </button>
                ))}

                <div
                  className={`flex items-center justify-between p-4 rounded-xl border mt-4 ${
                    isAvailable
                      ? "border-emerald-500/20 bg-emerald-500/5"
                      : "border-red-500/20 bg-red-500/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Terminal
                      size={14}
                      className={
                        isAvailable ? "text-emerald-500" : "text-red-500"
                      }
                    />
                    <span className="text-[10px] font-mono text-slate-400">
                      SYSTEM_STATUS
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold ${
                      isAvailable ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    {availabilityStatus.status}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* BOTÃO SCROLL TO TOP */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-14 right-6 md:bottom-24 md:right-10 z-[90] p-4 rounded-2xl border shadow-2xl group transition-all
          ${
            isDarkTheme
              ? "bg-[#030014]/80 border-cyan-500/50 text-cyan-400 shadow-cyan-400/20"
              : "bg-white/80 border-emerald-500/50 text-emerald-600 shadow-emerald-500/20"
          }`}
      >
        <ArrowUp
          size={20}
          className="group-hover:-translate-y-1 transition-transform"
        />

        {/* Efeito visual de scanner no botão (opcional, para combinar com o tema) */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <motion.div
            animate={{ top: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute w-full h-[2px] bg-cyan-400/30 blur-sm"
          />
        </div>
      </motion.button>
    </>
  );
};

export default Navigation;
