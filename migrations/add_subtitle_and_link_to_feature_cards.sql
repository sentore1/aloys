-- Add subtitle and card_link columns to feature_cards table
ALTER TABLE feature_cards 
ADD COLUMN IF NOT EXISTS subtitle TEXT,
ADD COLUMN IF NOT EXISTS card_link TEXT;

-- Add comments
COMMENT ON COLUMN feature_cards.subtitle IS 'Optional subtitle text displayed below title';
COMMENT ON COLUMN feature_cards.card_link IS 'Optional URL to navigate when card is clicked';
