# How to Add Promotional Graphics (Trending Products)

## 📊 What This Section Does

The **Trending Products** section displays large promotional cards/banners (like 100-200 size graphics) that you can customize from the CMS.

## 🎯 How to Add Your Graphics

### Step 1: Go to Admin Panel
1. Navigate to `/admin`
2. Click on **"Feature Cards"** tab

### Step 2: Add Your Promotional Cards
1. Click **"+ Add Card"** button
2. Fill in the form:
   - **Title:** Your product/promotion name (e.g., "CASSIDA NEO MAX")
   - **Image URL:** Paste your graphic image URL
   - **Background Color:** Choose a color (e.g., #7f1d1d for dark red)
3. Check **"Enabled"** checkbox
4. The card saves automatically

### Step 3: Add More Cards
- Click **"+ Add Card"** again
- Add at least **3 cards** for the carousel to work
- Recommended: **4-6 cards** for best results

### Step 4: View on Homepage
- Go to your homepage
- The cards will display as a carousel
- Auto-plays every 5 seconds
- Shows 2 cards at a time

---

## 📐 Image Specifications

### Recommended Size:
- **Width:** 400-600px
- **Height:** 300-400px
- **Format:** JPG, PNG, or WebP
- **File Size:** < 200KB (compressed)

### Aspect Ratio:
- **Landscape:** 4:3 or 16:9
- **Square:** 1:1 also works

### Example URLs:
```
https://yourdomain.com/graphics/product1.jpg
https://yourdomain.com/graphics/product2.png
https://images.unsplash.com/photo-123456?w=400
```

---

## 🎨 Card Layout

Each card displays:
```
┌─────────────────────────────────┐
│                                 │
│  PRODUCT NAME    [Product Img]  │
│  (Title)         (Your Graphic) │
│                                 │
└─────────────────────────────────┘
```

### Card Features:
- **Height:** 256px (h-64)
- **Background:** Custom color you choose
- **Title:** Large, bold, white text
- **Image:** Right side, full height
- **Hover:** Image scales up slightly

---

## 🎯 Example Setup

### Card 1:
```
Title: CASSIDA NEO MAX
Image: https://example.com/cassida-graphic.jpg
Background: #7f1d1d (Dark Red)
Enabled: ✅
```

### Card 2:
```
Title: HPE SERVER
Image: https://example.com/hpe-graphic.jpg
Background: #14b8a6 (Teal)
Enabled: ✅
```

### Card 3:
```
Title: ZEBRA PRINTERS
Image: https://example.com/zebra-graphic.jpg
Background: #1e40af (Blue)
Enabled: ✅
```

---

## 🎠 Carousel Behavior

### With 3+ Cards:
- ✅ Auto-plays every 5 seconds
- ✅ Shows 2 cards at a time
- ✅ Navigation arrows (◀ ▶)
- ✅ Pagination dots (● ○ ○)
- ✅ Smooth transitions
- ✅ Loops infinitely

### With 2 or Fewer Cards:
- Shows cards side-by-side
- No auto-play
- No navigation controls
- Static display

---

## 💡 Tips for Best Results

### 1. Image Quality:
- Use high-resolution graphics
- Ensure good contrast with background
- Product should be clearly visible
- Use transparent PNG for products

### 2. Background Colors:
- Choose colors that match your brand
- Ensure text is readable (white text works best)
- Use different colors for each card
- Test on mobile devices

### 3. Titles:
- Keep short (2-4 words)
- Use ALL CAPS for impact
- Product name or promotion
- Clear and descriptive

### 4. Number of Cards:
- Minimum: 3 cards (for carousel)
- Optimal: 4-6 cards
- Maximum: 10 cards (for performance)

---

## 🔧 Managing Cards

### To Edit a Card:
1. Go to `/admin` → **Feature Cards**
2. Find the card you want to edit
3. Update Title, Image URL, or Background Color
4. Changes save automatically

### To Reorder Cards:
1. Use the ↑ ↓ arrows
2. Cards will reorder in the carousel
3. Changes save immediately

### To Disable a Card:
1. Uncheck the **"Enabled"** checkbox
2. Card will be hidden from homepage
3. Can re-enable anytime

### To Delete a Card:
1. Click the **Delete** (trash) icon
2. Confirm deletion
3. Card is permanently removed

---

## 📱 Mobile Display

### Desktop (1024px+):
- Shows 2 cards side-by-side
- Full carousel with controls
- Auto-play enabled

### Tablet (768px-1024px):
- Shows 2 cards side-by-side
- Carousel works normally
- Touch swipe enabled

### Mobile (< 768px):
- Shows 1 card at a time
- Carousel still works
- Swipe to navigate

---

## ✅ Quick Checklist

Before going live:
- [ ] At least 3 cards added
- [ ] All cards have images
- [ ] All cards have titles
- [ ] Background colors chosen
- [ ] All cards enabled ✅
- [ ] Images optimized (< 200KB)
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Carousel auto-plays
- [ ] Navigation works

---

## 🎯 Current Status

**Section Name:** Trending Products  
**Location:** Below Category Icons  
**Admin Tab:** Feature Cards  
**Minimum Cards:** 3 (for carousel)  
**Current Cards:** Check in admin panel  

---

## 🆘 Troubleshooting

### Cards Not Showing:
1. Check at least 3 cards exist
2. Verify all are enabled ✅
3. Check image URLs are valid
4. Refresh browser cache

### Carousel Not Sliding:
1. Need at least 3 cards
2. Check browser console for errors
3. Verify JavaScript is enabled
4. Try hard refresh (Ctrl+Shift+R)

### Images Not Loading:
1. Verify image URLs are accessible
2. Check HTTPS protocol
3. Test URL in new browser tab
4. Check image file size

---

## 📞 Quick Reference

**Admin Path:** `/admin` → Feature Cards  
**Add Card:** Click "+ Add Card"  
**Minimum Cards:** 3 for carousel  
**Image Size:** 400-600px width  
**Auto-play:** Every 5 seconds  

---

**Now you can add your promotional graphics from the CMS!** 🎉

Just go to Admin → Feature Cards and start adding your images!
