-- Fix RLS policies for categories_with_icons table
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read" ON categories_with_icons;

-- Create comprehensive policies
CREATE POLICY "Allow public read" ON categories_with_icons 
  FOR SELECT USING (true);

CREATE POLICY "Allow all operations" ON categories_with_icons 
  FOR ALL USING (true) WITH CHECK (true);
