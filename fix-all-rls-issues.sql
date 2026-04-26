-- ============================================
-- COMPREHENSIVE FIX FOR ALL RLS ISSUES
-- ============================================

-- 1. Fix brands table RLS
DROP POLICY IF EXISTS "Allow public read" ON brands;
CREATE POLICY "Allow public read" ON brands FOR SELECT USING (true);
CREATE POLICY "Allow all operations" ON brands FOR ALL USING (true) WITH CHECK (true);

-- 2. Fix partnerships table RLS
DROP POLICY IF EXISTS "Allow public read" ON partnerships;
CREATE POLICY "Allow public read" ON partnerships FOR SELECT USING (true);
CREATE POLICY "Allow all operations" ON partnerships FOR ALL USING (true) WITH CHECK (true);

-- 3. Fix categories_with_icons table RLS
DROP POLICY IF EXISTS "Allow public read" ON categories_with_icons;
CREATE POLICY "Allow public read" ON categories_with_icons FOR SELECT USING (true);
CREATE POLICY "Allow all operations" ON categories_with_icons FOR ALL USING (true) WITH CHECK (true);

-- 4. Fix storage bucket and policies
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public Access product-images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload product-images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update product-images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete product-images" ON storage.objects;

CREATE POLICY "Public Access product-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Anyone can upload product-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Anyone can update product-images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images');

CREATE POLICY "Anyone can delete product-images"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images');
