
-- This function increments the coin counter in a thread-safe way
CREATE OR REPLACE FUNCTION public.increment_coin_counter(row_id INTEGER DEFAULT 1)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.coin_counter
  SET count = count + 1
  WHERE id = row_id;
END;
$$;
