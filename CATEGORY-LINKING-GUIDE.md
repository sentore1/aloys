# Category Icons Linking - Setup Guide

## What Was Fixed

The category icons on your homepage were not clickable. Now they link to filtered product pages based on the category.

## How It Works

### Three Ways to Set Category Links:

1. **Product Category (Recommended)** - Select from your existing product categories
   - Most accurate filtering
   - Dropdown shows all categories from your products
   - Example: Select "servers" to show all server products

2. **Custom Link** - Set any URL you want
   - Overrides the category filter
   - Can link to custom pages or external URLs
   - Example: `/servers`, `/special-offers`, `https://example.com`

3. **Auto-Generated (Fallback)** - If neither is set
   - Generates slug from the icon name
   - Example: "Server & Storage" → `/products?category=server-and-storage`

### Priority Order:
1. Custom Link (if set)
2. Product Category (if selected)
3. Auto-generated from name

## Admin Panel Setup

1. Go to `/admin`
2. Click on "Category Icons" tab
3. For each category icon:
   - **Name**: Display name (e.g., "Server & Storage")
   - **Link**: Optional custom URL
   - **Icon**: Visual icon to display
   - **Product Category**: Dropdown to select actual product category
   - **Enabled**: Toggle visibility

## Database Migration

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Add link field
ALTER TABLE categories_with_icons 
ADD COLUMN IF NOT EXISTS link TEXT;

-- Add category field
ALTER TABLE categories_with_icons 
ADD COLUMN IF NOT EXISTS category TEXT;
```

## Examples

**Example 1: Using Product Category**
- Icon Name: "Server & Storage"
- Product Category: "servers" (selected from dropdown)
- Custom Link: (empty)
- Result: Links to `/products?category=servers`

**Example 2: Using Custom Link**
- Icon Name: "ID Card Printers"
- Product Category: (not selected)
- Custom Link: `/id-card-printers`
- Result: Links to `/id-card-printers`

**Example 3: Auto-Generated**
- Icon Name: "Mobile Computers"
- Product Category: (not selected)
- Custom Link: (empty)
- Result: Links to `/products?category=mobile-computers`

## Files Modified

1. `components/CategorySection.tsx` - Added category field support with priority logic
2. `app/products/page.tsx` - Added URL query parameter support
3. `components/CategoryIconsManager.tsx` - Added category dropdown and link field
4. `add-category-link-field.sql` - Database migration for link field
5. `add-category-field-to-icons.sql` - Database migration for category field

## Testing

1. Run the SQL migrations in Supabase
2. Go to `/admin` → Category Icons
3. Select a product category from the dropdown for each icon
4. Click the category icon on the homepage
5. Verify products are filtered correctly
6. Check that the category filter button is active on the products page
