-- Tighten SELECT policies so orders are not publicly listable.
-- Customers will look up their order via a SECURITY DEFINER function that
-- requires the full secret order_number.

DROP POLICY IF EXISTS "Anyone can view order by number" ON public.orders;
DROP POLICY IF EXISTS "Anyone can view order items" ON public.order_items;

-- No SELECT policy = nothing is selectable via PostgREST directly.

-- Function returns order + items as JSON only when the secret order_number matches.
CREATE OR REPLACE FUNCTION public.get_order_by_number(p_order_number TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
DECLARE
  v_order public.orders;
  v_items JSONB;
BEGIN
  IF p_order_number IS NULL OR length(p_order_number) < 12 THEN
    RETURN NULL;
  END IF;

  SELECT * INTO v_order FROM public.orders WHERE order_number = p_order_number;
  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  SELECT COALESCE(jsonb_agg(to_jsonb(oi.*) ORDER BY oi.created_at), '[]'::jsonb)
  INTO v_items
  FROM public.order_items oi
  WHERE oi.order_id = v_order.id;

  RETURN jsonb_build_object(
    'order', to_jsonb(v_order),
    'items', v_items
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_order_by_number(TEXT) TO anon, authenticated;