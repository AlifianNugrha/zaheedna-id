import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const Route = createFileRoute("/koleksi-terbaru")({
  head: () => ({
    meta: [
      { title: "Koleksi Terbaru — Zaheedna" },
      { name: "description", content: "Lihat koleksi terbaru Zaheedna untuk musim ini." },
      { property: "og:title", content: "Koleksi Terbaru — Zaheedna" },
      { property: "og:description", content: "Koleksi terbaru Zaheedna untuk musim ini." },
    ],
  }),
  component: NewArrivalsPage,
});

function NewArrivalsPage() {
  // Show all as "new" for demo
  const items = products;
  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-10 md:pt-16">
      <header className="mb-12 md:mb-20 max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-4">Spring / 2025</p>
        <h1 className="font-display text-5xl md:text-8xl tracking-[-0.02em] text-foreground leading-[0.95] text-balance">
          Koleksi terbaru kami.
        </h1>
        <p className="mt-7 text-[15px] leading-relaxed text-muted-foreground max-w-xl">
          Sebuah perayaan tekstur lembut, palet bumi, dan siluet yang membebaskan. Dibuat untuk
          perempuan yang mencari ketenangan dalam setiap helai pakaian.
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-16">
        {items.map((p, i) => (
          <ProductCard key={p.id} product={p} priority={i < 3} />
        ))}
      </div>
    </div>
  );
}
