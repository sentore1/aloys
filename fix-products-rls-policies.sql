-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow public read access" ON products;
DROP POLICY IF EXISTS "Allow admin write access" ON products;
DROP POLICY IF EXISTS "Allow authenticated users to insert" ON products;
DROP POLICY IF EXISTS "Allow authenticated users to update" ON products;
DROP POLICY IF EXISTS "Allow authenticated users to delete" ON products;

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read products
CREATE POLICY "Allow public read access" ON products
  FOR SELECT
  USING (true);

-- Allow authenticated users (admin) to insert products
CREATE POLICY "Allow authenticated insert" ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users (admin) to update products
CREATE POLICY "Allow authenticated update" ON products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users (admin) to delete products
CREATE POLICY "Allow authenticated delete" ON products
  FOR DELETE
  TO authenticated
  USING (true);

-- Reload schema
NOTIFY pgrst, 'reload schema';
