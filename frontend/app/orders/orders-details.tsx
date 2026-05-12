import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, User, DollarSign, Hash } from "lucide-react";

interface Order {
    id: string;
    customerName: string;
    value: number;
    orderDate: string;
}

export default function OrdersDetails() {
    const { id } = useParams();

    const { data: order, isLoading, isError } = useQuery<Order>({
        queryKey: ["order", id],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/Orders/${id}`);
            if (!response.ok) throw new Error("Pedido não encontrado");
            return response.json();
        },
    });

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center pt-32 gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground font-medium">Carregando detalhes...</p>
        </div>
    );

    if (isError) return (
        <div className="flex flex-col items-center justify-center pt-32 gap-4 text-destructive">
          <p className="font-semibold text-lg">Pedido não encontrado ou erro no servidor.</p>
          <Link to="/orders" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft size={16} /> Voltar para a lista
          </Link>
        </div>
    );

    return (
        <main className="container mx-auto px-6 pt-12 pb-24 max-w-3xl min-h-[calc(100vh-160px)]">
            <div className="flex items-center gap-4 mb-10 group">
                <Link to="/orders" className="w-10 h-10 flex items-center justify-center hover:bg-muted rounded-full transition-all border shadow-sm">
                    <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                </Link>
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold tracking-tight">Detalhes do Pedido</h1>
                    <p className="text-sm text-muted-foreground">Visualize todas as informações deste pedido.</p>
                </div>
            </div>

            <div className="bg-card rounded-2xl border shadow-premium overflow-hidden transition-all">
                <div className="bg-muted/30 p-8 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Hash size={18} />
                        <span className="text-sm font-medium uppercase tracking-wider">Identificador</span>
                    </div>
                    <code className="text-xs font-mono bg-background px-3 py-1.5 rounded-lg border shadow-inner font-semibold">
                        {order?.id}
                    </code>
                </div>

                <div className="p-8 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-xl shadow-sm">
                                <User size={24} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Cliente</p>
                                <p className="text-xl font-semibold text-foreground">{order?.customerName}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 flex items-center justify-center bg-orange-500/10 text-orange-600 rounded-xl shadow-sm">
                                <Calendar size={24} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Data do Pedido</p>
                                <p className="text-lg font-semibold text-foreground">
                                    {order ? new Date(order.orderDate).toLocaleDateString("pt-BR", {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    }) : ""}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t flex flex-col items-center justify-center gap-3">
                        <div className="w-16 h-16 flex items-center justify-center bg-green-500/10 text-green-600 rounded-2xl shadow-sm mb-2">
                            <DollarSign size={32} />
                        </div>
                        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Valor Total do Pedido</p>
                        <p className="text-5xl font-black text-primary tracking-tight">
                            {order ? new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            }).format(order.value) : ""}
                        </p>
                    </div>
                </div>

                <div className="p-8 border-t bg-muted/10 flex justify-end gap-3">
                     <Link to="/orders" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Voltar para a lista
                     </Link>
                </div>
            </div>
        </main>
    );
}
