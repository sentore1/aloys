-- Add category field to categories_with_icons table
ALTER TABLE categories_with_icons 
ADD COLUMN IF NOT EXISTS category TEXT;

-- Add comment
COMMENT ON COLUMN categories_with_icons.category IS 'Product category to filter by when this icon is clicked. Should match a category name from the categories table.';

-- Optional: Update existing categories with matching names
-- Uncomment the lines below if you want to auto-match existing categories
-- UPDATE categories_with_icons 
-- SET category = LOWER(REPLACE(REPLACE(name, ' & ', '-'), ' ', '-'))
-- WHERE category IS NULL;
