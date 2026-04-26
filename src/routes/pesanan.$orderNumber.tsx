import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchOrderByNumber, type OrderRecord } from "@/lib/orders";
import { formatIDR } from "@/lib/products";

export const Route = createFileRoute("/pesanan/$orderNumber")({
  head: ({ params }) => ({
    meta: [
      { title: `Pesanan ${params.orderNumber} — Zaheedna` },
      { name: "description", content: "Detail dan status pesanan Anda di Zaheedna." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: OrderConfirmation,
});

function OrderConfirmation() {
  const { orderNumber } = Route.useParams();
  const [data, setData] = useState<OrderRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchOrderByNumber(orderNumber)
      .then((d) => {
        if (cancelled) return;
        if (!d) setError("Pesanan tidak ditemukan.");
        else setData(d);
      })
      .catch((e: Error) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Memuat pesanan…</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-md px-5 py-32 text-center">
        <h1 className="font-display text-4xl text-foreground">Pesanan tidak ditemukan</h1>
        <p className="mt-4 text-muted-foreground">{error}</p>
        <Link to="/katalog" className="inline-block mt-8 px-7 h-14 leading-[3.5rem] bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.25em]">
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const { order, items } = data;
  const transferInstructions = order.payment_method.toLowerCase().includes("transfer");

  return (
    <div className="mx-auto max-w-4xl px-5 md:px-10 pt-10 md:pt-16 pb-10">
      <div className="text-center mb-12 md:mb-16 animate-fade-up">
        <div className="mx-auto h-16 w-16 rounded-full bg-accent/15 flex items-center justify-center mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
            <path d="m4 12 5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-3">Pesanan Berhasil</p>
        <h1 className="font-display text-4xl md:text-6xl text-foreground">Terima kasih, {order.customer_name.split(" ")[0]}.</h1>
        <p className="mt-4 text-muted-foreground">
          Konfirmasi telah dikirim ke <span className="text-foreground">{order.customer_email}</span>
        </p>
        <div className="mt-6 inline-flex items-center gap-3 border border-border px-5 h-12">
          <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">No. Pesanan</span>
          <span className="font-mono text-sm text-foreground">{order.order_number}</span>
        </div>
      </div>

      {transferInstructions && (
        <section className="border border-accent/40 bg-accent/5 p-6 md:p-8 mb-10">
          <p className="text-[11px] uppercase tracking-[0.22em] text-accent mb-3">Instruksi Pembayaran</p>
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
            Transfer ke salah satu rekening berikut:
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-background/60 p-4">
              <p className="text-muted-foreground text-xs uppercase tracking-wider">BCA</p>
              <p className="font-mono mt-1 text-foreground">1234 5678 90</p>
              <p className="text-foreground mt-0.5">a.n. Zaheedna Indonesia</p>
            </div>
            <div className="bg-background/60 p-4">
              <p className="text-muted-foreground text-xs uppercase tracking-wider">Mandiri</p>
              <p className="font-mono mt-1 text-foreground">9876 5432 10</p>
              <p className="text-foreground mt-0.5">a.n. Zaheedna Indonesia</p>
            </div>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Mohon transfer total <span className="text-foreground font-medium">{formatIDR(order.total)}</span> dalam 24 jam. Pesanan akan diproses setelah pembayaran kami terima.
          </p>
        </section>
      )}

      <div className="grid md:grid-cols-3 gap-8 md:gap-10">
        <section className="md:col-span-2">
          <h2 className="text-[11px] uppercase tracking-[0.22em] text-foreground mb-5">Item Pesanan</h2>
          <ul className="divide-y divide-border border-y border-border">
            {items.map((it) => (
              <li key={it.id} className="py-5 flex gap-4">
                <div className="w-20 aspect-[3/4] overflow-hidden bg-muted shrink-0">
                  <img src={it.product_image} alt={it.product_name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 flex justify-between gap-3">
                  <div>
                    <p className="font-display text-lg text-foreground">{it.product_name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {it.color} · {it.size} · ×{it.quantity}
                    </p>
                  </div>
                  <p className="text-sm text-foreground whitespace-nowrap">{formatIDR(it.price * it.quantity)}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-2 text-sm">
            <Row label="Subtotal" value={formatIDR(order.subtotal)} />
            <Row label="Pengiriman" value={order.shipping_cost === 0 ? "Gratis" : formatIDR(order.shipping_cost)} />
            <div className="pt-4 mt-4 border-t border-border flex justify-between items-baseline">
              <span className="text-[11px] uppercase tracking-[0.22em] text-foreground">Total</span>
              <span className="font-display text-3xl text-foreground">{formatIDR(order.total)}</span>
            </div>
          </div>
        </section>

        <aside className="bg-card p-6 md:p-7 h-fit">
          <h2 className="text-[11px] uppercase tracking-[0.22em] text-foreground mb-5">Detail</h2>
          <div className="space-y-5 text-sm">
            <Block title="Pengiriman">
              <p className="text-foreground">{order.customer_name}</p>
              <p className="text-muted-foreground">{order.shipping_address}</p>
              <p className="text-muted-foreground">{order.shipping_city}, {order.shipping_zip}</p>
              <p className="text-muted-foreground">{order.customer_phone}</p>
            </Block>
            <Block title="Metode Pengiriman">
              <p className="text-foreground">{order.shipping_method}</p>
            </Block>
            <Block title="Pembayaran">
              <p className="text-foreground">{order.payment_method}</p>
              <p className="text-xs uppercase tracking-wider mt-1 text-accent">{order.status}</p>
            </Block>
          </div>
        </aside>
      </div>

      <div className="mt-14 text-center">
        <Link
          to="/katalog"
          className="inline-flex px-7 h-14 items-center bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.25em] hover:bg-foreground"
        >
          Lanjut Belanja
        </Link>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-2">{title}</p>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}
