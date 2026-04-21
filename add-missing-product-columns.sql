-- Add all missing columns to products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS slug TEXT,
ADD COLUMN IF NOT EXISTS sizes TEXT,
ADD COLUMN IF NOT EXISTS colors TEXT,
ADD COLUMN IF NOT EXISTS sale_end_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS viewers_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS seo_title TEXT,
ADD COLUMN IF NOT EXISTS seo_description TEXT,
ADD COLUMN IF NOT EXISTS seo_keywords TEXT;

-- Create index on slug for better performance
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

-- Reload schema cache
NOTIFY pgrst, 'reload schema';
