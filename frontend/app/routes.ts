import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("orders", "orders/orders.tsx"),
    route("orders/new", "orders/orders-create.tsx"),
    route("orders/:id", "orders/orders-details.tsx"),
] satisfies RouteConfig;
