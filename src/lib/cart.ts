import { useEffect, useState } from "react";
import type { Product } from "./products";

export type CartItem = {
  productId: string;
  size: string;
  color: string;
  qty: number;
};

const KEY = "zaheedna-cart-v1";

const read = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};

const write = (items: CartItem[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("zaheedna-cart-change"));
};

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(read());
    const onChange = () => setItems(read());
    window.addEventListener("zaheedna-cart-change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("zaheedna-cart-change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const add = (item: CartItem) => {
    const next = [...read()];
    const idx = next.findIndex(
      (i) => i.productId === item.productId && i.size === item.size && i.color === item.color,
    );
    if (idx >= 0) next[idx].qty += item.qty;
    else next.push(item);
    write(next);
  };

  const remove = (idx: number) => {
    const next = read().filter((_, i) => i !== idx);
    write(next);
  };

  const updateQty = (idx: number, qty: number) => {
    const next = [...read()];
    if (next[idx]) {
      next[idx].qty = Math.max(1, qty);
      write(next);
    }
  };

  const clear = () => write([]);

  const count = items.reduce((sum, i) => sum + i.qty, 0);

  const subtotal = (lookup: (id: string) => Product | undefined) =>
    items.reduce((sum, i) => sum + (lookup(i.productId)?.price ?? 0) * i.qty, 0);

  return { items, add, remove, updateQty, clear, count, subtotal };
}
