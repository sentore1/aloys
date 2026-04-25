# Hero Section, Category Icons & Feature Cards Setup

## Overview
This update adds three new sections to your homepage:
1. **Hero Slider** - Improved carousel with multiple slides
2. **Category Icons** - Icon-based category navigation (like the reference image)
3. **Feature Cards** - Large promotional cards with images and titles

## Setup Instructions

### Step 1: Create Database Tables
Run the SQL migration file to create the necessary tables:

```bash
# Execute the SQL file in your Supabase SQL Editor
d:\aloys\create-category-feature-tables.sql
```

This will create:
- `categories_with_icons` table with default categories
- `feature_cards` table with sample cards

### Step 2: Access Admin Panel
1. Go to `/admin` in your browser
2. You'll see two new tabs:
   - **Category Icons** - Manage category icons
   - **Feature Cards** - Manage feature/trending product cards

### Step 3: Configure Category Icons
In the **Category Icons** tab:
- Add/edit/remove categories
- Choose icons: monitor, printer, cloud, fingerprint, card, smartphone, idcard
- Reorder categories using up/down arrows
- Enable/disable categories

### Step 4: Configure Feature Cards
In the **Feature Cards** tab:
- Add promotional cards (like "CASSIDA NEO MAX", "HPE SERVER")
- Set title, image URL, and background color
- Reorder cards
- Enable/disable cards

### Step 5: Configure Hero Sections
In the **Hero Sections** tab:
- Create multiple hero sliders
- Choose between: Image, Video, Gallery (grid), or Slider (auto-play)
- Position: Top, Middle, or Bottom
- Add multiple images for sliders

## Layout on Homepage

The sections appear in this order:
1. Hero Sections (top position)
2. **Category Icons Section** ← NEW
3. **Feature Cards Section** ← NEW
4. Products Grid
5. Hero Sections (middle/bottom positions)

## Customization

### Category Icons
- Icons are from lucide-react
- Background: gray-50 (hover: gray-100)
- Icon color: red-500
- Grid: 3 cols mobile, 4 cols tablet, 7 cols desktop

### Feature Cards
- 2 column grid on desktop
- Height: 256px (h-64)
- Customizable background colors
- Hover effect: scale-105

## Available Icons
- monitor (Server & Storage)
- printer (ID Card Printers)
- cloud (Solutions)
- fingerprint (Attendance & Access Control)
- card (Cards)
- smartphone (Mobile Computers)
- idcard (Biometric & Card Readers)

## Tips
1. Use high-quality images for feature cards (recommended: 400x400px or larger)
2. Keep category names short (1-3 words)
3. Use contrasting background colors for feature cards
4. Test on mobile devices to ensure proper layout

## Troubleshooting

If sections don't appear:
1. Check that tables were created in Supabase
2. Verify RLS policies are enabled
3. Ensure at least one item is marked as "enabled"
4. Clear browser cache and refresh

## Example Data

Default categories:
- Server & Storage (monitor icon)
- ID Card Printers (printer icon)
- Solutions (cloud icon)
- Attendance & Access Control (fingerprint icon)
- Cards (card icon)
- Mobile Computers (smartphone icon)
- Biometric & Card Readers (idcard icon)

Default feature cards:
- CASSIDA NEO MAX (dark red background)
- HPE SERVER (teal background)
