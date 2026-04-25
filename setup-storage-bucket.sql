-- Create storage bucket for product images (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop existing policies for product-images bucket
DROP POLICY IF EXISTS "Public Access product-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload product-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update product-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete product-images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload product-images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update product-images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete product-images" ON storage.objects;

-- Create new policies with unique names for product-images bucket
CREATE POLICY "Public Access product-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Anyone can upload product-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Anyone can update product-images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Anyone can delete product-images"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images');
