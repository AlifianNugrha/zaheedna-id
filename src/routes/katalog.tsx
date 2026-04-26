import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/products";

export const Route = createFileRoute("/katalog")({
  head: () => ({
    meta: [
      { title: "Katalog — Zaheedna" },
      { name: "description", content: "Jelajahi seluruh koleksi busana muslim Zaheedna." },
      { property: "og:title", content: "Katalog — Zaheedna" },
      { property: "og:description", content: "Jelajahi seluruh koleksi busana muslim Zaheedna." },
    ],
  }),
  component: KatalogPage,
});

function KatalogPage() {
  const [active, setActive] = useState<(typeof categories)[number]>("Semua");
  const filtered =
    active === "Semua"
      ? products
      : active === "Koleksi Terbaru"
      ? products.filter((p) => p.badge === "Koleksi Terbaru")
      : products.filter((p) => p.category === active);

  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-10 md:pt-16">
      <header className="mb-10 md:mb-16">
        <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-4">Katalog</p>
        <h1 className="font-display text-5xl md:text-7xl tracking-tight text-foreground">
          Seluruh koleksi
        </h1>
        <p className="mt-5 text-[15px] text-muted-foreground max-w-xl">
          {filtered.length} produk · Filter berdasarkan kategori
        </p>
      </header>

      <div className="flex gap-2 md:gap-3 overflow-x-auto pb-3 mb-10 md:mb-14 -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`whitespace-nowrap text-[11px] uppercase tracking-[0.22em] px-5 h-11 border transition-colors ${
              active === c
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-transparent text-foreground/70 border-border hover:border-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-6 gap-y-10 md:gap-y-14">
        {filtered.map((p, i) => (
          <ProductCard key={p.id} product={p} priority={i < 4} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-20">Tidak ada produk pada kategori ini.</p>
      )}
    </div>
  );
}
