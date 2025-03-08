
-- This function increments the coin counter in a thread-safe way
CREATE OR REPLACE FUNCTION public.increment_coin_counter(row_id INTEGER DEFAULT 1)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_count INTEGER;
BEGIN
  UPDATE public.coin_counter
  SET count = count + 1
  WHERE id = row_id
  RETURNING count INTO new_count;
  
  RETURN new_count;
END;
$$;
