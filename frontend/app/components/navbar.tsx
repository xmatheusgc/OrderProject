import { Link, useLocation } from "react-router";

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold shadow-lg group-hover:scale-110 transition-transform">
            O
          </div>
          <h1 className="font-bold text-xl tracking-tight text-foreground">
            Order<span className="text-primary">Project</span>
          </h1>
        </Link>
        
        <ul className="flex items-center gap-8">
          {[
            { name: "Home", path: "/" },
            { name: "Pedidos", path: "/orders" },
            { name: "Sobre", path: "/about" },
          ].map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`text-sm font-medium transition-all duration-300 relative py-2 
                  ${isActive(item.path) 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}