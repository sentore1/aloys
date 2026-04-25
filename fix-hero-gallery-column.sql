-- Fix hero_gallery_images column type
ALTER TABLE hero_sections 
ALTER COLUMN hero_gallery_images TYPE JSONB USING hero_gallery_images::JSONB;

-- Set default
ALTER TABLE hero_sections 
ALTER COLUMN hero_gallery_images SET DEFAULT '[]'::JSONB;

-- Update any NULL values
UPDATE hero_sections 
SET hero_gallery_images = '[]'::JSONB 
WHERE hero_gallery_images IS NULL;
