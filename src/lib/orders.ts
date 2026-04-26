import { supabase } from "@/integrations/supabase/client";
import type { CartItem } from "./cart";
import type { Product } from "./products";

export type CheckoutInput = {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shipping: {
    address: string;
    city: string;
    zip: string;
    method: "reg" | "exp";
    cost: number;
  };
  payment: "transfer" | "ewallet";
  items: CartItem[];
  subtotal: number;
  total: number;
};

// Generates a unique, hard-to-guess order number that doubles as a lookup token.
// Example: ZHN-1A2B3C4D-5E6F7G
function generateOrderNumber(): string {
  const rand = (n: number) =>
    Array.from(crypto.getRandomValues(new Uint8Array(n)))
      .map((b) => "ABCDEFGHJKMNPQRSTUVWXYZ23456789"[b % 31])
      .join("");
  return `ZHN-${rand(8)}-${rand(6)}`;
}

export async function createOrder(
  input: CheckoutInput,
  lookup: (id: string) => Product | undefined,
): Promise<{ orderNumber: string }> {
  const orderNumber = generateOrderNumber();

  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .insert({
      order_number: orderNumber,
      customer_name: input.customer.name,
      customer_email: input.customer.email,
      customer_phone: input.customer.phone,
      shipping_address: input.shipping.address,
      shipping_city: input.shipping.city,
      shipping_zip: input.shipping.zip,
      shipping_method: input.shipping.method === "reg" ? "Reguler (3-5 hari)" : "Express (1-2 hari)",
      shipping_cost: input.shipping.cost,
      payment_method: input.payment === "transfer" ? "Transfer Bank" : "E-Wallet",
      subtotal: input.subtotal,
      total: input.total,
      status: "pending",
    })
    .select("id, order_number")
    .maybeSingle();

  if (orderErr || !order) {
    throw new Error(orderErr?.message ?? "Gagal membuat pesanan");
  }

  const itemsPayload = input.items
    .map((it) => {
      const p = lookup(it.productId);
      if (!p) return null;
      return {
        order_id: order.id,
        product_id: p.id,
        product_slug: p.slug,
        product_name: p.name,
        product_image: p.image,
        color: it.color,
        size: it.size,
        quantity: it.qty,
        price: p.price,
      };
    })
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const { error: itemsErr } = await supabase.from("order_items").insert(itemsPayload);
  if (itemsErr) {
    throw new Error(itemsErr.message);
  }

  return { orderNumber: order.order_number };
}

export type OrderRecord = {
  order: {
    id: string;
    order_number: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    shipping_address: string;
    shipping_city: string;
    shipping_zip: string;
    shipping_method: string;
    shipping_cost: number;
    payment_method: string;
    subtotal: number;
    total: number;
    status: string;
    created_at: string;
  };
  items: Array<{
    id: string;
    product_name: string;
    product_slug: string;
    product_image: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
  }>;
};

export async function fetchOrderByNumber(orderNumber: string): Promise<OrderRecord | null> {
  const { data, error } = await supabase.rpc("get_order_by_number", {
    p_order_number: orderNumber,
  });
  if (error) throw new Error(error.message);
  return (data as OrderRecord | null) ?? null;
}
