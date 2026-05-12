import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, User, DollarSign } from "lucide-react";

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
            const response = await fetch(`http://localhost:5000/api/Orders/${id}`);
            if (!response.ok) throw new Error("Pedido não encontrado");
            return response.json();
        },
    });

    if (isLoading) return <div className="flex justify-center pt-20">Carregando detalhes...</div>;
    if (isError) return <div className="flex justify-center pt-20 text-red-500">Pedido não encontrado ou erro no servidor.</div>;

    return (
        <main className="container h-[100dvh] mx-auto pt-16 pb-4 max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/orders" className="p-2 hover:bg-muted rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl font-bold">Detalhes do Pedido</h1>
            </div>

            <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
                <div className="bg-muted/30 p-6 border-b">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">ID do Pedido</p>
                            <code className="text-xs font-mono bg-muted p-1 rounded">{order?.id}</code>
                        </div>
                    </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                <User size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Cliente</p>
                                <p className="text-lg font-semibold">{order?.customerName}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
                                <Calendar size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Data do Pedido</p>
                                <p className="text-lg font-semibold">
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
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                                <DollarSign size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Valor Total</p>
                                <p className="text-2xl font-bold text-green-700">
                                    {order ? new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    }).format(order.value) : ""}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t bg-muted/10 flex justify-end gap-3" />
            </div>
        </main>
    );
}
