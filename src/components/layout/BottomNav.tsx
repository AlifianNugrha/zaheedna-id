import { Link, useLocation } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";

const items = [
  {
    to: "/",
    label: "Beranda",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="m3 11 9-7 9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2v-9Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    to: "/katalog",
    label: "Katalog",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    to: "/keranjang",
    label: "Keranjang",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 7h14l-1.5 11a2 2 0 0 1-2 1.7H8.5A2 2 0 0 1 6.5 18L5 7Z" />
        <path d="M9 7V5a3 3 0 0 1 6 0v2" />
      </svg>
    ),
  },
  {
    to: "/tentang",
    label: "Akun",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" strokeLinecap="round" />
      </svg>
    ),
  },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  const { count } = useCart();

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-lg border-t border-border"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="flex justify-around items-stretch h-16">
        {items.map((item) => {
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          return (
            <li key={item.to} className="flex-1">
              <Link
                to={item.to}
                className={`relative h-full flex flex-col items-center justify-center gap-1 transition-colors ${
                  active ? "text-accent" : "text-foreground/60"
                }`}
              >
                <span className="relative">
                  {item.icon}
                  {item.to === "/keranjang" && count > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 h-4 min-w-4 px-1 rounded-full bg-accent text-accent-foreground text-[9px] font-medium flex items-center justify-center">
                      {count}
                    </span>
                  )}
                </span>
                <span className="text-[10px] uppercase tracking-wider">{item.label}</span>
                {active && <span className="absolute top-0 h-0.5 w-8 bg-accent rounded-full" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
