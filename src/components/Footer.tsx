import { Code2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            <span className="font-semibold">Felipe Scudiero</span>
          </div>

          <p className="text-sm text-muted-foreground text-center sm:text-left">
            Felipe Scudiero | Todos os direitos reservados. {new Date().getFullYear()} ©
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
