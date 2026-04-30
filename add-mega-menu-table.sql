-- Create mega_menu table for managing navigation
CREATE TABLE IF NOT EXISTS mega_menu (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  href VARCHAR(500),
  parent_id UUID REFERENCES mega_menu(id) ON DELETE CASCADE,
  description TEXT,
  position INTEGER DEFAULT 0,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE mega_menu ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Mega menu is viewable by everyone" ON mega_menu FOR SELECT USING (true);
CREATE POLICY "Admin can manage mega menu" ON mega_menu FOR ALL USING (true);

-- Create indexes
CREATE INDEX idx_mega_menu_parent_id ON mega_menu(parent_id);
CREATE INDEX idx_mega_menu_position ON mega_menu(position);
CREATE INDEX idx_mega_menu_enabled ON mega_menu(enabled);

-- Insert default menu items
INSERT INTO mega_menu (label, href, parent_id, position, enabled) VALUES
('Home', '/', NULL, 0, true),
('Products', '/products', NULL, 1, true),
('Solutions', '/solutions', NULL, 2, true),
('Support', '/support', NULL, 3, true),
('Contact', '/contact', NULL, 4, true);

-- Get the Products menu item ID for submenu items
DO $$
DECLARE
  products_id UUID;
BEGIN
  SELECT id INTO products_id FROM mega_menu WHERE label = 'Products' AND parent_id IS NULL;
  
  -- Insert Products submenu items
  INSERT INTO mega_menu (label, href, parent_id, description, position, enabled) VALUES
  ('All Products', '/products', products_id, 'Browse all items', 0, true),
  ('Laptop', '/products?category=laptop', products_id, 'High-performance laptops', 1, true),
  ('Servers', '/servers', products_id, 'Enterprise servers', 2, true),
  ('Biometric Devices', '/biometric-devices', products_id, 'Security solutions', 3, true),
  ('ID Card Printers', '/id-card-printers', products_id, 'Professional printers', 4, true);
END $$;

-- Get the Solutions menu item ID for submenu items
DO $$
DECLARE
  solutions_id UUID;
BEGIN
  SELECT id INTO solutions_id FROM mega_menu WHERE label = 'Solutions' AND parent_id IS NULL;
  
  -- Insert Solutions submenu items
  INSERT INTO mega_menu (label, href, parent_id, description, position, enabled) VALUES
  ('All Solutions', '/solutions', solutions_id, 'View all solutions', 0, true);
END $$;
