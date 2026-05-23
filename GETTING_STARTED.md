# KeepUp - Getting Started Checklist

## 📋 Your KeepUp Extension is Ready!

Use this checklist to get started quickly.

---

## ✅ Pre-Installation (5 minutes)

- [ ] Firefox browser is installed and up to date
- [ ] You know where your bookmarks folder is located:
  - **Path**: `/home/matteo/Documents/projects/Extension/bookmarks/`
- [ ] You can see all the files in that folder:
  - [ ] manifest.json
  - [ ] popup.html
  - [ ] popup.js
  - [ ] background.js
  - [ ] styles.css
  - [ ] README.md
  - [ ] INSTALLATION_GUIDE.md

---

## 🔧 Installation (2 minutes)

Follow these exact steps:

### Step 1: Open Firefox Developer Tools
- [ ] Open Firefox browser
- [ ] Type: `about:debugging` in address bar
- [ ] Press Enter
- [ ] You should see "Welcome to WebExtensions Debugging"

### Step 2: Load KeepUp
- [ ] Click "This Firefox" in left sidebar (if not already highlighted)
- [ ] Look for button "Load Temporary Add-on..."
- [ ] Click that button
- [ ] Navigate to: `/home/matteo/Documents/projects/Extension/bookmarks/`
- [ ] Click on file: `manifest.json`
- [ ] Click "Open"

### Step 3: Verify Installation
- [ ] New entry appears showing "KeepUp" with version "1.0.0"
- [ ] Status shows green "Enabled" indicator
- [ ] You see NO error messages
- [ ] Close the about:debugging tab

---

## 🎯 Find the KeepUp Icon (1 minute)

### Option A: Icon Appears Directly in Toolbar
- [ ] Look at top right of Firefox toolbar
- [ ] You should see KeepUp icon
- [ ] **Done!** Skip to next section

### Option B: Icon is Hidden in Extensions Menu
- [ ] Look for puzzle piece icon in top right
- [ ] Click the puzzle piece
- [ ] Find "KeepUp" in the dropdown menu
- [ ] Click the pin icon next to KeepUp to add to toolbar
- [ ] KeepUp icon now appears in toolbar permanently

---

## 🎓 Learn the Basics (5 minutes)

### The Three Main Buttons
1. **"+ Add Current"** (Blue) - Creates a new tracking entry for current page
2. **"↻ Update Now"** (Gray) - Updates current entry to current page's URL
3. **"History"** (Light blue) - View all updates and timestamps for an entry
4. **"Delete"** (Pink) - Remove an entry
5. **"Export Data"** (Bottom) - Save all data as backup
6. **"Import Data"** (Bottom) - Restore data from backup

---

## 🧪 First Test (2 minutes)

### Create Your First Tracking Entry
1. [ ] Navigate to any website (e.g., Wikipedia.org)
2. [ ] Click the KeepUp icon in toolbar
3. [ ] Click the blue "**+ Add Current**" button
4. [ ] Wait for green message: "Added: [page title]"
5. [ ] You should see your new entry in the popup
6. [ ] Entry shows page title, URL, and timestamp

**Success!** ✓ KeepUp is working!

---

## 📚 Read the Documentation (10 minutes)

Choose based on your needs:

### If you want quick tips
- [ ] Read **QUICK_REFERENCE.md** (5 minutes)
- [ ] You'll learn all essential commands

### If you're a beginner
- [ ] Read **INSTALLATION_GUIDE.md** (15 minutes)
- [ ] Detailed explanations for every feature
- [ ] Troubleshooting tips included
- [ ] Video-game style walkthroughs for each feature

### If you're technical
- [ ] Read **README.md** (10 minutes)
- [ ] Understand architecture and code organization
- [ ] Learn about storage and permissions

### If you want to test everything
- [ ] Follow **TESTING_GUIDE.md** (30 minutes)
- [ ] 15 comprehensive tests
- [ ] Verify every feature works correctly

---

## 💡 Try Some Real-World Scenarios

### Scenario 1: Track a Website Series
1. [ ] Go to a website you visit regularly (news site, forum, etc.)
2. [ ] Click KeepUp → "Add Current"
3. [ ] Navigate to another page on that site
4. [ ] Click KeepUp again
5. [ ] Notice the URL updated automatically (auto-update worked!)
6. [ ] Click "History" to see the timestamps

**Result**: ✓ Auto-update is working!

### Scenario 2: Manual Update
1. [ ] Navigate to a completely different website
2. [ ] Click KeepUp → "Update Now"
3. [ ] It should say "Updated tracking entry"
4. [ ] The entry now points to this new site

**Result**: ✓ Manual update works!

### Scenario 3: Backup Your Data
1. [ ] You now have some tracking entries
2. [ ] Click KeepUp → "Export Data" (bottom button)
3. [ ] A file downloads to your Downloads folder
4. [ ] Filename looks like: `keepup-backup-1234567890.json`

**Result**: ✓ Data backed up safely!

