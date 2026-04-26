import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { formatIDR, getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/produk/$slug")({
  head: ({ params }) => {
    const product = getProduct(params.slug);
    const title = product ? `${product.name} — Zaheedna` : "Produk — Zaheedna";
    const desc = product?.description ?? "Detail produk Zaheedna.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(product ? [{ property: "og:image", content: product.image }] : []),
      ],
    };
  },
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-md text-center py-32 px-5">
      <h1 className="font-display text-4xl text-foreground">Produk tidak ditemukan</h1>
      <Link to="/katalog" className="inline-block mt-6 text-sm uppercase tracking-[0.2em] text-accent">
        Kembali ke Katalog
      </Link>
    </div>
  ),
});

function ProductDetail() {
  const { slug } = Route.useParams();
  const product = useMemo(() => getProduct(slug), [slug]);
  const navigate = useNavigate();
  const { add } = useCart();
  const [color, setColor] = useState(product?.colors[0]?.name ?? "");
  const [size, setSize] = useState(product?.sizes[0] ?? "");
  const [openSection, setOpenSection] = useState<string | null>("desc");

  if (!product) return null;

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAdd = (checkout = false) => {
    add({ productId: product.id, color, size, qty: 1 });
    if (checkout) navigate({ to: "/keranjang" });
  };

  return (
    <div>
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-6 md:pt-10">
        <nav className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Beranda</Link>
          <span className="mx-2">/</span>
          <Link to="/katalog" className="hover:text-foreground">Katalog</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-12 gap-6 md:gap-12">
          {/* Gallery */}
          <div className="col-span-12 md:col-span-7">
            <div className="aspect-[4/5] overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                width={900}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden md:grid grid-cols-3 gap-3 mt-3">
              {[product.image, product.image, product.image].map((src, i) => (
                <div key={i} className="aspect-[4/5] overflow-hidden bg-muted">
                  <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="col-span-12 md:col-span-5 md:pl-4 md:sticky md:top-24 md:self-start">
            <p className="text-[11px] uppercase tracking-[0.3em] text-accent">{product.category}</p>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mt-3">{product.name}</h1>
            <p className="mt-4 text-2xl text-foreground">{formatIDR(product.price)}</p>

            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-foreground">Warna</p>
                <p className="text-xs text-muted-foreground">{color}</p>
              </div>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    className={`relative h-10 w-10 rounded-full border-2 transition ${
                      color === c.name ? "border-accent" : "border-border"
                    }`}
                    aria-label={c.name}
                  >
                    <span
                      className="absolute inset-1 rounded-full"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-foreground">Ukuran</p>
                <button className="text-xs text-muted-foreground underline underline-offset-2 hover:text-accent">
                  Panduan ukuran
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-12 text-sm border transition ${
                      size === s
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-transparent text-foreground border-border hover:border-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3">
              <button
                onClick={() => handleAdd(true)}
                className="h-14 bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.25em] hover:bg-foreground transition-colors"
              >
                Beli Sekarang
              </button>
              <button
                onClick={() => handleAdd(false)}
                className="h-14 bg-transparent border border-foreground text-foreground text-[11px] uppercase tracking-[0.25em] hover:bg-foreground hover:text-primary-foreground transition-colors"
              >
                Tambah ke Keranjang
              </button>
            </div>

            {/* Accordion */}
            <div className="mt-12 border-t border-border">
              {[
                { id: "desc", title: "Deskripsi", body: product.description },
                {
                  id: "ship",
                  title: "Pengiriman & Pengembalian",
                  body: "Pengiriman ke seluruh Indonesia. Gratis ongkir untuk pembelian di atas Rp 500.000. Pengembalian dalam 7 hari setelah barang diterima.",
                },
                {
                  id: "care",
                  title: "Perawatan",
                  body: "Cuci dengan air dingin, jangan diperas. Setrika dengan suhu rendah. Hindari paparan langsung sinar matahari.",
                },
              ].map((s) => {
                const open = openSection === s.id;
                return (
                  <div key={s.id} className="border-b border-border">
                    <button
                      onClick={() => setOpenSection(open ? null : s.id)}
                      className="w-full flex items-center justify-between py-5 text-left"
                    >
                      <span className="text-[11px] uppercase tracking-[0.22em] text-foreground">
                        {s.title}
                      </span>
                      <span className="text-foreground text-lg">{open ? "−" : "+"}</span>
                    </button>
                    {open && (
                      <p className="pb-5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="mx-auto max-w-[1400px] px-5 md:px-10 pt-24 md:pt-32">
        <h2 className="font-display text-3xl md:text-5xl text-foreground mb-10">Anda mungkin suka</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
