-- Add show_mega_menu column to mega_menu table
ALTER TABLE mega_menu 
ADD COLUMN IF NOT EXISTS show_mega_menu BOOLEAN DEFAULT true;

-- Update existing records to show mega menu by default
UPDATE mega_menu 
SET show_mega_menu = true 
WHERE show_mega_menu IS NULL;

-- For items like "Home" that should not show mega menu, update them
-- Example: UPDATE mega_menu SET show_mega_menu = false WHERE label = 'Home';
