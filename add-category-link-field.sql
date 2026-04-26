-- Add link field to categories_with_icons table
ALTER TABLE categories_with_icons 
ADD COLUMN IF NOT EXISTS link TEXT;

-- Add comment
COMMENT ON COLUMN categories_with_icons.link IS 'Optional custom link for the category. If not set, will default to /products?category=slug';
