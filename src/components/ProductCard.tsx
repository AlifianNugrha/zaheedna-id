import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { formatIDR } from "@/lib/products";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  return (
    <Link
      to="/produk/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="relative overflow-hidden bg-muted aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          loading={priority ? "eager" : "lazy"}
          width={900}
          height={1200}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-background/90 backdrop-blur text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 text-foreground/80">
            {product.badge}
          </span>
        )}
        <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hidden md:block">
          <div className="bg-background/95 backdrop-blur text-foreground text-xs uppercase tracking-[0.18em] py-3 text-center">
            Lihat Produk
          </div>
        </div>
      </div>
      <div className="pt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {product.category}
          </p>
          <h3 className="mt-1 text-sm md:text-[15px] text-foreground truncate">{product.name}</h3>
        </div>
        <p className="text-sm md:text-[15px] text-foreground whitespace-nowrap">
          {formatIDR(product.price)}
        </p>
      </div>
      <div className="mt-2 flex gap-1.5">
        {product.colors.slice(0, 4).map((c) => (
          <span
            key={c.name}
            className="h-3 w-3 rounded-full border border-border"
            style={{ backgroundColor: c.hex }}
            aria-label={c.name}
          />
        ))}
      </div>
    </Link>
  );
}
