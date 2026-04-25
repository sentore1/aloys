-- Create features table
CREATE TABLE IF NOT EXISTS features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  position INTEGER DEFAULT 0,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create solutions table
CREATE TABLE IF NOT EXISTS solutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  features JSONB DEFAULT '[]',
  link TEXT,
  position INTEGER DEFAULT 0,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create footer locations table
CREATE TABLE IF NOT EXISTS footer_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  map_embed TEXT,
  position INTEGER DEFAULT 0,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default features
INSERT INTO features (icon, title, description, position) VALUES
  ('headphones', 'Customer Support', 'Nationwide expert support available 24/7 for all your needs', 0),
  ('check', 'Quality', 'Guaranteed genuine products backed by manufacturer warranty', 1),
  ('tag', 'Pricing', 'Competitive pricing with flexible payment options', 2);

-- Insert default solutions
INSERT INTO solutions (title, description, image, features, link, position) VALUES
  (
    'InfoEventz',
    'A comprehensive event management platform that streamlines registration, attendee tracking, and badge printing. Perfect for conferences, exhibitions, and corporate events.',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
    '["Event registration", "Badge printing", "Attendee tracking"]',
    '/solutions/infoeventz',
    0
  ),
  (
    'InfoBookz',
    'Library management system designed to automate book cataloging, member management, and lending operations. Simplify library operations with our intuitive solution.',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600',
    '["Book cataloging", "Member management", "Lending operations"]',
    '/solutions/infobookz',
    1
  ),
  (
    'InfoAsset',
    'Complete asset tracking and management solution. Track your company assets, manage maintenance schedules, and generate comprehensive reports.',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600',
    '["Asset tracking", "Maintenance scheduling", "Comprehensive reports"]',
    '/solutions/infoasset',
    2
  ),
  (
    'InfoID',
    'Professional ID card design and printing software. Create stunning employee badges, student IDs, and access cards with ease.',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600',
    '["Card design", "Batch printing", "Database integration"]',
    '/solutions/infoid',
    3
  ),
  (
    'InfoDz',
    'Document management and digitization solution. Organize, store, and retrieve documents efficiently with powerful search capabilities.',
    'https://images.unsplash.com/photo-1568667256549-094345857637?w=600',
    '["Document scanning", "OCR technology", "Cloud storage"]',
    '/solutions/infodz',
    4
  );

-- Insert default footer locations
INSERT INTO footer_locations (title, address, phone, map_embed, position) VALUES
  (
    'Head Office',
    'Office 14, Al Owais Building, Al Qusais, Dubai, UAE',
    '+971 4 234 5678',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.0!2d55.3!3d25.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDEyJzAwLjAiTiA1NcKwMTgnMDAuMCJF!5e0!3m2!1sen!2sae!4v1234567890',
    0
  ),
  (
    'Abu Dhabi',
    'Office 205, Business Center, Electra Street, Abu Dhabi, UAE',
    '+971 2 345 6789',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.0!2d54.3!3d24.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDI0JzAwLjAiTiA1NMKwMTgnMDAuMCJF!5e0!3m2!1sen!2sae!4v1234567890',
    1
  ),
  (
    'KSA',
    'Office 301, Tower A, King Fahd Road, Riyadh, Saudi Arabia',
    '+966 11 234 5678',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.0!2d46.7!3d24.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzAwLjAiTiA0NsKwNDInMDAuMCJF!5e0!3m2!1sen!2ssa!4v1234567890',
    2
  );

-- Enable RLS
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer_locations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read" ON features FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON solutions FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON footer_locations FOR SELECT USING (true);
