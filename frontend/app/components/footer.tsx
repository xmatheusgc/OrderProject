import { Link } from "react-router";

export function Footer() {
    return (
        <footer className="bg-muted/30 border-t mt-auto">
            <div className="container mx-auto px-6 py-16 flex flex-col gap-12">
                <div className="flex justify-between items-start w-full">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <h2 className="font-bold text-lg tracking-tight">OrderProject</h2>
                            <p className="text-sm text-muted-foreground max-w-xs">
                                API desenvolvida com C# .NET e ReactTS.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold text-xs uppercase tracking-widest text-muted-foreground">Social</h3>
                            <ul className="flex gap-4">
                                <li>
                                    <a 
                                        href="https://github.com/xmatheusgc/OrderProject" 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-card border hover:border-primary hover:text-primary transition-all duration-300 shadow-sm"
                                    >
                                        <span className="sr-only">Github</span>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="https://www.linkedin.com/in/matheusgarciac/" 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-card border hover:border-primary hover:text-primary transition-all duration-300 shadow-sm"
                                    >
                                        <span className="sr-only">LinkedIn</span>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-xs uppercase tracking-widest text-muted-foreground text-right">Navegação</h3>
                        <ul className="flex flex-col gap-3 items-end">
                            <li>
                                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link to="/orders" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pedidos</Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sobre</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t pt-8 text-muted-foreground">
                    <p className="text-sm">
                        © {new Date().getFullYear()} Order Project. Todos os direitos reservados.
                    </p>
                    <p className="text-sm flex items-center gap-2">
                        Feito por <span className="font-semibold text-foreground">Matheus</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
