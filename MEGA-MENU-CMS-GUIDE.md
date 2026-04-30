# Mega Menu CMS - Setup & Usage Guide

## 🎉 What's New?

You can now manage your navigation menu from the admin panel with drag-and-drop functionality!

---

## 🚀 Quick Setup (2 Minutes)

### Step 1: Run Database Migration

1. Open your Supabase dashboard
2. Go to **SQL Editor**
3. Copy and paste the contents of `add-mega-menu-table.sql`
4. Click **Run**
5. ✅ Done!

### Step 2: Access Menu Manager

1. Go to `/admin`
2. Click the **"Navigation Menu"** tab
3. You'll see your current menu items

---

## 📋 Features

### ✅ What You Can Do:

1. **Add Menu Items** - Create new navigation links
2. **Edit Menu Items** - Update labels, links, descriptions
3. **Delete Menu Items** - Remove unwanted items
4. **Reorder Items** - Use ↑↓ buttons to change order
5. **Create Submenus** - Add dropdown items under parent menus
6. **Enable/Disable** - Toggle items on/off without deleting
7. **Expand/Collapse** - View submenu items

---

## 🎯 How to Use

### Adding a Top-Level Menu Item

1. Click **"Add Menu Item"** button
2. Fill in:
   - **Label**: Menu text (e.g., "About Us")
   - **Link**: URL (e.g., "/about")
   - **Parent Menu**: Leave as "None (Top Level)"
   - **Description**: Leave empty for top-level items
   - **Enabled**: Check to show immediately
3. Click **"Add Menu Item"**

### Adding a Submenu Item (Dropdown)

1. Click **"Add Menu Item"** button
2. Fill in:
   - **Label**: Submenu text (e.g., "Gaming Laptops")
   - **Link**: URL (e.g., "/products?category=gaming")
   - **Parent Menu**: Select parent (e.g., "Products")
   - **Description**: Short text (e.g., "High-performance gaming")
   - **Enabled**: Check to show immediately
3. Click **"Add Menu Item"**

### Editing a Menu Item

1. Click the **edit icon** (pencil) on any item
2. Update the fields
3. Click **"Update Menu Item"**

### Reordering Menu Items

1. Use **↑** button to move item up
2. Use **↓** button to move item down
3. Order saves automatically

### Enabling/Disabling Items

1. Click the **checkbox** next to any item
2. Unchecked items won't show in navigation
3. Useful for temporarily hiding items

### Deleting Menu Items

1. Click the **trash icon** on any item
2. Confirm deletion
3. ⚠️ Warning: Deleting a parent also deletes all its submenu items

---

## 📖 Examples

### Example 1: Simple Menu Item

```
Label: About Us
Link: /about
Parent Menu: None (Top Level)
Description: (leave empty)
Enabled: ✓
```

Result: "About Us" appears in main navigation

### Example 2: Menu with Dropdown

**Parent Item:**
```
Label: Products
Link: /products
Parent Menu: None (Top Level)
Description: (leave empty)
Enabled: ✓
```

**Submenu Items:**
```
Label: Laptops
Link: /products?category=laptop
Parent Menu: Products
Description: High-performance laptops
Enabled: ✓

Label: Desktops
Link: /products?category=desktop
Parent Menu: Products
Description: Powerful desktop computers
Enabled: ✓
```

Result: "Products" with dropdown showing "Laptops" and "Desktops"

### Example 3: Category Menu

```
Label: Shop by Category
Link: (leave empty - no direct link)
Parent Menu: None (Top Level)
Description: (leave empty)
Enabled: ✓

Submenu items:
- Electronics → /products?category=electronics
- Accessories → /products?category=accessories
- Software → /products?category=software
```

---

## 🎨 Menu Structure

```
Navigation Bar
├── Home (/)
├── Products (/products) ▼
│   ├── All Products (/products)
│   ├── Laptops (/products?category=laptop)
│   ├── Servers (/servers)
│   └── Accessories (/products?category=accessories)
├── Solutions (/solutions) ▼
│   └── All Solutions (/solutions)
├── Support (/support)
└── Contact (/contact)
```

