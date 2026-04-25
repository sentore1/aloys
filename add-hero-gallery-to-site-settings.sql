-- Add hero_gallery column to site_settings for carousel images
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS hero_gallery JSONB DEFAULT '[]';

-- Update existing row to have empty array if null
UPDATE site_settings SET hero_gallery = '[]' WHERE hero_gallery IS NULL;
