-- Create featured_cards table for CMS-controlled featured card section
CREATE TABLE IF NOT EXISTS featured_cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  button_text TEXT NOT NULL DEFAULT 'Contact Now',
  button_link TEXT NOT NULL DEFAULT '#',
  background_color TEXT NOT NULL DEFAULT '#dc2626',
  text_color TEXT NOT NULL DEFAULT '#ffffff',
  details TEXT NOT NULL,
  enabled BOOLEAN DEFAULT true,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample featured card
INSERT INTO featured_cards (title, subtitle, button_text, button_link, background_color, text_color, details, enabled, position)
VALUES (
  'IT, Security and Identification solutions.',
  'We provide cutting-edge products & solutions for all your enterprise demands.',
  'Contact Now',
  '/support',
  '#dc2626',
  '#ffffff',
  'Our comprehensive solutions include biometric devices, access control systems, ID card printers, and enterprise servers. We partner with leading brands to deliver reliable, secure, and scalable technology solutions tailored to your business needs.',
  true,
  0
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_featured_cards_enabled ON featured_cards(enabled);
CREATE INDEX IF NOT EXISTS idx_featured_cards_position ON featured_cards(position);
