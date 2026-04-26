-- Check RLS policies for brands table
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename = 'brands';

-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'brands';

-- Check if bucket exists
SELECT * FROM storage.buckets WHERE id = 'product-images';

-- Check storage object policies
SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';
