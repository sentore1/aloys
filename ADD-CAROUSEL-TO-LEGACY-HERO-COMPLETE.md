# Add Carousel to Legacy Hero - Complete Implementation

## Step 1: Run SQL Migration

First, run this SQL in Supabase SQL Editor:

```sql
-- Add hero_gallery column to site_settings
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS hero_gallery JSONB DEFAULT '[]';

-- Update existing row to have empty array if null
UPDATE site_settings SET hero_gallery = '[]' WHERE hero_gallery IS NULL;
```

## Step 2: Update Admin Page

Add this code to `app/admin/page.tsx` in the Legacy Hero section.

### A. Update SiteSettings Interface

Find the `SiteSettings` interface and add:

```typescript
interface SiteSettings {
  // ... existing fields ...
  hero_gallery?: string[]  // Add this line
}
```

### B. Add Carousel Images Section

In the Legacy Hero tab, after the single image field and before the title fields, add this code:

```typescript
{/* Hero Carousel Images (Optional) - ADD THIS SECTION */}
<div className="border-t pt-6 mt-6">
  <div className="flex justify-between items-center mb-4">
    <div>
      <label className="block text-sm font-medium mb-1">Hero Carousel Images (Optional)</label>
      <p className="text-xs text-gray-500">
        Add multiple images to create an auto-playing carousel. If added, these will be used instead of the single image above.
      </p>
    </div>
    <button
      type="button"
      onClick={() => {
        const currentGallery = Array.isArray(siteSettings.hero_gallery) 
          ? siteSettings.hero_gallery 
          : []
        setSiteSettings({
          ...siteSettings, 
          hero_gallery: [...currentGallery, '']
        })
      }}
      className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
    >
      + Add Image
    </button>
  </div>
  
  <div className="space-y-2">
    {(Array.isArray(siteSettings.hero_gallery) ? siteSettings.hero_gallery : []).map((url: string, i: number) => (
      <div key={i} className="flex gap-2 items-center">
        <span className="text-sm text-gray-500 w-8">{i + 1}.</span>
        <input
          type="url"
          value={url}
          onChange={(e) => {
            const newGallery = [...(Array.isArray(siteSettings.hero_gallery) ? siteSettings.hero_gallery : [])]
            newGallery[i] = e.target.value
            setSiteSettings({...siteSettings, hero_gallery: newGallery})
          }}
          className="flex-1 p-2 border rounded text-sm"
          placeholder={`Carousel Image URL ${i + 1}`}
        />
        {url && (
          <img 
            src={url} 
            alt="" 
            className="w-10 h-10 object-cover rounded border" 
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        )}
        <button 
          type="button" 
          onClick={() => {
            const newGallery = (Array.isArray(siteSettings.hero_gallery) ? siteSettings.hero_gallery : []).filter((_: string, idx: number) => idx !== i)
            setSiteSettings({...siteSettings, hero_gallery: newGallery})
          }} 
          className="text-red-500 hover:text-red-700 px-2 text-xl"
        >
          ×
        </button>
      </div>
    ))}
    {(!siteSettings.hero_gallery || siteSettings.hero_gallery.length === 0) && (
      <p className="text-sm text-gray-400 p-4 bg-gray-50 rounded text-center">
        No carousel images yet. Click "+ Add Image" to start adding images for the carousel.
      </p>
    )}
  </div>
  
  {siteSettings.hero_gallery && siteSettings.hero_gallery.length > 0 && (
    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
      <p className="text-sm text-blue-800">
        <strong>Note:</strong> You have {siteSettings.hero_gallery.length} carousel images. 
        These will auto-play on the homepage instead of the single image above.
      </p>
    </div>
  )}
</div>
```

### C. Update fetchSiteSettings Function

Find the `fetchSiteSettings` function and update it:

```typescript
const fetchSiteSettings = async () => {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .single()
    
    if (data && !error) {
      let parsedData = { ...data }
      
      // Parse hero_gallery if it's a string
      if (data.hero_gallery && typeof data.hero_gallery === 'string') {
        try {
          parsedData.hero_gallery = JSON.parse(data.hero_gallery)
        } catch {
          parsedData.hero_gallery = []
        }
      } else if (!data.hero_gallery) {
        parsedData.hero_gallery = []
      }
      
      // Parse MoMo settings from site_logo if stored as JSON
      if (data.site_logo && data.site_logo.startsWith('{')) {
        try {
          const parsed = JSON.parse(data.site_logo)
          if (parsed.momo) {
            parsedData = { ...parsedData, ...parsed.momo, site_logo: parsed.logo || '' }
          }
        } catch {}
      }
      
      setSiteSettings(parsedData)
    }
  } catch (error) {
    console.log('No site settings found, using defaults')
  }
}
```

### D. Update saveSiteSettings Function

Find the `saveSiteSettings` function and add hero_gallery to the payload:

```typescript
const saveSiteSettings = async () => {
  try {
    const { data: existing } = await supabase
      .from('site_settings')
      .select('id')
      .single()

    if (existing?.id) {
      const payload: any = {
        // ... all existing fields ...
        hero_gallery: JSON.stringify(siteSettings.hero_gallery || [])  // Add this line
      }

      // ... rest of the function
    }
  } catch (err: any) {
    alert(`Exception: ${err?.message || JSON.stringify(err)}`)
  }
}
```

## Step 3: Update Homepage to Display Carousel

The homepage (`app/page.tsx`) already has carousel support in the HeroSection component. The carousel will automatically work when you add multiple images!

## Step 4: Test

1. Go to `/admin` → **Legacy Hero** tab
2. Check "Show Hero Section"
3. Select "Image" type
4. Scroll down to "Hero Carousel Images (Optional)"
5. Click "+ Add Image"
6. Add 3-5 image URLs
7. Click "Save Hero Settings"
8. Go to homepage - carousel should auto-play!

## Visual Guide

### Before (Single Image):
```
┌─────────────────────────────────┐
│ Hero Image                      │
│ [/hero-image.jpg________]       │
└─────────────────────────────────┘
```

### After (Carousel):
```
┌─────────────────────────────────┐
│ Hero Image                      │
│ [/hero-image.jpg________]       │
│                                 │
│ Hero Carousel Images (Optional) │
│ [+ Add Image]                   │
│                                 │
│ 1. [https://image1.jpg___] [📷] │
│ 2. [https://image2.jpg___] [📷] │
│ 3. [https://image3.jpg___] [📷] │
│                                 │
│ Note: 3 carousel images added   │
└─────────────────────────────────┘
```

## Features

✅ Add unlimited carousel images
✅ Preview thumbnails
✅ Remove images with × button
✅ Auto-play on homepage (4s interval)
✅ Smooth fade transitions
✅ Pagination dots
✅ Fallback to single image if no carousel

## Troubleshooting

### Carousel Not Showing:
1. Check "Show Hero Section" is enabled
2. Verify at least 2 images added
3. Check image URLs are valid
4. Clear browser cache

### Images Not Saving:
1. Make sure SQL migration was run
2. Check browser console for errors
3. Verify you're logged in as admin
4. Try saving again

## Alternative: Use Hero Sections Tab

**Recommended:** Instead of Legacy Hero, use the **Hero Sections** tab which already has full carousel support:

1. Go to `/admin` → **Hero Sections**
2. Click **Add Section**
3. Choose type: **Slider (Auto-play)**
4. Add multiple images
5. Configure and save

The Hero Sections tab is more powerful and easier to use!

---

**After adding this code, you'll be able to add carousel images to Legacy Hero!** 🎉
