import { Link } from "react-router";

export function Footer() {
    return (
        <footer className="px-20 py-12 flex flex-col gap-12 border-t mt-auto bg-card">
            <div className="flex justify-between items-start w-full max-w-7xl mx-auto">
                <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Social</h3>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <a 
                                href="https://github.com/xmatheusgc/OrderProject" 
                                target="_blank" 
                                rel="noreferrer"
                                className="hover:text-primary transition-colors text-sm"
                            >
                                Github
                            </a>
                        </li>
                        <li>
                            <a 
                                href="https://linkedin.com/in/xmatheusgc" 
                                target="_blank" 
                                rel="noreferrer"
                                className="hover:text-primary transition-colors text-sm"
                            >
                                LinkedIn
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Navegação</h3>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link to="/" className="hover:text-primary transition-colors text-sm">Home</Link>
                        </li>
                        <li>
                            <Link to="/orders" className="hover:text-primary transition-colors text-sm">Pedidos</Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-primary transition-colors text-sm">Sobre</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="flex justify-center items-center w-full border-t pt-8">
                <p className="text-xs text-muted-foreground">
                    Order Project © {new Date().getFullYear()} • Desenvolvido por Matheus
                </p>
            </div>
        </footer>
    );
}