-- Fix RLS policies for partnerships table

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON partnerships;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON partnerships;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON partnerships;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON partnerships;

-- Create new policies
CREATE POLICY "Enable read access for all users"
ON partnerships FOR SELECT
USING (true);

CREATE POLICY "Enable insert for authenticated users only"
ON partnerships FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only"
ON partnerships FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only"
ON partnerships FOR DELETE
USING (auth.role() = 'authenticated');
