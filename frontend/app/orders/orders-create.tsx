import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Save, User, DollarSign, AlertCircle } from "lucide-react";

export default function OrdersCreate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [customerName, setCustomerName] = useState("");
  const [value, setValue] = useState("");

  const mutation = useMutation({
    mutationFn: async (newOrder: { customerName: string; value: number }) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/Orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });
      if (!response.ok) throw new Error("Erro ao criar pedido");
      return response.json();
    },
    onSuccess: () => {
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
    <main className="container mx-auto px-6 pt-12 pb-24 max-w-2xl min-h-[calc(100vh-160px)]">
      <div className="flex items-center gap-4 mb-10 group">
        <Link to="/orders" className="w-10 h-10 flex items-center justify-center hover:bg-muted rounded-full transition-all border shadow-sm">
          <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
        </Link>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight">Novo Pedido</h1>
          <p className="text-sm text-muted-foreground">Preencha os campos abaixo para registrar um novo pedido.</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl border shadow-premium p-8 transition-all">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="customer" className="text-sm font-semibold flex items-center gap-2">
                <User size={16} className="text-primary" />
                Nome do Cliente
              </label>
              <input
                id="customer"
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ex: João Silva"
                className="w-full h-12 px-4 bg-background border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground/50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="value" className="text-sm font-semibold flex items-center gap-2">
                <DollarSign size={16} className="text-primary" />
                Valor do Pedido
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">R$</span>
                <input
                  id="value"
                  type="number"
                  step="0.01"
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="0,00"
                  className="w-full h-12 pl-12 pr-4 bg-background border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground/50"
                />
              </div>
            </div>
          </div>

          {mutation.isError && (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3 text-destructive text-sm font-medium animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={18} />
              <p>Ocorreu um erro ao salvar o pedido. Tente novamente.</p>
            </div>
          )}

          <div className="flex items-center justify-end gap-4 pt-4">
            <Link
              to="/orders"
              className="h-11 px-6 flex items-center justify-center font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="bg-primary text-primary-foreground h-11 px-8 rounded-xl flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-primary/20 btn-premium font-bold"
            >
              <Save size={18} />
              {mutation.isPending ? "Salvando..." : "Salvar Pedido"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
