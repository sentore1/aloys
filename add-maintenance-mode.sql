-- Add maintenance mode columns to site_settings table
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS maintenance_mode BOOLEAN DEFAULT false;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS maintenance_title TEXT DEFAULT 'We''ll be back soon!';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS maintenance_message TEXT DEFAULT 'Our site is currently undergoing scheduled maintenance. We''ll be back shortly. Thank you for your patience.';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS maintenance_background_color TEXT DEFAULT '#ffffff';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS maintenance_text_color TEXT DEFAULT '#000000';

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';
