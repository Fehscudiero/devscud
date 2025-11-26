import { useState, useEffect } from "react";
import { Menu, X, ArrowUp, Moon, Sun } from "lucide-react";

// --- MOCK THEME PROVIDER ---
// import { useTheme } from "./theme-provider";

const useTheme = () => {
  const [theme, setThemeState] = useState("dark");

  const setTheme = (newTheme: string) => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(newTheme);
    setThemeState(newTheme);
    localStorage.setItem("vite-ui-theme", newTheme);
  };

  return { theme, setTheme };
};

// --- COMPONENTE LOGO (CORRIGIDO O BUG DO QUADRADO) ---
const Logo = ({ isDarkTheme }: { isDarkTheme: boolean }) => {
  const textColor = isDarkTheme ? "#ffffff" : "#0f172a";
  const gradientId = "logoGradientNav";
  const colorStart = isDarkTheme ? "#9333ea" : "#059669";
  const colorEnd = isDarkTheme ? "#2563eb" : "#0d9488";

  return (
    <div className="flex items-center gap-2 font-sans select-none">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 hover:rotate-180"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={colorStart} />
            <stop offset="100%" stopColor={colorEnd} />
          </linearGradient>
        </defs>
        <path
          d="M12 20L4 12L12 4"
          stroke={`url(#${gradientId})`}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28 20L36 28L28 36"
          stroke={`url(#${gradientId})`}
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
      <div className="flex flex-col justify-center">
        <span
          className="text-xl font-bold tracking-tighter leading-none transition-colors duration-300"
          style={{ color: textColor }}
        >
          Dev
          {/* CORREÇÃO AQUI: Usando backgroundImage e propriedades explícitas de clip */}
          <span
            style={{
              backgroundImage: `linear-gradient(to right, ${colorStart}, ${colorEnd})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent" // Fallback
            }}
            className="ml-0.5"
          >
            Scud
          </span>
        </span>
        <span
          className="text-[9px] uppercase tracking-[0.2em] font-medium opacity-60 transition-colors duration-300"
          style={{ color: textColor }}
        >
          Felipe Scudiero
        </span>
      </div>
    </div>
  );
};

// --- COMPONENTE THEME TOGGLE ---
const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
      aria-label="Toggle Theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-orange-500 group-hover:text-orange-600" />
      <Moon className="absolute top-2 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-purple-500 group-hover:text-purple-400" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

// --- COMPONENTE NAVIGATION PRINCIPAL ---
const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Observer para atualizar o estado visual baseado na classe 'dark' no HTML
  useEffect(() => {
    const checkTheme = () => {
      const root = window.document.documentElement;
      const isDark = root.classList.contains("dark");
      setIsDarkTheme(isDark);
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "Sobre" },
    { id: "servicos", label: "Serviços" },
    { id: "technologies", label: "Stack" },
    { id: "projects", label: "Projetos" },
    { id: "testimonials", label: "Depoimentos" },
    { id: "contact", label: "Contato" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 500);

      // Lógica para marcar seção ativa
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const position = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: position, behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // -- Estilos Dinâmicos --
  const navBg = scrolled
    ? (isDarkTheme ? "bg-[#020817]/80 border-b border-white/10 shadow-lg shadow-purple-900/5" : "bg-white/90 border-b border-slate-200 shadow-sm")
    : "bg-transparent border-transparent";

  const linkColor = isDarkTheme ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-emerald-700";
  const activeLinkColor = isDarkTheme ? "text-purple-400" : "text-green-600";
  const activeLineBg = isDarkTheme ? "bg-purple-500" : "bg-green-500";

  const btnMobile = isDarkTheme
    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-500/20"
    : "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-green-500/20";

  const scrollTopClass = isDarkTheme
    ? "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/30"
    : "bg-green-600 hover:bg-green-500 text-white shadow-green-500/30";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md ${navBg}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo Integrada */}
            <button onClick={() => scrollToSection("home")} className="flex items-center gap-2 group relative z-50 focus:outline-none">
              <Logo isDarkTheme={isDarkTheme} />
            </button>

            {/* Botão Fale comigo - mobile */}
            <div className="md:hidden flex items-center gap-3 ml-auto mr-2">
              <ThemeToggle />
            </div>

            {/* Menu Hamburguer */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-md transition-colors ${isDarkTheme ? 'text-slate-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-black hover:bg-slate-100'}`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Menu Desktop */}
            <ul className="hidden md:flex items-center gap-1 lg:gap-6">
              {navItems.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className={`text-sm font-medium px-3 py-2 rounded-full transition-all duration-300 relative group ${activeSection === id ? activeLinkColor : linkColor}`}
                  >
                    {label}
                    {/* Linha animada sofisticada */}
                    <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${activeLineBg} ${activeSection === id ? "w-4" : "w-0 group-hover:w-full opacity-50"}`} />
                  </button>
                </li>
              ))}

              {/* Divisor Vertical */}
              <div className={`h-6 w-[1px] mx-2 ${isDarkTheme ? 'bg-white/10' : 'bg-slate-200'}`}></div>

              {/* Toggle Desktop */}
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </div>
        </div>

        {/* Menu Mobile Overlay (Slide Down) */}
        <div className={`md:hidden absolute top-full left-0 w-full border-b shadow-2xl transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} ${isDarkTheme ? 'bg-[#020817]/95 border-white/10' : 'bg-white/95 border-slate-200'}`}>
          <ul className="flex flex-col items-center gap-2 py-6 backdrop-blur-xl">
            {navItems.map(({ id, label }) => (
              <li key={id} className="w-full text-center">
                <button
                  onClick={() => scrollToSection(id)}
                  className={`text-lg font-medium py-3 w-full transition-colors ${activeSection === id ? activeLinkColor : linkColor}`}
                >
                  {label}
                </button>
              </li>
            ))}
            <li className="mt-4 w-full px-8">
              <button
                onClick={() => scrollToSection("contact")}
                className={`w-full py-3 rounded-xl font-bold shadow-lg transition-transform active:scale-95 ${btnMobile}`}
              >
                Vamos Conversar
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Botão Scroll to Top (Fixo e Animado) */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-2xl transition-all duration-500 z-40 flex items-center justify-center group border border-transparent
            ${showScrollTop ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"}
            ${scrollTopClass}
        `}
        aria-label="Voltar ao topo"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
      </button>
    </>
  );
};

export default Navigation;