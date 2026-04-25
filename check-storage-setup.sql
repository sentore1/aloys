-- Check if storage bucket exists
SELECT * FROM storage.buckets WHERE id = 'product-images';

-- Check storage policies
SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';

-- If bucket doesn't exist, create it manually:
-- Go to Supabase Dashboard > Storage > Create a new bucket
-- Name: product-images
-- Public: Yes (checked)
-- File size limit: 50MB
-- Allowed MIME types: image/*
