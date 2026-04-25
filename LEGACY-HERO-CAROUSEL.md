# 🎠 Legacy Hero Carousel - Multiple Images Support

## Overview

The Legacy Hero section now supports **multiple images as a carousel**!

---

## 🚀 Setup

### Step 1: Run SQL Migration

```sql
-- File: add-hero-gallery-to-site-settings.sql
-- Run in Supabase SQL Editor
```

This adds a `hero_gallery` column to store multiple images.

### Step 2: Access Admin Panel

1. Go to `/admin`
2. Click **"Legacy Hero"** tab
3. Scroll to **"Hero Carousel Images"** section

---

## 🎨 How to Use

### Single Image Mode:
- Select "Image" or "Video" type
- Add one URL in "Hero Image/Video" field
- Works as before

### Carousel Mode:
1. Select "Image" type
2. Scroll to **"Hero Carousel Images (Optional)"** section
3. Click **"+ Add Image"** button
4. Paste image URLs
5. Add 3-5 images for best results
6. Save settings

**Note:** If carousel images are added, they will be used instead of the single hero_content image.

---

## ⚙️ Features

### Carousel Settings:
- **Auto-play:** Every 4 seconds
- **Transition:** Smooth fade
- **Navigation:** Pagination dots
- **Loop:** Infinite scrolling
- **Overlay:** Customizable
- **Text:** Title, subtitle, button

### Image Management:
- **Add:** Click "+ Add Image"
- **Remove:** Click "×" button
- **Reorder:** Drag and drop (coming soon)
- **Preview:** Thumbnail shown
- **Validation:** URL format checked

---

## 📐 Recommended Specs

### Image Dimensions:
- **Width:** 1920px
- **Height:** 600-800px
- **Aspect Ratio:** 16:9 or 21:9
- **Format:** JPG, PNG, WebP
- **Size:** < 500KB (compressed)

### Number of Images:
- **Minimum:** 2 images
- **Recommended:** 3-5 images
- **Maximum:** 10 images

---

## 🎯 Example Setup

### Step-by-Step:

1. **Enable Hero:**
   - ✅ Check "Show Hero Section"

2. **Select Type:**
   - ⚪ Image (for carousel)

3. **Add Carousel Images:**
   ```
   Image 1: https://example.com/hero1.jpg
   Image 2: https://example.com/hero2.jpg
   Image 3: https://example.com/hero3.jpg
   ```

4. **Configure Text:**
   - Title: "Welcome to Itech"
   - Subtitle: "Your IT Solutions Partner"
   - Button: "Shop Now" → "/products"

5. **Customize Appearance:**
   - Height: 600px
   - Border Radius: 16px
   - Overlay: Enabled, 30% opacity

6. **Save Settings**

---

## 🎨 Customization

### Overlay Settings:
```
Overlay Enabled: ✅
Overlay Color: #000000 (black)
Overlay Opacity: 0.3 (30%)
```

### Text Styling:
```
Title Size: 48px
Title Font: Helvetica
Button Text: "Shop Now"
Button Link: "/products"
```

### Dimensions:
```
Height: 400-800px
Border Radius: 0-24px
```

---

## 🔄 Migration from Single to Carousel

### Before (Single Image):
```
Hero Type: Image
Hero Content: https://example.com/hero.jpg
```

### After (Carousel):
```
Hero Type: Image
Hero Content: (leave as is - fallback)
Hero Carousel Images:
  - https://example.com/hero1.jpg
  - https://example.com/hero2.jpg
  - https://example.com/hero3.jpg
```

**Note:** The single image (hero_content) is used as fallback if carousel is empty.

---

## 💡 Pro Tips

### 1. Image Optimization:
- Compress images before upload
- Use WebP format for smaller size
- Optimize for web (72 DPI)
- Use CDN for faster loading

### 2. Content Strategy:
- First slide: Main message
- Second slide: Key product
- Third slide: Special offer
- Keep text consistent across slides

### 3. Design Consistency:
- Use similar color schemes
- Maintain text readability
- Test overlay opacity
- Check mobile view

### 4. Performance:
- Limit to 5 images max
- Preload first image
- Lazy load others
- Use appropriate sizes

---

## 📱 Responsive Behavior

### Desktop (1920px+):
- Full width carousel
- All text visible
- Button prominent

### Tablet (768px-1024px):
- Scaled carousel
- Text readable
- Button accessible

### Mobile (< 768px):
- Full width
- Smaller text
- Stacked button

---

## 🐛 Troubleshooting

### Carousel Not Showing:
1. Check "Show Hero Section" is enabled
2. Verify at least 2 images added
3. Check image URLs are valid
4. Clear browser cache

### Images Not Loading:
1. Verify URLs are accessible
2. Check HTTPS protocol
3. Test URLs in new tab
4. Check CORS settings

### Auto-Play Not Working:
1. Check browser settings
2. Verify JavaScript enabled
3. Check console for errors
4. Test in incognito mode

### Overlay Too Dark/Light:
1. Adjust opacity slider
2. Try different overlay color
3. Test with different images
4. Check text contrast

---

## 🎯 Best Practices

### DO:
✅ Use high-quality images
✅ Keep text concise
✅ Test on mobile
✅ Optimize file sizes
✅ Use consistent branding
✅ Add alt text (coming soon)

### DON'T:
❌ Use too many images (>10)
❌ Mix different aspect ratios
❌ Use low-resolution images
❌ Overcrowd with text
❌ Forget mobile testing
❌ Use slow-loading images

---

## 📊 Comparison

### Single Image vs Carousel:

| Feature | Single Image | Carousel |
|---------|--------------|----------|
| Images | 1 | 2-10 |
| Auto-play | No | Yes |
| Navigation | No | Dots |
| Animation | No | Fade |
| Setup | Simple | Moderate |
| Impact | Good | Excellent |

---

## 🔄 Future Enhancements

Coming soon:
- [ ] Drag-and-drop reordering
- [ ] Image upload (vs URL)
- [ ] Per-slide text override
- [ ] Transition effects options
- [ ] Pause on hover
- [ ] Arrow navigation
- [ ] Keyboard controls
- [ ] Touch swipe support

---

## ✅ Quick Checklist

Before going live:
- [ ] SQL migration run
- [ ] At least 2 images added
- [ ] Images optimized
- [ ] Text configured
- [ ] Overlay adjusted
- [ ] Mobile tested
- [ ] Desktop tested
- [ ] Auto-play working
- [ ] Links working
- [ ] Performance checked

---

## 📞 Support

**Documentation:**
- Main guide: `FINAL-SUMMARY.md`
- Carousel guide: `CAROUSEL-FEATURES.md`

**Admin Panel:**
- URL: `/admin`
- Tab: "Legacy Hero"
- Section: "Hero Carousel Images"

---

## 🎉 Result

Your Legacy Hero section now supports:
- ✅ Multiple images (carousel)
- ✅ Auto-play functionality
- ✅ Smooth transitions
- ✅ Pagination dots
- ✅ Customizable overlay
- ✅ Responsive design
- ✅ Easy management

**Perfect for showcasing multiple products or messages!** 🎊