---

## 💡 Tips & Best Practices

### Navigation Design
- ✅ Keep top-level items to 5-7 maximum
- ✅ Use clear, concise labels (1-2 words)
- ✅ Group related items under parent menus
- ✅ Add descriptions to submenu items for clarity

### Link Formats
- Internal pages: `/about`, `/products`
- Category filters: `/products?category=laptop`
- External links: `https://example.com`
- Anchors: `/page#section`

### Organization
- ✅ Most important items first (left to right)
- ✅ Logical grouping (Products, Services, Support)
- ✅ Consistent naming conventions
- ✅ Test on mobile after changes

### Performance
- ✅ Limit submenu items to 5-10 per parent
- ✅ Disable unused items instead of deleting
- ✅ Use descriptive URLs for SEO

---

## 🔧 Advanced Features

### Parent Items Without Links

You can create parent items that only show dropdowns:
- Leave **Link** field empty
- Add submenu items
- Clicking parent does nothing, only shows dropdown

### Multi-Level Menus

Currently supports 2 levels (Parent → Child). For 3+ levels, contact support.

### Dynamic Categories

Link to category pages dynamically:
```
/products?category=laptop
/products?category=desktop
/products?brand=asus
```

---

## 🐛 Troubleshooting

### Menu Not Showing
**Problem:** Changes don't appear on website  
**Solution:** 
1. Check item is **Enabled** (checkbox checked)
2. Refresh browser (Ctrl+Shift+R)
3. Clear browser cache

### Dropdown Not Working
**Problem:** Submenu doesn't appear on hover  
**Solution:**
1. Verify submenu items have correct **Parent Menu** selected
2. Check submenu items are **Enabled**
3. Ensure parent item exists

### Order Not Saving
**Problem:** Items jump back to original position  
**Solution:**
1. Wait 1-2 seconds after clicking ↑↓
2. Refresh page to verify
3. Check browser console for errors

### Items Disappeared
**Problem:** Menu items vanished  
**Solution:**
1. Check if accidentally disabled (uncheck/recheck)
2. Check if deleted (restore from backup)
3. Database migration may need to be re-run

---

## 📊 Database Structure

### Table: `mega_menu`

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Unique identifier |
| label | VARCHAR | Menu text |
| href | VARCHAR | Link URL |
| parent_id | UUID | Parent menu ID (NULL for top-level) |
| description | TEXT | Submenu description |
| position | INTEGER | Display order |
| enabled | BOOLEAN | Show/hide item |
| created_at | TIMESTAMP | Creation date |
| updated_at | TIMESTAMP | Last update |

---

## 🎓 Video Tutorial

(Coming soon - will show drag-and-drop in action)

---

## 📞 Support

### Common Questions

**Q: Can I have more than 2 levels?**  
A: Currently supports 2 levels. Contact for custom implementation.

**Q: Can I add icons to menu items?**  
A: Not yet, but planned for future update.

**Q: Can I import/export menu structure?**  
A: Not yet, but planned for future update.

**Q: How many menu items can I have?**  
A: No hard limit, but recommend 5-7 top-level items for UX.

---

## ✅ Checklist

After setup, verify:
- [ ] Database migration ran successfully
- [ ] "Navigation Menu" tab appears in admin
- [ ] Can add new menu items
- [ ] Can edit existing items
- [ ] Can reorder items with ↑↓
- [ ] Can enable/disable items
- [ ] Changes appear on website
- [ ] Dropdowns work on hover
- [ ] Mobile menu works

---

**Version:** 1.0  
**Status:** ✅ Ready to Use  
**Last Updated:** 2024

---

## 🎉 You're All Set!

Your navigation menu is now fully manageable from the CMS. No more code changes needed!

**Next Steps:**
1. Run the database migration
2. Go to Admin → Navigation Menu
3. Customize your menu
4. Test on your website
5. Enjoy!
