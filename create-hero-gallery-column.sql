-- Add hero_gallery_images column as JSONB
ALTER TABLE hero_sections 
ADD COLUMN hero_gallery_images JSONB DEFAULT '[]'::JSONB;

-- Update existing records
UPDATE hero_sections 
SET hero_gallery_images = '[]'::JSONB 
WHERE hero_gallery_images IS NULL;
