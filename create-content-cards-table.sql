-- Create content_cards table
CREATE TABLE IF NOT EXISTS content_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image TEXT,
  background_color TEXT DEFAULT '#ef4444',
  text_color TEXT DEFAULT '#ffffff',
  link TEXT,
  button_text TEXT,
  card_size TEXT DEFAULT 'medium',
  position INTEGER DEFAULT 0,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE content_cards ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON content_cards FOR SELECT USING (true);

-- Allow authenticated users to manage
CREATE POLICY "Allow authenticated insert" ON content_cards FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON content_cards FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON content_cards FOR DELETE USING (auth.role() = 'authenticated');