---

## 🎨 Optional: Customize (15 minutes)

### Make It Your Own

#### Change the Colors
- [ ] Open file: **styles.css** with a text editor
- [ ] Find lines with "primary-color": `#4f46e5`
- [ ] Change to your favorite color (any hex code)
- [ ] Example: `#FF6B6B` (red) or `#4ECDC4` (teal)
- [ ] Reload extension at about:debugging

#### Create Custom Icons
- [ ] See **icons/README.md** for instructions
- [ ] Use online tools like favicon-generator.org
- [ ] Save 16x16, 48x48, 128x128 PNG files
- [ ] Place in `icons/` folder
- [ ] Reload extension

---

## 🚀 Pro Tips to Get Started

### Tip 1: Backup Weekly
- [ ] Every Friday: Click "Export Data"
- [ ] Save to your cloud drive (Google Drive, OneDrive, etc.)
- [ ] Protects against data loss

### Tip 2: Create Entries for Different Series
- [ ] Manga on MangaDex → separate entry
- [ ] Same manga on different site → separate entry (different domain)
- [ ] Course on Udemy → separate entry
- [ ] Each domain gets its own tracking!

### Tip 3: Use History to Track Progress
- [ ] Click "History" on any entry
- [ ] See when you reached each chapter/lesson
- [ ] Track your reading/learning pace

### Tip 4: Don't Worry About Mistakes
- [ ] Delete entries you don't need
- [ ] Import from backup if you need to restore
- [ ] You can always start fresh

### Tip 5: One Click Away
- [ ] All actions are designed for 1-2 clicks
- [ ] Add Current: 2 clicks
- [ ] Update Now: 2 clicks
- [ ] View History: 2 clicks
- [ ] It's fast and efficient!

---

## ❓ Something Not Working?

### Problem: Icon doesn't appear in toolbar

**Quick Fix:**
1. Look for puzzle piece icon in top right
2. Click it
3. Find "KeepUp" in menu
4. Click pin icon next to it

→ See **INSTALLATION_GUIDE.md** "Troubleshooting" for more help

### Problem: "Unable to access current tab"

**Quick Fix:**
1. Make sure you're on a regular website (not about: pages)
2. Try refreshing the page
3. Try again

→ See **INSTALLATION_GUIDE.md** for details

### Problem: Auto-update not working

**Quick Fix:**
- Use "Update Now" button instead
- Still just one click!
- Some sites open new tabs, that's why

→ See **INSTALLATION_GUIDE.md** for detailed explanation

### Need more help?
- [ ] Check **INSTALLATION_GUIDE.md** "Troubleshooting" section
- [ ] Read **QUICK_REFERENCE.md** for quick answers
- [ ] Review **TESTING_GUIDE.md** for step-by-step procedures

---

## 📊 Your KeepUp Status

### Setup Progress
- [ ] Extension installed
- [ ] Icon visible in toolbar
- [ ] First entry created
- [ ] Tested auto-update
- [ ] Tested manual update
- [ ] Exported data backup
- [ ] Read quick reference

### ✅ You're Ready to Go!

Once you check all the boxes above, you know:
- How to install KeepUp
- How to use all main features
- How to backup your data
- Where to find help

---

## 🎓 Next: Deeper Learning (Optional)

When you're comfortable with basics:
- [ ] Read **TESTING_GUIDE.md** to test all features thoroughly
- [ ] Read **README.md** to understand the architecture
- [ ] Explore the code in popup.js and background.js
- [ ] Customize colors and styling

---

## 📁 File Reference

Keep this location handy - it's your extension folder:
```
/home/matteo/Documents/projects/Extension/bookmarks/
```

All your tracking data is stored in Firefox's memory, not in this folder.
But this folder contains the extension code that makes it all work.

---

## 🎉 Congratulations!

You now have a **professional, production-ready** Firefox extension installed and ready to use!

### What You Can Do:
✓ Track manga chapters  
✓ Follow online courses  
✓ Remember TV episodes  
✓ Bookmark any sequential content  
✓ Export and backup your data  
✓ Import your data anywhere  

### With Just One Click:
✓ Add tracking  
✓ Update position  
✓ View history  

---

## 📞 Quick Help Menu

| Need Help With | File to Read |
|---|---|
| Installation | INSTALLATION_GUIDE.md |
| Quick tips | QUICK_REFERENCE.md |
| All features | README.md |
| Testing | TESTING_GUIDE.md |
| Project overview | PROJECT_SUMMARY.md |
| Troubleshooting | INSTALLATION_GUIDE.md (Troubleshooting section) |

---

## ✨ You've Got This!

Your KeepUp extension is:
- ✅ Fully installed
- ✅ Ready to use
- ✅ Backed up with documentation
- ✅ Supported with guides
- ✅ Scalable for your needs

**Start tracking your favorite sequential content now!**

---

**Last Updated**: 2024-05-22  
**Extension Version**: 1.0.0  
**Status**: ✅ Production Ready
