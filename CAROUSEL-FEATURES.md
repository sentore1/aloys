# 🎠 Carousel Features Update

## What's New?

Both **Trending Products** and **Brands** sections are now carousels with auto-play!

---

## ✨ Features

### 1. Trending Products Carousel
- **Auto-play:** Changes every 5 seconds
- **Shows:** 2 cards at a time
- **Navigation:** Left/Right arrows
- **Pagination:** Dots at bottom
- **Hover:** Pauses auto-play
- **Animation:** Smooth fade-in

### 2. Brands Carousel
- **Auto-play:** Changes every 4 seconds
- **Shows:** 6 brands at a time
- **Navigation:** Left/Right circular buttons
- **Pagination:** Dots at bottom
- **Title:** "Our Trusted Global Brand Partnership"
- **Description:** Full text included
- **Hover:** Grayscale to color effect

---

## 🎯 Default Content

### Trending Products (6 cards):
1. CASSIDA NEO MAX (Dark Red)
2. HPE SERVER (Teal)
3. ZEBRA PRINTERS (Blue)
4. HID ACCESS CONTROL (Purple)
5. DELL WORKSTATIONS (Green)
6. EVOLIS CARD PRINTERS (Red)

### Brands (6 logos):
1. Hewlett Packard Enterprise
2. Dell
3. Heidi
4. Evolis
5. HID
6. Zebra

---

## 🎨 Carousel Controls

### Trending Products:
```
┌─────────────────────────────────┐
│  Trending Products        ◀ ▶   │
├─────────────────────────────────┤
│  [Card 1]      [Card 2]         │
│                                 │
│         ● ○ ○                   │ ← Pagination dots
└─────────────────────────────────┘
```

### Brands:
```
┌─────────────────────────────────┐
│  Our Trusted Global Brand...    │
│  At Infome Technologies...      │
├─────────────────────────────────┤
│ ◀ [Logo] [Logo] [Logo]... ▶    │
│                                 │
│         ● ○ ○                   │ ← Pagination dots
└─────────────────────────────────┘
```

---

## ⚙️ Carousel Settings

### Auto-Play Timing:
- **Trending Products:** 5 seconds
- **Brands:** 4 seconds

### Items Per Slide:
- **Trending Products:** 2 cards
- **Brands:** 6 logos (desktop), 4 (tablet), 3 (mobile)

### Animations:
- **Fade-in:** 0.5s ease-out
- **Hover scale:** 1.05x
- **Button hover:** 1.1x scale

---

## 🎮 User Interactions

### Auto-Play Behavior:
1. **Starts automatically** when page loads
2. **Pauses** when user clicks navigation
3. **Continues** after 10 seconds of inactivity
4. **Loops** back to start when reaching end

### Navigation:
- **Arrow buttons:** Previous/Next
- **Pagination dots:** Jump to specific slide
- **Keyboard:** Arrow keys (optional)
- **Touch:** Swipe left/right (mobile)

---

## 📱 Responsive Behavior

### Trending Products:
| Screen | Cards Shown | Layout |
|--------|-------------|--------|
| Mobile | 1 | Stack |
| Tablet | 2 | Side-by-side |
| Desktop | 2 | Side-by-side |

### Brands:
| Screen | Logos Shown | Grid |
|--------|-------------|------|
| Mobile | 3 | 3 cols |
| Tablet | 4 | 4 cols |
| Desktop | 6 | 6 cols |

---

## 🎨 Customization

### Change Auto-Play Speed:

**Trending Products:**
```typescript
// File: components/FeatureCards.tsx
// Line: ~15
const interval = setInterval(() => {
  // Change 5000 to desired milliseconds
}, 5000)
```

**Brands:**
```typescript
// File: components/BrandsSection.tsx
// Line: ~23
const interval = setInterval(() => {
  // Change 4000 to desired milliseconds
}, 4000)
```

### Change Items Per Page:

**Trending Products:**
```typescript
// Fixed at 2 cards (optimal for layout)
```

**Brands:**
```typescript
// File: components/BrandsSection.tsx
// Line: ~14
const itemsPerPage = 6 // Change to 4, 8, etc.
```

### Disable Auto-Play:

```typescript
// Set initial state to false
const [isAutoPlaying, setIsAutoPlaying] = useState(false)
```

---

## 🎯 Admin Management

### Add More Cards:
1. Go to `/admin`
2. Click **Feature Cards** tab
3. Click **Add Card**
4. Fill in:
   - Title
   - Image URL
   - Background color
5. Enable and save

### Add More Brands:
1. Go to `/admin`
2. Click **Brands** tab
3. Click **Add Brand**
4. Fill in:
   - Brand name
   - Logo URL
5. Enable and save

---

## 🎨 Styling

### Trending Products:
- **Card height:** 256px (h-64)
- **Border radius:** 16px (rounded-2xl)
- **Title size:** 36px (text-4xl)
- **Gap:** 24px (gap-6)

### Brands:
- **Logo max height:** 64px
- **Card padding:** 24px (p-6)
- **Border:** 1px gray-200
- **Border radius:** 8px (rounded-lg)
- **Hover shadow:** md

### Navigation Buttons:
- **Size:** 48px (w-12 h-12)
- **Background:** White with shadow
- **Hover:** Scale 1.1x
- **Icon size:** 24px (w-6 h-6)

### Pagination Dots:
- **Inactive:** 8px circle, gray-300
- **Active:** 32px pill, red-500
- **Gap:** 8px (gap-2)

---

## 🚀 Performance

### Optimization Tips:
1. **Lazy load images** outside viewport
2. **Preload** next slide images
3. **Compress** all images (WebP format)
4. **Limit** to 10-12 items per carousel
5. **Use CDN** for image hosting

### Loading Strategy:
```typescript
// Current slide: Priority load
// Next slide: Preload
// Other slides: Lazy load
```

---

## 🐛 Troubleshooting

### Carousel Not Auto-Playing:
- Check `isAutoPlaying` state is `true`
- Verify `useEffect` is running
- Check console for errors
- Ensure items > itemsPerPage

### Navigation Not Working:
- Verify button onClick handlers
- Check currentIndex state updates
- Ensure items array has data
- Test in different browsers

### Images Not Loading:
- Verify image URLs are accessible
- Check CORS settings
- Use HTTPS URLs
- Test URLs in new tab

### Dots Not Showing:
- Ensure items > itemsPerPage
- Check `showControls` condition
- Verify pagination div is rendered
- Check CSS styles applied

---

## ✅ Testing Checklist

- [ ] Auto-play starts on page load
- [ ] Navigation buttons work
- [ ] Pagination dots work
- [ ] Carousel loops correctly
- [ ] Hover effects work
- [ ] Mobile responsive
- [ ] Tablet responsive
- [ ] Desktop responsive
- [ ] Images load properly
- [ ] Animations smooth

---

## 🎊 Result

Your homepage now has:
- ✅ Auto-playing Trending Products carousel
- ✅ Auto-playing Brands carousel
- ✅ Smooth animations
- ✅ Navigation controls
- ✅ Pagination dots
- ✅ Mobile responsive
- ✅ Professional look

**Just like the reference image!** 🎉

---

## 📚 Related Files

**Components:**
- `components/FeatureCards.tsx` - Trending Products carousel
- `components/BrandsSection.tsx` - Brands carousel

**Admin:**
- `components/FeatureCardsManager.tsx` - Manage cards
- `components/BrandsManager.tsx` - Manage brands

**Database:**
- `create-category-feature-tables.sql` - Feature cards table
- `create-brands-partnerships-tables.sql` - Brands table

---

**Carousels are ready to use!** 🎠
