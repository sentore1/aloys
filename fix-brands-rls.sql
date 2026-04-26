-- Fix RLS policies for brands table
DROP POLICY IF EXISTS "Allow public read" ON brands;

CREATE POLICY "Allow public read" ON brands 
  FOR SELECT USING (true);

CREATE POLICY "Allow all operations" ON brands 
  FOR ALL USING (true) WITH CHECK (true);

-- Also fix partnerships table while we're at it
DROP POLICY IF EXISTS "Allow public read" ON partnerships;

CREATE POLICY "Allow public read" ON partnerships 
  FOR SELECT USING (true);

CREATE POLICY "Allow all operations" ON partnerships 
  FOR ALL USING (true) WITH CHECK (true);
