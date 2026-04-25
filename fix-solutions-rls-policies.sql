-- Fix RLS policies for solutions table to allow admin operations

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow public read" ON solutions;
DROP POLICY IF EXISTS "Allow admin all" ON solutions;

-- Create new policies
-- Allow public to read enabled solutions
CREATE POLICY "Allow public read" ON solutions
  FOR SELECT
  USING (true);

-- Allow authenticated users (admin) to do everything
CREATE POLICY "Allow admin all" ON solutions
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Alternative: If the above doesn't work, use this simpler version
-- This allows all operations for authenticated users
DROP POLICY IF EXISTS "Allow admin insert" ON solutions;
DROP POLICY IF EXISTS "Allow admin update" ON solutions;
DROP POLICY IF EXISTS "Allow admin delete" ON solutions;

CREATE POLICY "Allow admin insert" ON solutions
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow admin update" ON solutions
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow admin delete" ON solutions
  FOR DELETE
  USING (auth.role() = 'authenticated');
