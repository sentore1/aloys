-- Fix footer_locations table delete permissions
-- Run this in your Supabase SQL Editor

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow public read access" ON footer_locations;
DROP POLICY IF EXISTS "Allow authenticated users full access" ON footer_locations;

-- Enable RLS
ALTER TABLE footer_locations ENABLE ROW LEVEL SECURITY;

-- Allow public to read enabled locations
CREATE POLICY "Allow public read access"
ON footer_locations
FOR SELECT
TO public
USING (true);

-- Allow authenticated users (admin) full access
CREATE POLICY "Allow authenticated users full access"
ON footer_locations
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
