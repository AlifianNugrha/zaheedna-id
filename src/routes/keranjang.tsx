import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatIDR, getProduct, products } from "@/lib/products";
import { createOrder } from "@/lib/orders";

export const Route = createFileRoute("/keranjang")({
  head: () => ({
    meta: [
      { title: "Keranjang — Zaheedna" },
      { name: "description", content: "Tinjau pesanan Anda dan lanjutkan ke checkout." },
      { property: "og:title", content: "Keranjang — Zaheedna" },
      { property: "og:description", content: "Tinjau pesanan Anda dan lanjutkan ke checkout." },
    ],
  }),
  component: CartPage,
});

function lookup(id: string) {
  return products.find((p) => p.id === id);
}

function CartPage() {
  const { items, remove, updateQty, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [shipping, setShipping] = useState<"reg" | "exp">("reg");
  const [payment, setPayment] = useState<"transfer" | "ewallet">("transfer");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sub = subtotal((id) => lookup(id));
  const ship = sub === 0 ? 0 : shipping === "reg" ? (sub > 500000 ? 0 : 25000) : 45000;
  const total = sub + ship;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    try {
      const { orderNumber } = await createOrder(
        {
          customer: {
            name: String(fd.get("name") ?? ""),
            email: String(fd.get("email") ?? ""),
            phone: String(fd.get("phone") ?? ""),
          },
          shipping: {
            address: String(fd.get("address") ?? ""),
            city: String(fd.get("city") ?? ""),
            zip: String(fd.get("zip") ?? ""),
            method: shipping,
            cost: ship,
          },
          payment,
          items,
          subtotal: sub,
          total,
        },
        lookup,
      );
      clear();
      navigate({ to: "/pesanan/$orderNumber", params: { orderNumber } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-10 md:pt-16">
      <header className="mb-10 md:mb-14">
        <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-3">
          {step === "cart" ? "Keranjang" : "Checkout"}
        </p>
        <h1 className="font-display text-5xl md:text-7xl text-foreground">
          {step === "cart" ? "Keranjang Anda" : "Pembayaran"}
        </h1>
      </header>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-6">Keranjang Anda masih kosong.</p>
          <Link
            to="/katalog"
            className="inline-flex px-7 h-14 items-center bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.25em] hover:bg-foreground"
          >
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-12 lg:col-span-8">
            {step === "cart" && (
              <ul className="divide-y divide-border border-y border-border">
                {items.map((item, i) => {
                  const p = lookup(item.productId);
                  if (!p) return null;
                  return (
                    <li key={`${item.productId}-${item.color}-${item.size}`} className="py-6 flex gap-4 md:gap-6">
                      <Link
                        to="/produk/$slug"
                        params={{ slug: p.slug }}
                        className="block w-24 md:w-32 aspect-[3/4] overflow-hidden bg-muted shrink-0"
                      >
                        <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                      </Link>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between gap-3">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{p.category}</p>
                            <Link
                              to="/produk/$slug"
                              params={{ slug: p.slug }}
                              className="font-display text-xl md:text-2xl text-foreground hover:text-accent"
                            >
                              {p.name}
                            </Link>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {item.color} · {item.size}
                            </p>
                          </div>
                          <p className="text-sm md:text-base text-foreground whitespace-nowrap">
                            {formatIDR(p.price * item.qty)}
                          </p>
                        </div>
                        <div className="mt-auto pt-4 flex items-center justify-between">
                          <div className="inline-flex items-center border border-border">
                            <button
                              type="button"
                              onClick={() => updateQty(i, item.qty - 1)}
                              className="h-10 w-10 hover:bg-muted text-foreground"
                              aria-label="Kurangi"
                            >−</button>
                            <span className="w-10 text-center text-sm">{item.qty}</span>
                            <button
                              type="button"
                              onClick={() => updateQty(i, item.qty + 1)}
                              className="h-10 w-10 hover:bg-muted text-foreground"
                              aria-label="Tambah"
                            >+</button>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(i)}
                            className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-accent"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            {step === "checkout" && (
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-10">
                <fieldset className="space-y-4">
                  <legend className="text-[11px] uppercase tracking-[0.22em] text-foreground mb-4">
                    Informasi Kontak
                  </legend>
                  <Field label="Nama Lengkap" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                  <Field label="No. WhatsApp" name="phone" required />
                </fieldset>

                <fieldset className="space-y-4">
                  <legend className="text-[11px] uppercase tracking-[0.22em] text-foreground mb-4">
                    Alamat Pengiriman
                  </legend>
                  <Field label="Alamat" name="address" required />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Kota" name="city" required />
                    <Field label="Kode Pos" name="zip" required />
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-[11px] uppercase tracking-[0.22em] text-foreground mb-4">
                    Metode Pengiriman
                  </legend>
                  <div className="space-y-2">
                    <Radio
                      name="ship"
                      value="reg"
                      checked={shipping === "reg"}
                      onChange={() => setShipping("reg")}
                      label="Reguler (3–5 hari)"
                      sub={sub > 500000 ? "GRATIS" : formatIDR(25000)}
                    />
                    <Radio
                      name="ship"
                      value="exp"
                      checked={shipping === "exp"}
                      onChange={() => setShipping("exp")}
                      label="Express (1–2 hari)"
                      sub={formatIDR(45000)}
                    />
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-[11px] uppercase tracking-[0.22em] text-foreground mb-4">
                    Metode Pembayaran
                  </legend>
                  <div className="space-y-2">
                    <Radio
                      name="pay"
                      value="transfer"
                      checked={payment === "transfer"}
                      onChange={() => setPayment("transfer")}
                      label="Transfer Bank (BCA, Mandiri, BNI)"
                    />
                    <Radio
                      name="pay"
                      value="ewallet"
                      checked={payment === "ewallet"}
                      onChange={() => setPayment("ewallet")}
                      label="E-Wallet (GoPay, OVO, Dana)"
                    />
                  </div>
                </fieldset>

                {error && (
                  <p className="text-sm text-destructive border border-destructive/30 bg-destructive/5 px-4 py-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-14 bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.25em] hover:bg-foreground disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Memproses…" : `Selesaikan Pesanan ${formatIDR(total)}`}
                </button>
              </form>
            )}
          </div>

          {/* Summary */}
          <aside className="col-span-12 lg:col-span-4">
            <div className="bg-card p-6 md:p-8 lg:sticky lg:top-24">
              <h2 className="text-[11px] uppercase tracking-[0.22em] text-foreground mb-6">
                Ringkasan Pesanan
              </h2>
              <div className="space-y-3 text-sm">
                <Row label="Subtotal" value={formatIDR(sub)} />
                <Row label="Pengiriman" value={ship === 0 ? "Gratis" : formatIDR(ship)} />
              </div>
              <div className="mt-6 pt-6 border-t border-border flex justify-between items-baseline">
                <span className="text-[11px] uppercase tracking-[0.22em] text-foreground">Total</span>
                <span className="font-display text-3xl text-foreground">{formatIDR(total)}</span>
              </div>
              {step === "cart" ? (
                <button
                  type="button"
                  onClick={() => setStep("checkout")}
                  className="mt-8 w-full h-14 bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.25em] hover:bg-foreground"
                >
                  Checkout
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setStep("cart")}
                  className="mt-8 w-full h-12 border border-border text-foreground text-[11px] uppercase tracking-[0.22em] hover:border-foreground"
                >
                  ← Kembali ke Keranjang
                </button>
              )}
              <p className="mt-4 text-[11px] text-muted-foreground text-center">
                Pajak dihitung saat checkout.
              </p>
            </div>
          </aside>
        </div>
      )}
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

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full h-12 bg-transparent border-b border-border focus:border-accent focus:outline-none px-1 text-sm text-foreground transition"
      />
    </label>
  );
}

function Radio({
  name,
  value,
  checked,
  onChange,
  label,
  sub,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  sub?: string;
}) {
  return (
    <label
      className={`flex items-center justify-between gap-3 px-4 h-14 border cursor-pointer transition ${
        checked ? "border-accent bg-accent/5" : "border-border hover:border-foreground/40"
      }`}
    >
      <span className="flex items-center gap-3">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 accent-accent"
        />
        <span className="text-sm text-foreground">{label}</span>
      </span>
      {sub && <span className="text-xs text-muted-foreground uppercase tracking-wider">{sub}</span>}
    </label>
  );
}
