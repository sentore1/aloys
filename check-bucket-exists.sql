-- Check if product-images bucket exists
SELECT id, name, public FROM storage.buckets WHERE id = 'product-images';
