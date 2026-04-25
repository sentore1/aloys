# Content Cards Setup Guide

## Overview
A new CMS-controlled section has been added to display customizable content cards on your landing page, similar to the image you provided. These cards can showcase IT solutions, services, or any promotional content.

## Setup Steps

### 1. Create the Database Table
Run the SQL script to create the `content_cards` table:

```bash
# Execute the SQL file in your Supabase SQL editor
cat create-content-cards-table.sql
```

Or manually run this SQL in Supabase:

```sql
CREATE TABLE IF NOT EXISTS content_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image TEXT,
  background_color TEXT DEFAULT '#ef4444',
  text_color TEXT DEFAULT '#ffffff',
  link TEXT,
  position INTEGER DEFAULT 0,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE content_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON content_cards FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON content_cards FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON content_cards FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON content_cards FOR DELETE USING (auth.role() = 'authenticated');
```

### 2. Access the Admin Panel
1. Go to `/admin` in your browser
2. Login with your admin credentials
3. Click on the "Content Cards" tab

### 3. Add Content Cards
For each card you want to add:
1. Click "Add Card"
2. Fill in the details:
   - **Title**: Main heading (e.g., "IT, Security and Identification solutions")
   - **Description**: Supporting text
   - **Image**: Background image URL (optional)
   - **Background Color**: Card background color (default: red #ef4444)
   - **Text Color**: Text color (default: white #ffffff)
   - **Link**: Where the card should link to
3. Use the preview to see how it looks
4. Click "Save"
5. Toggle "Enabled" to show/hide the card

### 4. Manage Cards
- **Reorder**: Use the up/down arrows to change card positions
- **Edit**: Click "Edit" to modify card details
- **Delete**: Click the trash icon to remove a card
- **Enable/Disable**: Toggle the checkbox to show/hide cards

## Features

### Card Customization
- Custom background colors
- Custom text colors
- Background images with overlay effect
- Responsive grid layout (1-4 columns based on screen size)
- Hover effects with smooth transitions

### Layout
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 4 columns
- Cards automatically adjust height to content

### Example Cards
Based on your image, you can create cards like:

1. **Hero Card** (Red background)
   - Title: "IT, Security and Identification solutions"
   - Description: "We provide cutting-edge products & solutions for all your information security."
   - Background: #ef4444 (red)

2. **Infome Technologies** (Dark background with image)
   - Title: "Infome Technologies: Leading IT Solutions in the UAE"
   - Background: Dark with tech image

3. **IT & Security Solutions** (Dark background)
   - Title: "Comprehensive IT & Security Solutions"
   - Description: "All-in-one, end-to-end innovative solutions..."

4. **Software Solutions** (Red background)
   - Title: "UAE's #1 Choice for Hardware and Software Solutions"

## Location on Page
The Content Cards section appears on the landing page:
- After the Solutions section
- Before the Brands section
- Below the products grid

## Tips
- Use high-contrast color combinations for readability
- Keep titles concise (2-3 lines max)
- Use consistent styling across cards for a professional look
- Test on mobile devices to ensure text is readable
- Use the preview in the admin panel before saving

## Troubleshooting
- If cards don't appear, check that they are enabled in the admin panel
- Ensure the database table was created successfully
- Check browser console for any errors
- Verify RLS policies are set correctly in Supabase
