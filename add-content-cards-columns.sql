-- Add missing columns to content_cards table
ALTER TABLE content_cards ADD COLUMN IF NOT EXISTS button_text TEXT;
ALTER TABLE content_cards ADD COLUMN IF NOT EXISTS card_size TEXT DEFAULT 'medium';

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';
