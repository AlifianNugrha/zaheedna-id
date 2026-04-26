import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { products } from "@/lib/products";
import logo from "@/assets/logo.jpeg";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X } from "lucide-react";

const navItems = [
  { to: "/", label: "Beranda" },
  { to: "/katalog", label: "Katalog" },
  { to: "/koleksi-terbaru", label: "Koleksi Terbaru" },
  { to: "/tentang", label: "Tentang" },
] as const;

export function Header() {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = searchQuery.trim() 
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {!isSearchOpen ? (
            <>
              <Link to="/" className="flex items-center gap-1">
                <span className="font-display text-2xl md:text-3xl tracking-tight text-foreground">
                  Zaheedna
                </span>
                <span className="hidden md:inline-block ml-1 h-1 w-1 rounded-full bg-accent" />
              </Link>

              <nav className="hidden md:flex items-center gap-10">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="text-[13px] uppercase tracking-[0.18em] text-foreground/70 hover:text-foreground transition-colors gold-underline"
                    activeProps={{ className: "text-foreground" }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Cari"
                  className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted transition"
                >
                  <SearchIcon size={18} strokeWidth={1.5} />
                </button>
                <Link
                  to="/keranjang"
                  aria-label="Keranjang"
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted transition"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 7h14l-1.5 11a2 2 0 0 1-2 1.7H8.5A2 2 0 0 1 6.5 18L5 7Z" />
                    <path d="M9 7V5a3 3 0 0 1 6 0v2" />
                  </svg>
                  {count > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-5 min-w-5 px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-medium flex items-center justify-center">
                      {count}
                    </span>
                  )}
                </Link>
                <a
                  href="https://shopee.co.id/zaheedna.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex h-10 px-4 items-center justify-center rounded-full bg-[#EE4D2D] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#d73211] transition-colors"
                >
                  Shopee
                </a>
              </div>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 flex items-center gap-4"
            >
              <div className="flex-1 relative">
                <input 
                  autoFocus
                  type="text"
                  placeholder="Cari produk Zaheedna..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-foreground placeholder:text-muted-foreground/60 focus:outline-none h-10 text-sm tracking-wide"
                />
                <AnimatePresence>
                  {searchQuery && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-4 bg-background border border-border shadow-2xl p-4 max-h-[400px] overflow-auto z-50 rounded-lg"
                    >
                      {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                          {filteredProducts.map(p => (
                            <Link 
                              key={p.id} 
                              to="/produk/$slug"
                              params={{ slug: p.slug }}
                              onClick={() => {
                                setIsSearchOpen(false);
                                setSearchQuery("");
                              }}
                              className="flex items-center gap-4 p-2 hover:bg-muted/50 rounded-md transition"
                            >
                              <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" />
                              <div>
                                <p className="text-sm font-medium text-foreground">{p.name}</p>
                                <p className="text-xs text-muted-foreground">Rp {p.price.toLocaleString()}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground py-4 text-center">Tidak ada produk ditemukan</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button 
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted transition"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}
