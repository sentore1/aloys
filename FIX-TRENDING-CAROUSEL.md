# Fix: Trending Products Carousel Not Sliding

## 🔍 Problem

The Trending Products carousel is not sliding/auto-playing.

## 🎯 Root Cause

The carousel only works when you have **3 or more cards**. If you have 2 or fewer cards, it shows them statically without carousel controls.

## ✅ Solution

### Option 1: Add More Cards (Recommended)

1. Go to `/admin` → **Feature Cards** tab
2. You should see 6 default cards:
   - CASSIDA NEO MAX
   - HPE SERVER
   - ZEBRA PRINTERS
   - HID ACCESS CONTROL
   - DELL WORKSTATIONS
   - EVOLIS CARD PRINTERS

3. **Check if they're enabled:**
   - Each card should have ✅ "Enabled" checkbox checked
   - If not, check the boxes

4. **If cards are missing, add them:**
   - Click **"+ Add Card"**
   - Fill in:
     - Title: "ZEBRA PRINTERS"
     - Image URL: `https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400`
     - Background Color: `#1e40af` (blue)
   - Check "Enabled"
   - Repeat for more cards

### Option 2: Verify Database

Run this SQL in Supabase to check your cards:

```sql
-- Check how many enabled cards you have
SELECT COUNT(*) FROM feature_cards WHERE enabled = true;

-- View all cards
SELECT * FROM feature_cards ORDER BY position;

-- If no cards exist, insert defaults
INSERT INTO feature_cards (title, image, bg_color, position, enabled) VALUES
  ('CASSIDA NEO MAX', 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400', '#7f1d1d', 0, true),
  ('HPE SERVER', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400', '#14b8a6', 1, true),
  ('ZEBRA PRINTERS', 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400', '#1e40af', 2, true),
  ('HID ACCESS CONTROL', 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400', '#7c3aed', 3, true),
  ('DELL WORKSTATIONS', 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400', '#059669', 4, true),
  ('EVOLIS CARD PRINTERS', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400', '#dc2626', 5, true);
```

---

## 🐛 Empty Section Below

The empty section is likely the **Features Section** with no data.

### Fix Empty Section:

#### Option 1: Add Features Data

1. Go to `/admin` → **Features** tab
2. You should see 3 default features:
   - Customer Support
   - Quality
   - Pricing

3. **Check if they're enabled:**
   - Each should have ✅ "Enabled" checkbox
   - If not, enable them

4. **If missing, add them:**
   - Click **"+ Add Feature"**
   - Fill in:
     - Icon: "headphones"
     - Title: "Customer Support"
     - Description: "Nationwide expert support available 24/7"
   - Enable and save

#### Option 2: Verify Database

```sql
-- Check features
SELECT COUNT(*) FROM features WHERE enabled = true;

-- View all features
SELECT * FROM features ORDER BY position;

-- If no features exist, insert defaults
INSERT INTO features (icon, title, description, position, enabled) VALUES
  ('headphones', 'Customer Support', 'Nationwide expert support available 24/7 for all your needs', 0, true),
  ('check', 'Quality', 'Guaranteed genuine products backed by manufacturer warranty', 1, true),
  ('tag', 'Pricing', 'Competitive pricing with flexible payment options', 2, true);
```

---

## 🎯 How Carousel Works

### Carousel Logic:

```typescript
// Shows carousel controls only if more than 2 cards
const showControls = cards.length > 2

// Auto-play only if more than 2 cards
if (!isAutoPlaying || cards.length <= 2) return
```

### What You See:

**With 2 or fewer cards:**
```
┌─────────────────────────────┐
│ Trending Products           │ ← No arrows
│                             │
│ [Card 1]    [Card 2]        │
│                             │
│ (No dots, no auto-play)     │
└─────────────────────────────┘
```

**With 3+ cards:**
```
┌─────────────────────────────┐
│ Trending Products    ◀ ▶    │ ← Arrows appear!
│                             │
│ [Card 1]    [Card 2]        │
│                             │
│         ● ○ ○               │ ← Dots appear!
└─────────────────────────────┘
```

---

## ✅ Quick Fix Steps

### 1. Check Feature Cards:
```
Admin → Feature Cards tab
- Count enabled cards
- Should be 6 cards
- All should be enabled ✅
```

### 2. Check Features:
```
Admin → Features tab
- Count enabled features
- Should be 3 features
- All should be enabled ✅
```

### 3. Refresh Homepage:
```
- Go to homepage
- Hard refresh (Ctrl+Shift+R)
- Carousel should auto-play
- Empty section should be gone
```

---

## 🔍 Debug Checklist

- [ ] At least 3 feature cards exist
- [ ] All cards are enabled
- [ ] Cards have images and titles
- [ ] Features section has data (or is hidden)
- [ ] Browser cache cleared
- [ ] Page refreshed
- [ ] Carousel auto-plays
- [ ] Navigation arrows visible
- [ ] Pagination dots visible

---

## 📊 Expected Result

### Trending Products Carousel:
- ✅ Shows 2 cards at a time
- ✅ Auto-plays every 5 seconds
- ✅ Has ◀ ▶ navigation arrows
- ✅ Has pagination dots (● ○ ○)
- ✅ Smooth fade animation
- ✅ Loops infinitely

### Features Section:
- ✅ Shows 3 benefits with icons
- ✅ Gradient background
- ✅ Horizontal layout
- ✅ Or hidden if no data

---

## 🆘 Still Not Working?

### Check Browser Console:
1. Press F12
2. Go to Console tab
3. Look for errors
4. Check for "No feature cards found" message

### Verify Data:
```sql
-- Run in Supabase
SELECT 
  (SELECT COUNT(*) FROM feature_cards WHERE enabled = true) as cards_count,
  (SELECT COUNT(*) FROM features WHERE enabled = true) as features_count;
```

### Expected Output:
```
cards_count: 6
features_count: 3
```

---

## 💡 Pro Tip

**Minimum Requirements:**
- Feature Cards: 3+ for carousel
- Features: 3 for section (or 0 to hide)
- All must be enabled ✅

**Optimal Setup:**
- Feature Cards: 4-6 cards
- Features: 3 features
- All enabled and filled

---

**After adding 3+ cards, the carousel will work perfectly!** 🎉
