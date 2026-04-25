# Brands & Partnerships Setup Guide

## Overview
This update adds two new sections to showcase your brand partnerships and certifications:

1. **Brands Section** - Display partner brand logos (HPE, Dell, Heidi, Evolis, HID, Zebra, etc.)
2. **Partnerships Section** - Showcase certificates and detailed partnership information

## Setup Instructions

### Step 1: Create Database Tables

Run the SQL migration in your Supabase SQL Editor:

```sql
-- Copy and paste the contents of:
d:\aloys\create-brands-partnerships-tables.sql
```

This creates:
- `brands` table with 6 default brand logos
- `partnerships` table with sample partnership data

### Step 2: Access Admin Panel

1. Navigate to `/admin`
2. You'll see two new tabs:
   - **Brands** - Manage brand logos
   - **Partnerships** - Manage certificates and partnership details

### Step 3: Configure Brands

In the **Brands** tab:
- Add/edit/remove brand logos
- Upload logo URLs (PNG/SVG recommended)
- Reorder brands using up/down arrows
- Enable/disable individual brands
- Preview logos in real-time

**Recommended Logo Specs:**
- Format: PNG or SVG (transparent background)
- Size: 200-400px width
- Aspect ratio: Maintain original brand proportions

**Default Brands Included:**
1. Hewlett Packard Enterprise
2. Dell
3. Heidi
4. Evolis
5. HID
6. Zebra

### Step 4: Configure Partnerships

In the **Partnerships** tab:
- Add partnership entries with:
  - **Title**: e.g., "Heidi ID Card Printers"
  - **Subtitle**: e.g., "Authorized Distributor"
  - **Description**: Full partnership details
  - **Certificate Image**: Upload certificate/document image
- Reorder partnerships
- Enable/disable entries

**Certificate Image Tips:**
- Use high-resolution scans (min 800px width)
- Format: JPG or PNG
- The image will display with a blue border frame
- Alternating left/right layout for multiple partnerships

## Homepage Layout

The sections appear in this order:

1. Hero Sections (top)
2. Category Icons
3. Feature Cards
4. **Brands Section** ← NEW
5. **Partnerships Section** ← NEW
6. Products Grid
7. Hero Sections (middle/bottom)

## Customization Options

### Brands Section
```typescript
// Component: BrandsSection.tsx
- Grid: 3 cols mobile, 4 cols tablet, 6 cols desktop
- Logo effects: Grayscale → Color on hover
- Border: Light gray with shadow on hover
- Background: White cards
```

### Partnerships Section
```typescript
// Component: PartnershipsSection.tsx
- Layout: Alternating left/right (zigzag)
- Certificate frame: Blue border (4px)
- Responsive: Stacks on mobile
- Spacing: 16px gap between sections
```

## Example Content

### Brand Entry Example:
```
Name: Hewlett Packard Enterprise
Logo: https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Hewlett_Packard_Enterprise_logo.svg/320px-Hewlett_Packard_Enterprise_logo.svg.png
Enabled: ✓
```

### Partnership Entry Example:
```
Title: Heidi ID Card Printers
Subtitle: Authorized Distributor
Description: Infome Technologies is an authorized distributor of Heidi card printers and Hedi consumables in the UAE, delivering reliable and high-performance ID printing solutions.
Certificate Image: [Upload your certificate scan]
Enabled: ✓
```

## Section Titles

You can customize section titles by editing the components:

**Brands Section Title:**
- Default: "Top Brands"
- Edit in: `components/BrandsSection.tsx`

**Partnerships Section:**
- Default Title: "Our Trusted Global Brand Partnership"
- Default Description: "At Infome Technologies, we are proud to collaborate with industry-leading brands and hold certified status across major IT & security platforms."
- Edit in: `components/PartnershipsSection.tsx`

## Best Practices

### For Brands:
1. Use official brand logos from brand guidelines
2. Maintain consistent logo sizes
3. Use transparent backgrounds
4. Keep logos in original colors
5. Limit to 6-12 brands for best visual impact

### For Partnerships:
1. Use high-quality certificate scans
2. Keep descriptions concise (2-3 sentences)
3. Highlight key credentials (Authorized, Certified, etc.)
4. Update certificates when renewed
5. Order by importance/relevance

## Troubleshooting

**Brands not showing:**
- Check that at least one brand is marked as "enabled"
- Verify logo URLs are accessible
- Check browser console for image loading errors

**Partnerships not displaying:**
- Ensure at least one partnership is enabled
- Verify certificate image URLs
- Check that all required fields are filled

**Layout issues:**
- Clear browser cache
- Check responsive design on different screen sizes
- Verify Tailwind CSS classes are loading

## Advanced Customization

### Change Brand Grid Layout:
Edit `components/BrandsSection.tsx`:
```typescript
// Current: 3-4-6 columns
className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"

// Example: 2-3-5 columns
className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
```

### Change Partnership Layout:
Edit `components/PartnershipsSection.tsx`:
```typescript
// Current: Alternating left/right
className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}

// Always left-aligned:
className="flex flex-col md:flex-row gap-8"
```

### Customize Certificate Border:
```typescript
// Current: Blue border
className="border-4 border-blue-200"

// Green border:
className="border-4 border-green-200"

// Gold border:
className="border-4 border-yellow-400"
```

## SEO Benefits

These sections improve SEO by:
- Showcasing brand partnerships (trust signals)
- Displaying certifications (authority)
- Adding relevant keywords (brand names)
- Improving page content depth

## Mobile Optimization

Both sections are fully responsive:
- Brands: Stack in 3 columns on mobile
- Partnerships: Stack vertically on mobile
- Images: Scale proportionally
- Text: Remains readable at all sizes

## Support

For issues or questions:
1. Check the troubleshooting section
2. Verify database tables exist
3. Check browser console for errors
4. Ensure all images are accessible
