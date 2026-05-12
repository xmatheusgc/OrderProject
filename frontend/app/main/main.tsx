import { Link } from "react-router";
import { ArrowRight, ShoppingBag } from "lucide-react";

export function Main() {
  return (
    <main className="flex min-h-[calc(100vh-160px)] items-center justify-center p-6 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 -left-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-12 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-700" />
      
      <div className="max-w-4xl w-full flex flex-col items-center text-center gap-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide uppercase animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <ShoppingBag size={16} />
          Projeto de Demonstração
        </div>
        
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground">
            Gerenciamento de <span className="text-primary">Pedidos</span>.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Uma aplicação full-stack desenvolvida para fins de teste e estudo, integrando uma API em .NET com um frontend em React.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
          <Link 
            to="/orders" 
            className="h-14 px-8 bg-primary text-primary-foreground rounded-2xl flex items-center gap-3 text-lg font-bold shadow-xl shadow-primary/25 hover:scale-105 active:scale-95 transition-all btn-premium"
          >
            Ver Pedidos <ArrowRight size={20} />
          </Link>
          <Link 
            to="/orders/new" 
            className="h-14 px-8 bg-card text-foreground border rounded-2xl flex items-center gap-3 text-lg font-semibold hover:bg-muted transition-all shadow-sm"
          >
            Criar Novo
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 w-full animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-600">
          {[
            { label: "Backend", value: ".NET 8" },
            { label: "Frontend", value: "React" },
            { label: "Build", value: "Vite" },
            { label: "Style", value: "Tailwind" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="text-2xl font-black text-foreground">{stat.value}</span>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}