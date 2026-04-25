-- Add card_link column to featured_cards table
ALTER TABLE featured_cards 
ADD COLUMN IF NOT EXISTS card_link TEXT;

-- Add comment
COMMENT ON COLUMN featured_cards.card_link IS 'Optional URL to navigate when card is clicked';
