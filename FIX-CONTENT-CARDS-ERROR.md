# Fix Content Cards Schema Error

## Problem
Error: "Could not find the 'button_text' column of 'content_cards' in the schema cache"

## Solution

### Step 1: Add Missing Columns
Run this SQL in your Supabase SQL Editor:

```sql
-- Add missing columns to content_cards table
ALTER TABLE content_cards ADD COLUMN IF NOT EXISTS button_text TEXT;
ALTER TABLE content_cards ADD COLUMN IF NOT EXISTS card_size TEXT DEFAULT 'medium';

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';
```

### Step 2: Restart Supabase (if needed)
If the error persists after running the SQL:
1. Go to Supabase Dashboard
2. Navigate to Project Settings → API
3. Click "Restart" on the PostgREST server

### Step 3: Clear Browser Cache
1. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Or clear browser cache and reload

## Alternative: Recreate Table
If the above doesn't work, drop and recreate the table:

```sql
-- Backup existing data first!
CREATE TABLE content_cards_backup AS SELECT * FROM content_cards;

-- Drop and recreate
DROP TABLE content_cards CASCADE;

-- Run the full create script
CREATE TABLE content_cards (
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

ALTER TABLE content_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON content_cards FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON content_cards FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON content_cards FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON content_cards FOR DELETE USING (auth.role() = 'authenticated');

-- Restore data
INSERT INTO content_cards SELECT * FROM content_cards_backup;
```

## Image Upload Feature
Now you can upload images directly:
1. Click "Edit" on a card
2. In the "Background Image" section, click "Upload Image"
3. Select an image file from your computer
4. The image will be uploaded to Supabase Storage and the URL will be automatically filled

Note: Make sure you have a storage bucket named "images" in your Supabase project with public access enabled.
