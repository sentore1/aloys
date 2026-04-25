# Featured Card & Feature Cards Setup Guide

## Overview
There are TWO different card systems:

1. **Featured Card** (NEW) - Single large card above "All Products" with hover details
2. **Feature Cards** (EXISTING) - Carousel of trending products with images

---

## Setup Instructions

### Step 1: Run SQL Migrations in Supabase

Go to your Supabase Dashboard → SQL Editor and run these two migrations:

#### Migration 1: Featured Card (Single Card Above Products)
```sql
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_featured_cards_enabled ON featured_cards(enabled);
CREATE INDEX IF NOT EXISTS idx_featured_cards_position ON featured_cards(position);
```

#### Migration 2: Feature Cards (Trending Products Carousel)
```sql
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
  ('Access Control', 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=300&fit=crop', '#10b981', 1, true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_feature_cards_enabled ON feature_cards(enabled);
CREATE INDEX IF NOT EXISTS idx_feature_cards_position ON feature_cards(position);
```

---

### Step 2: Manage Content in Admin Panel

Go to `/admin` and you'll see two tabs:

#### "Featured Card" Tab
- Manage the single large card that appears above "All Products"
- Customize title, subtitle, button text/link
- Set background and text colors
- Add hover details text
- Enable/disable the card

#### "Feature Cards" Tab
- Manage the trending products carousel
- Add multiple cards with images
- Set background colors for each card
- Reorder cards with up/down arrows
- Enable/disable individual cards

---

### Step 3: Verify on Landing Page

Visit your homepage and you should see:

1. **Featured Card** - Large red card above "All Products" section
   - Hover over it to see details overlay

2. **Feature Cards** - Carousel section labeled "Trending Products"
   - Shows 2 cards at a time
   - Auto-plays every 5 seconds
   - Navigation arrows if more than 2 cards

---

## Troubleshooting

### Featured Card not showing?
- Check if table exists in Supabase
- Verify at least one card is enabled in admin
- Check browser console for errors

### Feature Cards not showing?
- Run the feature_cards migration
- Add at least one card in admin with an image URL
- Make sure cards are enabled

### Admin panel not loading?
- Clear browser cache
- Check Supabase connection
- Verify you're logged in as admin

---

## Quick Test

1. Run both SQL migrations
2. Go to `/admin`
3. Click "Featured Card" tab - you should see the sample card
4. Click "Feature Cards" tab - click "Add Card" and fill in details
5. Visit homepage - both should be visible
