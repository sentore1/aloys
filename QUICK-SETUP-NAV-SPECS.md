# Quick Setup Guide - Navigation & Product Specs

## Immediate Steps to Get Started

### Step 1: Database Setup (Required)
Run this SQL in your Supabase SQL Editor:

```sql
-- Create product_specs table
CREATE TABLE IF NOT EXISTS product_specs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  spec_name VARCHAR(255) NOT NULL,
  spec_value TEXT NOT NULL,
  spec_image TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE product_specs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Product specs are viewable by everyone" ON product_specs FOR SELECT USING (true);
CREATE POLICY "Admin can manage product specs" ON product_specs FOR ALL USING (true);

-- Create indexes
CREATE INDEX idx_product_specs_product_id ON product_specs(product_id);
CREATE INDEX idx_product_specs_display_order ON product_specs(display_order);
```

### Step 2: Test the Navigation
1. Navigate to any page EXCEPT the homepage (e.g., `/products`)
2. You should see the new mega menu with dropdown on hover
3. Click on "Products" - it should navigate to the products page
4. Hover over "Products" - you should see the submenu

### Step 3: Add Product Specs
1. Go to `/admin`
2. Click "Products" tab
3. Click edit icon on any product
4. Scroll down to "Product Specifications" section
5. Add a test spec:
   - Spec name: "Processor"
   - Spec value: "Intel Core i7"
   - Click "Add Specification"

### Step 4: View Specs on Product Page
1. Go to the product detail page
2. You should see two tabs: "Description" and "Specifications"
3. Click "Specifications" tab
4. Your spec should be displayed

## Customizing the Menu

Edit `components/Navbar.tsx` around line 120:

```typescript
<MegaMenu
  items={[
    { label: 'Home', href: '/' },
    {
      label: 'Products',
      href: '/products',
      subItems: [
        { label: 'All Products', href: '/products', description: 'Browse all items' },
        { label: 'Laptops', href: '/products?category=laptops', description: 'High-performance laptops' },
        // ADD YOUR CATEGORIES HERE
      ]
    },
    // ADD MORE MENU ITEMS HERE
  ]}
/>
```

## Common Issues

**Menu not showing:**
- Make sure you're NOT on the homepage
- The mega menu only shows on other pages

**Specs not saving:**
- Did you run the database migration?
- Check Supabase SQL editor for errors

**Images not uploading:**
- Verify `product-images` storage bucket exists in Supabase
- Check storage policies allow public uploads

## What's Working Now

✅ Clickable navigation links  
✅ Hover dropdown menus  
✅ Product specifications with images  
✅ Tabbed interface on product pages  
✅ Admin interface for managing specs  
✅ Image upload for specs  

## Next Steps

1. Customize menu items for your store
2. Add specs to all your products
3. Organize specs by category
4. Add images to visual specs (colors, materials, etc.)

## Need Help?

Check the full guide: `NAVIGATION-SPECS-GUIDE.md`
