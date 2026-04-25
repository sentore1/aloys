-- Fix RLS policies for solutions table

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON solutions;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON solutions;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON solutions;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON solutions;

-- Create new policies
CREATE POLICY "Enable read access for all users"
ON solutions FOR SELECT
USING (true);

CREATE POLICY "Enable insert for authenticated users only"
ON solutions FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only"
ON solutions FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only"
ON solutions FOR DELETE
USING (auth.role() = 'authenticated');
