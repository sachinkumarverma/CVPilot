-- Migration: Create _health_check table for read-only keep-alive queries
-- Description: Creates a lightweight table with 1 row, enables RLS, and grants read-only access to anon and authenticated roles.

CREATE TABLE IF NOT EXISTS public._health_check (
    id integer PRIMARY KEY,
    status text NOT NULL,
    updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public._health_check ENABLE ROW LEVEL SECURITY;

-- Insert the fixed health-check row if not present
INSERT INTO public._health_check (id, status)
VALUES (1, 'ok')
ON CONFLICT (id) DO UPDATE SET status = 'ok';

-- Allow read-only (SELECT) access for anon and authenticated users
DROP POLICY IF EXISTS "Allow public read-only access to _health_check" ON public._health_check;
CREATE POLICY "Allow public read-only access to _health_check"
ON public._health_check
FOR SELECT
TO anon, authenticated
USING (true);

-- Ensure anon and authenticated roles have table-level SELECT permission
GRANT SELECT ON public._health_check TO anon, authenticated;
