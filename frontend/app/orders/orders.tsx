import { Eye, Pencil, Plus, Trash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

interface Order {
  id: string;
  customerName: string;
  value: number;
  orderDate: string;
}

export default function Orders() {
  const { data: orders, isLoading, isError } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/Orders`);
      if (!response.ok) throw new Error("Erro ao buscar pedidos");
      return response.json();
    },
  });

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center pt-32 gap-4">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      <p className="text-muted-foreground font-medium animate-pulse">Carregando pedidos...</p>
    </div>
  );
  
  if (isError) return (
    <div className="flex flex-col items-center justify-center pt-32 gap-4 text-destructive">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
        <Trash size={32} />
      </div>
      <p className="font-semibold">Erro ao carregar pedidos.</p>
    </div>
  );

  return (
    <main className="container mx-auto px-6 pt-12 pb-24 min-h-[calc(100vh-160px)]">
      <div className="flex justify-between items-end mb-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Lista de pedidos</h1>
          <p className="text-muted-foreground">Gerencie e acompanhe todos os pedidos realizados.</p>
        </div>
        <Link 
          to="/orders/new"
          className="bg-primary text-primary-foreground h-11 px-6 rounded-lg flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20 btn-premium font-medium"
        >
          <Plus size={18} /> Adicionar pedido
        </Link>
      </div>

      <div className="bg-card rounded-xl border shadow-premium overflow-hidden transition-all">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="p-5 font-semibold text-sm text-muted-foreground uppercase tracking-wider">Cliente</th>
                <th className="p-5 font-semibold text-sm text-muted-foreground uppercase tracking-wider">Valor</th>
                <th className="p-5 font-semibold text-sm text-muted-foreground uppercase tracking-wider">Data</th>
                <th className="p-5 font-semibold text-sm text-muted-foreground uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders?.map((order) => (
                <tr key={order.id} className="group hover:bg-muted/30 transition-colors">
                  <td className="p-5">
                    <div className="font-medium text-foreground">{order.customerName}</div>
                  </td>
                  <td className="p-5">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(order.value)}
                    </div>
                  </td>
                  <td className="p-5 text-muted-foreground text-sm">
                    {new Date(order.orderDate).toLocaleDateString("pt-BR", {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="p-5">
                    <div className="flex gap-2 justify-end opacity-60 group-hover:opacity-100 transition-opacity">
                      <Link 
                        to={`/orders/${order.id}`} 
                        className="w-9 h-9 flex items-center justify-center hover:bg-primary/10 hover:text-primary rounded-lg transition-all text-muted-foreground" 
                        title="Visualizar"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link 
                        to={`#`} 
                        className="w-9 h-9 flex items-center justify-center hover:bg-blue-500/10 hover:text-blue-500 rounded-lg transition-all text-muted-foreground" 
                        title="Editar"
                      >
                        <Pencil size={18} />
                      </Link>
                      <Link 
                        to={`#`} 
                        className="w-9 h-9 flex items-center justify-center hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all text-muted-foreground" 
                        title="Excluir"
                      >
                        <Trash size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {orders?.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                        <Plus size={24} />
                      </div>
                      <p className="text-muted-foreground font-medium">Nenhum pedido encontrado.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}