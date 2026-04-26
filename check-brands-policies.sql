-- Check brands table policies
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE tablename = 'brands';

-- Check if RLS is enabled on brands
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'brands';
