# KeepUp Firefox Extension - Installation & User Guide

## Table of Contents
1. [What is KeepUp?](#what-is-keepup)
2. [Installation (Step-by-Step)](#installation-step-by-step)
3. [Creating Your First Tracking Entry](#creating-your-first-tracking-entry)
4. [Understanding Auto-Update](#understanding-auto-update)
5. [Updating Entries Manually](#updating-entries-manually)
6. [Viewing History](#viewing-history)
7. [Exporting & Importing Your Data](#exporting--importing-your-data)
8. [Troubleshooting](#troubleshooting)
9. [Tips & Best Practices](#tips--best-practices)

---

## What is KeepUp?

**KeepUp** is a smart bookmarking extension designed for people who follow sequential content. Whether you're reading manga chapters, taking online courses, watching TV show episodes, or following any series of content, KeepUp replaces cluttered bookmark folders with **intelligent, auto-updating tracking entries**.

### Key Features:
- **Smart Tracking**: Instead of creating multiple bookmarks, you maintain ONE entry per series that always shows your current location
- **Auto-Update**: When you navigate to the next chapter/episode/lecture, KeepUp automatically updates your tracking entry
- **Manual Update**: One-click button to manually update your position
- **History Log**: Every update is timestamped and logged for your reference
- **Data Backup**: Export all your tracking data as a JSON file, import it anytime

---

## Installation (Step-by-Step)

### Prerequisites
- Firefox browser (latest version recommended)
- The KeepUp extension files (you should have these in your `bookmarks` folder)

### Installation Steps

#### Step 1: Open Firefox Developer Options
1. Open Firefox
2. Type `about:debugging` in the address bar and press Enter
3. You should see a page that says "Welcome to WebExtensions Debugging"

#### Step 2: Load the Extension
1. Click the **"This Firefox"** option in the left sidebar (if not already selected)
2. Click the **"Load Temporary Add-on..."** button
3. A file dialog will open
4. Navigate to your `bookmarks` folder (where all KeepUp files are located)
5. Select the **`manifest.json`** file and click "Open"

#### Step 3: Verify Installation
1. You should see a new entry appear on the `about:debugging` page showing:
   - Extension name: **KeepUp**
   - Version: **1.0.0**
   - A green "Enabled" status indicator
2. Close the `about:debugging` tab

#### Step 4: Find the Extension Icon
1. Look at your Firefox toolbar (top right area)
2. You should see a puzzle piece icon (Extensions menu) or directly see the KeepUp icon
3. If you see the puzzle piece, click it and look for the KeepUp icon
4. You can pin KeepUp to your toolbar by clicking the pin icon next to it

**Congratulations! KeepUp is now installed and ready to use.**

---

## Creating Your First Tracking Entry

Let's say you want to track a manga series you're reading.

### Steps:
1. Navigate to the manga chapter page you're currently reading
   - Example: `example-manga-site.com/series/manga-title/chapter-50`

2. Click the **KeepUp extension icon** in your toolbar
   - The KeepUp popup will appear

3. Click the **"+ Add Current"** button
   - KeepUp will capture:
     - The page title
     - The current URL
     - The domain (manga site)
     - Current timestamp

4. You'll see a green message at the bottom: **"Added: [Page Title]"**

5. Your new tracking entry now appears in the popup with:
   - The title you're tracking
   - The current URL (truncated for display)
   - When it was last updated
   - Buttons for "History" and "Delete"

**That's it! You now have a tracking entry for this series.**

---

## Understanding Auto-Update

One of KeepUp's most powerful features is **auto-update**. Here's how it works:

### What Auto-Update Does:
When you're tracking a manga series and you:
1. Click the "Next Chapter" button on the manga site
2. The browser loads the new chapter page
3. KeepUp **automatically detects this is the same domain** (manga site)
4. KeepUp **automatically updates your tracking entry** to point to the new chapter

### Visual Indicator:
- When a tracking entry has auto-update active, you'll see a green badge with **"● Auto"** next to the title
- The "Last updated" timestamp will show when the auto-update happened

### How KeepUp Detects "Next Page" Navigation:
- KeepUp monitors all tab navigation within domains you're tracking
- If you stay on the same domain and the URL changes, it's likely the "next" content
- The update happens automatically with NO action needed from you

### Important Notes:
- **Domain-based matching**: KeepUp identifies series by the website domain (e.g., `mangasite.com`)
- **Automatic only**: No popup needed, no button clicks required
- **All updates are logged**: Every auto-update is recorded with a timestamp in your history

---

## Updating Entries Manually

Sometimes auto-update might not catch every navigation (if the site structure changes, or you navigate unusually). You can manually update any time:

### Steps:
1. Navigate to the page you want to set as your current location
   - Example: You manually typed the URL or used search
   - Example: The site changed its URL structure

2. Click the **KeepUp extension icon**

3. Click the **"↻ Update Now"** button
   - KeepUp will:
     - Find a tracking entry on the current domain
     - Update it to the current page's URL and title
     - Log the update with a timestamp

4. You'll see a message: **"Updated tracking entry"** in green

### If No Entry Exists for This Domain:
- You'll see: **"No tracking entry for this domain. Add a new entry first."**
- Simply click "Add Current" first, then you can use "Update Now" later

---

## Viewing History

KeepUp keeps a detailed log of every time a tracking entry changes. Here's how to view it:

### Steps:
1. Click the **KeepUp extension icon** to open the popup

2. Find the tracking entry you want to review

3. Click the **"History"** button (light blue) on that entry

4. A popup window will appear showing:
   - **Added on**: When you first created the tracking entry
   - **Timestamped entries**: Every update with the date and time (format: `YYYY-MM-DD HH:MM:SS`)
   - **URLs**: The exact URL saved at each update

### Example History:
```
Added on
2024-05-22 10:30:15

2024-05-22 11:15:42
https://example-manga.com/series/xyz/chapter-50

2024-05-22 14:20:19
https://example-manga.com/series/xyz/chapter-51

2024-05-22 16:45:33
https://example-manga.com/series/xyz/chapter-52
```

### Closing the History:
- Click the **X** button in the top right of the history popup
- Or click anywhere outside the popup window

---

## Exporting & Importing Your Data

KeepUp stores all your data in Firefox's local storage. If you want to back up your data, switch devices, or safeguard against data loss, use Export/Import.

### Exporting Your Data

#### Steps:
1. Click the **KeepUp extension icon**
2. At the bottom of the popup, click **"Export Data"**
3. A file dialog will appear
4. Choose where to save the file (Desktop, Documents, etc.)
5. The file will be named: `keepup-backup-[timestamp].json`
   - Example: `keepup-backup-1716370200000.json`
6. You'll see: **"Data exported successfully"** in green

#### What's in the File:
The exported JSON file contains:
- Version information
- Export timestamp
- All your tracking entries with:
  - Titles
  - Current URLs
  - Domains
  - Complete history with all timestamps

#### Why Export?
- **Data Loss Protection**: Keep a backup in case Firefox is reinstalled
- **Device Transfer**: Move your tracking data to another computer
- **Manual Inspection**: Open the JSON file with a text editor to view your complete tracking history

---

### Importing Your Data

#### Steps:
1. Click the **KeepUp extension icon**
2. At the bottom of the popup, click **"Import Data"**
3. A file dialog will appear
4. Select a previously exported JSON file
5. A confirmation dialog will ask: **"This will replace all existing tracking entries. Continue?"**
   - Click **OK** to proceed
   - Click **Cancel** to abort
6. You'll see: **"Data imported successfully"** in green

#### What Happens:
- All entries in the JSON file will be restored
- **Any existing entries will be replaced** (that's why the confirmation dialog appears)
- Your complete history for each entry will be restored
- Everything works exactly as before

#### Important:
- Only import files that were exported from KeepUp
- The file must have the correct structure (don't manually edit it)
- If the file is invalid, you'll see an error message

---

## Troubleshooting

### Problem: Extension icon doesn't appear in toolbar

**Solution:**
1. Click the puzzle piece icon (Extensions) in Firefox toolbar
2. Look for "KeepUp" in the list
3. Click the pin icon next to it to add it to your main toolbar
4. If KeepUp doesn't appear in the list at all, reinstall it via `about:debugging`

---

### Problem: "Unable to access current tab" error

**Solution:**
1. This usually means Firefox blocked access to that tab
2. Make sure you're on a regular website (not `about:` pages like `about:home`)
3. Try refreshing the page and clicking the button again
4. Restart Firefox if the problem persists

---

### Problem: Auto-update isn't working on a specific site

**Possible Causes & Solutions:**

**Cause 1: Site URL structure changes**
- Solution: Use the "Update Now" button manually instead

**Cause 2: Site opens new tabs instead of navigating current tab**
- Solution: This is site-specific behavior. Use "Update Now" manually

**Cause 3: You're clicking a link that goes to a different domain first**
- Solution: Make sure you're staying on the original domain

**Quick Manual Update:**
- If auto-update isn't working for you, simply click "Update Now" each time you reach the new content
- It's still just one click!

---

### Problem: I accidentally deleted a tracking entry

**Solution:**
1. If you exported your data before:
   - Click "Import Data"
   - Select your backup file
   - Your entry will be restored

2. If you don't have a backup:
   - Unfortunately, the data cannot be recovered
   - Create the entry again and start fresh
   - **Always export occasionally** for safety!

---

### Problem: Import gives an error

**Possible Causes:**

1. **"Invalid file format"** - The JSON file is corrupted or incomplete
   - Solution: Use a different backup file if available

2. **"Invalid entry at index X"** - A tracking entry is missing required fields
   - Solution: The file may have been manually edited. Only import unmodified backup files

3. **"File type not JSON"** - You selected a non-JSON file
   - Solution: Select only `.json` files exported from KeepUp

---

### Problem: Extension stopped working after Firefox update

**Solution:**
1. Open `about:debugging` in Firefox
2. Look for KeepUp in the list
3. If it shows **"Enabled"** with a green dot, it's working fine
4. If it's disabled:
   - Click the toggle to re-enable it
   - Or reinstall it by loading the manifest.json again

---

## Tips & Best Practices

### Tip 1: Organize by Content Type
Create separate tracking entries for:
- Manga chapters on different sites
- Different course platforms
- TV shows on different streaming services

The domain-based matching ensures each stays separate!

### Tip 2: Use Descriptive Entry Names
KeepUp captures the page title, but you can:
- Remember what each title refers to
- Use descriptive titles when you add a page
- Check your history if you forget

### Tip 3: Regular Backups
- Export your data **every week** if you actively use KeepUp
- Store backups in a Cloud Drive (OneDrive, Google Drive, etc.)
- This protects against data loss

### Tip 4: Multiple Sites for Same Series
If a manga site gets taken down or you switch sites:
1. Add the new page on the new site using "Add Current"
2. You'll have two separate tracking entries (one per domain)
3. Continue using the new one
4. You can always delete the old one

### Tip 5: Check History Regularly
- Use the "History" button to review your progress
- It shows exactly when you reached each chapter/episode
- Great for tracking your reading pace!

### Tip 6: Stay on the Same Tab
- KeepUp tracks changes within a specific tab
- If you open content in a new tab, create a separate tracking entry for it
- This is by design - one entry per series/domain per tab

### Tip 7: Understanding Auto-Detection
Auto-update works best when:
- You click "Next Chapter", "Next Episode", or similar navigation buttons
- You stay on the same website domain
- The URL changes to reflect the new content

Auto-update may not work if:
- The site opens a new tab instead of navigating the current one (use "Update Now" manually)
- You manually type or search for the URL in a new way
- The site doesn't change the URL when you navigate

---

## Need More Help?

### Reset Everything:
1. Open `about:debugging`
2. Find KeepUp
3. Click "Remove" (the red button)
4. Reload the extension by clicking "Load Temporary Add-on..." again

### Check Extension Logs:
1. Open `about:debugging`
2. Find KeepUp
3. Click "Inspect"
4. This opens the developer console where you can see any errors

---

## Extension File Structure (Reference)

Your KeepUp extension folder should contain:
```
bookmarks/
├── manifest.json           # Extension configuration
├── popup.html              # Main UI
├── popup.js                # UI logic
├── background.js           # Auto-update logic
├── styles.css              # Styling
└── icons/                  # Icon folder
    ├── icon-16.png
    ├── icon-48.png
    └── icon-128.png
```

---

## Version Information

- **KeepUp Version**: 1.0.0
- **Manifest Version**: 3 (Firefox MV3 compatible)
- **Last Updated**: 2024-05-22

---

**You're all set! Start tracking your favorite sequential content with KeepUp today!**
