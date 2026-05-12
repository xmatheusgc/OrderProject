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
      const response = await fetch("http://localhost:5000/api/Orders");
      if (!response.ok) throw new Error("Erro ao buscar pedidos");
      return response.json();
    },
  });

  if (isLoading) return <div className="flex justify-center pt-20">Carregando pedidos...</div>;
  if (isError) return <div className="flex justify-center pt-20 text-red-500">Erro ao carregar pedidos.</div>;

  return (
    <main className="container h-[100dvh] mx-auto  pt-16 pb-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Lista de pedidos</h1>
        <Link 
          to="/orders/new"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90"
        >
          <Plus size={18} /> Adicionar pedido
        </Link>
      </div>

      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="p-4 font-semibold">Cliente</th>
              <th className="p-4 font-semibold">Valor</th>
              <th className="p-4 font-semibold">Data</th>
              <th className="p-4 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.id} className="border-b hover:bg-muted/30 transition-colors">
                <td className="p-4">{order.customerName}</td>
                <td className="p-4">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(order.value)}
                </td>
                <td className="p-4">{new Date(order.orderDate).toLocaleDateString("pt-BR")}</td>
                <td className="p-4">
                  <div className="flex gap-2 justify-end">
                    <Link to={`/orders/${order.id}`} className="p-2 hover:bg-muted rounded-md transition-colors" title="Visualizar">
                      <Eye size={18} className="text-green-500" />
                    </Link>
                    <Link to={`#`} className="p-2 hover:bg-muted rounded-md transition-colors" title="Editar">
                      <Pencil size={18} className="text-blue-500" />
                    </Link>
                    <Link to={`#`} className="p-2 hover:bg-muted rounded-md transition-colors" title="Excluir">
                      <Trash size={18} className="text-red-500" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {orders?.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted-foreground">
                  Nenhum pedido encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}