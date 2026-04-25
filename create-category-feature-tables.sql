-- Create categories table with icons
CREATE TABLE IF NOT EXISTS categories_with_icons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  position INTEGER DEFAULT 0,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feature cards table
CREATE TABLE IF NOT EXISTS feature_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  bg_color TEXT DEFAULT '#f3f4f6',
  position INTEGER DEFAULT 0,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories_with_icons (name, icon, position) VALUES
  ('Server & Storage', 'monitor', 0),
  ('ID Card Printers', 'printer', 1),
  ('Solutions', 'cloud', 2),
  ('Attendance & Access Control', 'fingerprint', 3),
  ('Cards', 'card', 4),
  ('Mobile Computers', 'smartphone', 5),
  ('Biometric & Card Readers', 'idcard', 6);

-- Insert default feature cards
INSERT INTO feature_cards (title, image, bg_color, position) VALUES
  ('CASSIDA NEO MAX', 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400', '#7f1d1d', 0),
  ('HPE SERVER', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400', '#14b8a6', 1),
  ('ZEBRA PRINTERS', 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400', '#1e40af', 2),
  ('HID ACCESS CONTROL', 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400', '#7c3aed', 3),
  ('DELL WORKSTATIONS', 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400', '#059669', 4),
  ('EVOLIS CARD PRINTERS', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400', '#dc2626', 5);

-- Enable RLS
ALTER TABLE categories_with_icons ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_cards ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read" ON categories_with_icons FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON feature_cards FOR SELECT USING (true);
