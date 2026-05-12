import { Link } from "react-router";

export function Navbar() {
  return (
    <nav className="px-20 py-6 flex items-center justify-between gap-16 border">
      <h1 className="font-bold text-lg text-foreground">Order Project</h1>
      <ul className="flex gap-12">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/orders">Pedidos</Link>
        </li>
        <li>
          <Link to="/about">Sobre</Link>
        </li>
      </ul>
    </nav>
  );
}