import { useState, useEffect } from "react";
import Logo from "../assets/logo3.png";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "Sobre" },
    { id: "stats", label: "Estatísticas" },
    { id: "technologies", label: "Tecnologias" },
    { id: "projects", label: "Projetos" },
    { id: "testimonials", label: "Depoimentos" },
    { id: "contact", label: "Contato" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 1);

      const sections = navItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const current = sections.find((section) => {
        if (!section.element) return false;
        const rect = section.element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center transition-colors"
            >
              <img
                src={Logo}
                alt="Logo Felipe Scudiero"
                className="max-h-20 sm:max-h-24 lg:max-h-28 w-auto object-contain flicker"
              />
            </button>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-sm font-medium transition-colors relative group ${activeSection === item.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${activeSection === item.id
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                        }`}
                    />
                  </button>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-background border-t border-border shadow-md z-40">
            <ul className="flex flex-col items-center gap-6 py-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-base font-medium transition-colors ${activeSection === item.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/80 transition-all z-50"
          aria-label="Voltar ao topo"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default Navigation;
