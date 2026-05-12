import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Save } from "lucide-react";

export default function OrdersCreate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [customerName, setCustomerName] = useState("");
  const [value, setValue] = useState("");

  const mutation = useMutation({
    mutationFn: async (newOrder: { customerName: string; value: number }) => {
      const response = await fetch("http://localhost:5000/api/Orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });
      if (!response.ok) throw new Error("Erro ao criar pedido");
      return response.json();
    },
    onSuccess: () => {
      // Invalida o cache para recarregar a lista de pedidos
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      navigate("/orders");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      customerName,
      value: parseFloat(value),
    });
  };

  return (
    <main className="container h-[100dvh] mx-auto pt-16 pb-4 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/orders" className="p-2 hover:bg-muted rounded-full transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">Novo Pedido</h1>
      </div>

      <div className="bg-card rounded-lg border shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="customer" className="text-sm font-medium">
              Nome do Cliente
            </label>
            <input
              id="customer"
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Ex: João Silva"
              className="w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="value" className="text-sm font-medium">
              Valor do Pedido
            </label>
            <input
              id="value"
              type="number"
              step="0.01"
              required
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="0,00"
              className="w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Link
              to="/orders"
              className="px-4 py-2 border rounded-md hover:bg-muted transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90 disabled:opacity-50"
            >
              <Save size={18} />
              {mutation.isPending ? "Salvando..." : "Salvar Pedido"}
            </button>
          </div>
          
          {mutation.isError && (
            <p className="text-red-500 text-sm mt-2">Ocorreu um erro ao salvar o pedido.</p>
          )}
        </form>
      </div>
    </main>
  );
}
