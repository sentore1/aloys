# Maintenance Mode Setup Guide

## Overview
I've added a complete maintenance mode feature to your site. This allows you to display a customizable maintenance page to visitors while you work on updates.

## What Was Added

### 1. Database Migration (`add-maintenance-mode.sql`)
Run this SQL file to add the maintenance mode columns to your `site_settings` table:

```sql
-- Add maintenance mode columns to site_settings table
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS maintenance_mode BOOLEAN DEFAULT false;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS maintenance_title TEXT DEFAULT 'We''ll be back soon!';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS maintenance_message TEXT DEFAULT 'Our site is currently undergoing scheduled maintenance. We''ll be back shortly. Thank you for your patience.';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS maintenance_background_color TEXT DEFAULT '#ffffff';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS maintenance_text_color TEXT DEFAULT '#000000';
```

**To apply:** Run this SQL in your Supabase SQL editor or database client.

### 2. Maintenance Mode Component (`components/MaintenanceMode.tsx`)
A new React component that displays the maintenance page with:
- Customizable title
- Customizable message (supports multi-line text)
- Customizable background color
- Customizable text color
- Professional gear icon

### 3. Updated Landing Page (`app/page.tsx`)
The home page now:
- Checks if maintenance mode is enabled
- Shows the maintenance page when enabled
- Shows the normal site when disabled

### 4. Admin Panel Updates (`app/admin/page.tsx`)
Added a new "Maintenance Mode" section in the Site Settings tab with:
- Toggle to enable/disable maintenance mode
- Title input field
- Message textarea (for longer text)
- Background color picker
- Text color picker

## How to Use

### Step 1: Run the Database Migration
1. Open your Supabase dashboard
2. Go to the SQL Editor
3. Copy and paste the contents of `add-maintenance-mode.sql`
4. Click "Run" to execute

### Step 2: Access Admin Panel
1. Go to `/admin` on your site
2. Log in with your admin credentials
3. Click on the "Site Settings" tab

### Step 3: Configure Maintenance Mode
1. Scroll down to the "Maintenance Mode" section
2. Check the "Enable Maintenance Mode" checkbox
3. Customize the settings:
   - **Title**: The main heading (e.g., "We'll be back soon!")
   - **Message**: Detailed message for visitors (can be multiple lines)
   - **Background Color**: Click the color picker to choose
   - **Text Color**: Click the color picker to choose
4. Click "Save Site Settings"

### Step 4: Test
1. Visit your homepage
2. You should see the maintenance page
3. To disable, uncheck "Enable Maintenance Mode" and save

## Example Configurations

### Classic White
- Background: `#ffffff` (white)
- Text: `#000000` (black)
- Title: "We'll be back soon!"
- Message: "Our site is currently undergoing scheduled maintenance..."

### Dark Mode
- Background: `#1a1a1a` (dark gray)
- Text: `#ffffff` (white)
- Title: "Under Maintenance"
- Message: "We're making improvements to serve you better..."

### Brand Colors
- Background: Your brand color
- Text: Contrasting color
- Title: Custom branded message
- Message: Specific details about the maintenance

## Features

✅ Easy toggle on/off from admin panel
✅ Fully customizable text and colors
✅ Responsive design (works on mobile and desktop)
✅ Professional appearance with icon
✅ Multi-line message support
✅ Real-time preview (just save and refresh homepage)

## Notes

- Only visitors see the maintenance page - you can still access `/admin` to manage settings
- The maintenance mode check happens on the landing page load
- Changes take effect immediately after saving
- You can write long messages with line breaks in the message field
