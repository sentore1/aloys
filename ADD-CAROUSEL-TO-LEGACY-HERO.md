# Instructions: Add Carousel to Legacy Hero

## What to Add

Add this code to the **Legacy Hero tab** in `app/admin/page.tsx`, after the single image/video field and before the title/subtitle fields:

```typescript
{/* Hero Carousel Images (Optional) */}
<div className="border-t pt-6">
  <div className="flex justify-between items-center mb-4">
    <div>
      <label className="block text-sm font-medium mb-1">Hero Carousel Images (Optional)</label>
      <p className="text-xs text-gray-500">Add multiple images to create an auto-playing carousel. If added, these will be used instead of the single image above.</p>
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
          className="text-red-500 hover:text-red-700 px-2"
        >
          ×
        </button>
      </div>
    ))}
    {(!siteSettings.hero_gallery || siteSettings.hero_gallery.length === 0) && (
      <p className="text-sm text-gray-400">No carousel images yet. Click "+ Add Image" to start.</p>
    )}
  </div>
</div>
```

## Where to Add

**Location:** In the "Hero Section Tab" (`activeTab === 'hero'`), add this code block:

**After this section:**
```typescript
<div>
  <label className="block text-sm font-medium mb-2">
    {siteSettings.hero_type === 'image' ? 'Hero Image' : 'Hero Video'}
  </label>
  ...
</div>
```

**Before this section:**
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label className="block text-sm font-medium mb-2">Hero Title</label>
    ...
  </div>
</div>
```

## Update SiteSettings Interface

Add this to the `SiteSettings` interface at the top of the file:

```typescript
interface SiteSettings {
  // ... existing fields ...
  hero_gallery?: string[]  // Add this line
}
```

## Update saveSiteSettings Function

In the `saveSiteSettings` function, add hero_gallery to the payload:

```typescript
const payload: any = {
  // ... existing fields ...
  hero_gallery: JSON.stringify(siteSettings.hero_gallery || [])  // Add this line
}
```

## Update fetchSiteSettings Function

In the `fetchSiteSettings` function, parse hero_gallery:

```typescript
if (data && !error) {
  let parsedData = { ...data }
  
  // Parse hero_gallery if it's a string
  if (data.hero_gallery && typeof data.hero_gallery === 'string') {
    try {
      parsedData.hero_gallery = JSON.parse(data.hero_gallery)
    } catch {
      parsedData.hero_gallery = []
    }
  }
  
  // ... rest of existing parsing code ...
  
  setSiteSettings(parsedData)
}
```

## Alternative: Use Hero Sections Tab

**Recommended:** Instead of modifying Legacy Hero, use the **Hero Sections** tab which already has full carousel support with:
- Multiple images
- Auto-play
- Slider/Gallery modes
- Better management interface
- More features

The Legacy Hero tab is deprecated in favor of Hero Sections.

---

## Summary

You have two options:

### Option 1: Use Hero Sections Tab (Recommended)
- Already has carousel support
- Better interface
- More features
- No code changes needed

### Option 2: Add Carousel to Legacy Hero
- Follow instructions above
- Add code to admin page
- Run SQL migration
- Update interfaces

**Recommendation:** Use Hero Sections tab for new carousels. It's more powerful and easier to manage!
