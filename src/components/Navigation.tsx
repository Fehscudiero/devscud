import { useState, useEffect } from "react";
import Logo from "../assets/logo3.png";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "Sobre" },
    { id: "servicos", label: "Serviços" },
    { id: "technologies", label: "Tecnologias" },
    { id: "projects", label: "Projetos" },
    { id: "testimonials", label: "Depoimentos" },
    { id: "contact", label: "Contato" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 1);

      const current = navItems.find(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (current) setActiveSection(current.id);
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

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button onClick={() => scrollToSection("home")} className="flex items-center">
              <img src={Logo} alt="Logo Felipe Scudiero" className="max-h-20 sm:max-h-24 lg:max-h-28 w-auto object-contain flicker" />
            </button>

            {/* Botão Fale comigo - apenas mobile */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-purple-700 via-fuchsia-600 to-purple-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Fale comigo
              </button>
            </div>

            {/* Menu Hamburguer */}
            <div className="md:hidden flex items-center gap-2">
              {/* Adicionei o toggle aqui também para acesso rápido se preferir, mas deixei comentado para priorizar o menu interno. 
                   Se quiser fora, é só descomentar: <ThemeToggle /> 
               */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-muted-foreground hover:text-primary transition-colors">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Menu Desktop */}
            <ul className="hidden md:flex items-center gap-8">
              {navItems.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className={`text-sm font-medium transition-colors relative group ${activeSection === id ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {label}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${activeSection === id ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </button>
                </li>
              ))}

              {/* Theme Toggle Desktop */}
              <li className="pl-4 border-l border-border/50">
                <ThemeToggle />
              </li>
            </ul>
          </div>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-background border-t border-border shadow-md z-40">
            <ul className="flex flex-col items-center gap-6 py-6">
              {/* Theme Toggle Mobile (Topo da lista) */}
              <li>
                <ThemeToggle />
              </li>

              {navItems.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className={`text-base font-medium transition-colors ${activeSection === id ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Botão Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 md:bottom-14 right-6 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/80 transition-all z-50"
          aria-label="Voltar ao topo"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default Navigation;