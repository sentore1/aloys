-- Create brands table
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo TEXT NOT NULL,
  position INTEGER DEFAULT 0,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create partnerships/certificates table
CREATE TABLE IF NOT EXISTS partnerships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  certificate_image TEXT NOT NULL,
  position INTEGER DEFAULT 0,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default brands
INSERT INTO brands (name, logo, position) VALUES
  ('Hewlett Packard Enterprise', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Hewlett_Packard_Enterprise_logo.svg/320px-Hewlett_Packard_Enterprise_logo.svg.png', 0),
  ('Dell', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/200px-Dell_Logo.svg.png', 1),
  ('Heidi', 'https://www.hid-me.com/wp-content/uploads/2021/03/HID-Heidi-Logo.png', 2),
  ('Evolis', 'https://www.evolis.com/sites/default/files/logo_evolis_2022.png', 3),
  ('HID', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/HID_Global_logo.svg/200px-HID_Global_logo.svg.png', 4),
  ('Zebra', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Zebra_Technologies_logo.svg/200px-Zebra_Technologies_logo.svg.png', 5);

-- Insert default partnership
INSERT INTO partnerships (title, subtitle, description, certificate_image, position) VALUES
  (
    'Heidi ID Card Printers',
    'Authorized Distributor',
    'Infome Technologies is an authorized distributor of Heidi card printers and Hedi consumables in the UAE, delivering reliable and high-performance ID printing solutions.',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600',
    0
  );

-- Enable RLS
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnerships ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read" ON brands FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON partnerships FOR SELECT USING (true);
