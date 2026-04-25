-- Add footer color settings to site_settings table
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS footer_bg_color_start VARCHAR(7) DEFAULT '#dc2626',
ADD COLUMN IF NOT EXISTS footer_bg_color_end VARCHAR(7) DEFAULT '#b91c1c',
ADD COLUMN IF NOT EXISTS footer_branding_bg_color VARCHAR(7) DEFAULT '#ffffff';

-- Update existing row with default values if they don't exist
UPDATE site_settings 
SET 
  footer_bg_color_start = COALESCE(footer_bg_color_start, '#dc2626'),
  footer_bg_color_end = COALESCE(footer_bg_color_end, '#b91c1c'),
  footer_branding_bg_color = COALESCE(footer_branding_bg_color, '#ffffff')
WHERE id IS NOT NULL;
