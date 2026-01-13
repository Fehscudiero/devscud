import { useState, useEffect, useCallback } from "react";
import { Menu, X, ArrowUp, Moon, Sun, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- CUSTOM HOOK PARA TEMA ---
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

// --- COMPONENTE LOGO ---
const Logo = () => {
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
          <path
            d="M12 20L4 12L12 4"
            stroke="currentColor"
            className="text-foreground"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28 20L36 28L28 36"
            stroke="currentColor"
            className="text-foreground"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 4L18 36"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="flex flex-col justify-center text-left">
        <span className="text-xl font-black tracking-tighter leading-none uppercase text-foreground">
          DEV
          <span className="text-primary ml-1 italic">SCUD</span>
        </span>
        <span className="text-[8px] uppercase tracking-[0.3em] font-bold opacity-60 text-foreground">
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
  const { setTheme, theme } = useTheme();

  const [availabilityStatus, setAvailabilityStatus] = useState({
    status: "LENTA",
    color: "text-destructive",
  });

  const navItems = [
    { id: "home", label: "Início" },
    { id: "servicos", label: "Serviços" },
    { id: "technologies", label: "Stack" },
    { id: "projects", label: "Projetos" },
    { id: "contact", label: "Contato" },
  ];

  const checkSLA = useCallback(() => {
    const now = new Date();
    const isWorking =
      now.getDay() >= 1 &&
      now.getDay() <= 5 &&
      now.getHours() >= 8 &&
      now.getHours() < 17;
    setAvailabilityStatus(
      isWorking
        ? { status: "ONLINE", color: "text-emerald-500" }
        : { status: "OFFLINE", color: "text-destructive" }
    );
  }, []);

  useEffect(() => {
    checkSLA();
    const interval = setInterval(checkSLA, 60000);
    return () => clearInterval(interval);
  }, [checkSLA]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 500);

      const scrollPosition = window.scrollY + 120;

      navItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) {
          const offsetTop = el.offsetTop;
          const height = el.offsetHeight;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + height
          ) {
            setActiveSection(item.id);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  // FUNÇÃO DE SCROLL CORRIGIDA
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 backdrop-blur-md border-b 
        ${
          scrolled
            ? "bg-background/80 border-border shadow-2xl"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-[150px] h-full bg-primary shadow-[0_0_15px_var(--primary)]"
          />
        </div>

        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => scrollToSection("home")}
              className="hover:opacity-80 transition-all active:scale-95"
            >
              <Logo />
            </button>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center bg-foreground/5 border border-border/50 rounded-full px-2 py-1 backdrop-blur-sm">
              <ul className="flex items-center gap-1">
                {navItems.map(({ id, label }) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollToSection(id)}
                      className={`text-[11px] font-black uppercase tracking-wider px-4 py-2 rounded-full transition-all relative group
                        ${
                          activeSection === id
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      <span className="relative z-10">{label}</span>
                      {activeSection === id && (
                        <motion.div
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-full border border-primary/50 bg-primary/5"
                        />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-4">
              <div
                className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/40 text-[9px] font-bold font-mono tracking-tighter ${availabilityStatus.color}`}
              >
                <div className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current"></span>
                </div>
                SLA: {availabilityStatus.status}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="p-2 rounded-xl border border-border bg-card/50 text-primary transition-all hover:scale-110 active:scale-90"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE MENU CORRIGIDO */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl"
            >
              <div className="flex flex-col p-6 gap-2">
                {navItems.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`text-left text-sm font-black uppercase tracking-[0.2em] py-5 border-b border-border/50 transition-colors w-full
                      ${
                        activeSection === id
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                  >
                    {label}
                  </button>
                ))}

                <div
                  className={`flex items-center justify-between p-4 rounded-xl border border-border mt-4 bg-card/50 ${availabilityStatus.color}`}
                >
                  <div className="flex items-center gap-2">
                    <Terminal size={14} className="opacity-70" />
                    <span className="text-[10px] font-mono text-muted-foreground">
                      SYSTEM_STATUS
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase">
                    {availabilityStatus.status}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* VOLTAR AO TOPO */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-10 right-6 z-[90] p-4 rounded-2xl border border-primary/50 bg-background/80 text-primary shadow-2xl shadow-primary/20"
      >
        <ArrowUp size={20} />
      </motion.button>
    </>
  );
};

export default Navigation;
