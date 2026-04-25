-- Add image_style column to feature_cards table
ALTER TABLE feature_cards 
ADD COLUMN IF NOT EXISTS image_style TEXT DEFAULT 'side';

-- Add comment
COMMENT ON COLUMN feature_cards.image_style IS 'Image display style: side (image on right) or cover (full background)';

-- Update existing cards to use side style
UPDATE feature_cards SET image_style = 'side' WHERE image_style IS NULL;
