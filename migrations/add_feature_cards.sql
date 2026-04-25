-- Create feature_cards table (trending products carousel)
CREATE TABLE IF NOT EXISTS feature_cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  bg_color TEXT DEFAULT '#f3f4f6',
  position INTEGER DEFAULT 0,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample feature cards
INSERT INTO feature_cards (title, image, bg_color, position, enabled)
VALUES 
  ('Biometric Devices', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', '#3b82f6', 0, true),
  ('Access Control', 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=300&fit=crop', '#10b981', 1, true)
ON CONFLICT DO NOTHING;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_feature_cards_enabled ON feature_cards(enabled);
CREATE INDEX IF NOT EXISTS idx_feature_cards_position ON feature_cards(position);
