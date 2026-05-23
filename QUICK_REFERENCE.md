# KeepUp Quick Reference

## One-Page Cheat Sheet for KeepUp Users

### Getting Started (30 seconds)
```
1. Install: Open about:debugging → Load manifest.json → Done
2. Add tracking: Click KeepUp → "Add Current" → Done
3. Use auto-update: Just navigate normally, KeepUp updates automatically
4. Manual update: Click KeepUp → "Update Now"
```

### Core Actions

| Action | Steps | Result |
|--------|-------|--------|
| **Add Tracking** | Click KeepUp → "Add Current" | Tracks current page, starts history |
| **Auto-Update** | Navigate to next content on same site | KeepUp updates automatically |
| **Manual Update** | Click KeepUp → "Update Now" | Updates tracking to current page |
| **View History** | Click KeepUp → Find entry → "History" | Shows all timestamps and URLs |
| **Delete Entry** | Click KeepUp → Find entry → "Delete" | Removes tracking (data lost) |
| **Export Data** | Click KeepUp → "Export Data" | Downloads JSON backup file |
| **Import Data** | Click KeepUp → "Import Data" → Select file | Restores all entries from backup |

### Auto-Update Explained

**When it works:**
- You're on a tracked domain (e.g., mangasite.com)
- You click "Next Chapter" or similar navigation
- The URL changes to a new chapter
- KeepUp automatically updates your entry ✓

**When to use manual update:**
- Site opens content in a new tab instead of navigating
- You navigate in an unusual way
- Just click "Update Now" - still one click!

### Understanding the Timestamp Format

KeepUp uses: `YYYY-MM-DD HH:MM:SS`

Example: `2024-05-22 14:30:45`
- **2024-05-22** = May 22, 2024 (Year-Month-Day)
- **14:30:45** = 2:30:45 PM (Hour:Minute:Second in 24-hour format)

### Data Structure (What Gets Stored)

For each tracking entry:
- **Title**: Page title (e.g., "Manga Chapter 50")
- **URL**: Current position (e.g., "example.com/series/xyz/chapter-50")
- **Domain**: Website domain (e.g., "example.com")
- **History**: Timestamped list of all updates

### Backup Strategy

**Recommended Schedule:**
- Every week: Export your data
- Before major Firefox updates: Export your data
- When switching devices: Import on new device

**How to remember:**
1. First time adding a tracking entry → Export immediately
2. Every Friday → Quick export
3. Switching browsers/devices → Export before leaving, import on arrival

### Troubleshooting at a Glance

| Problem | Quick Fix |
|---------|-----------|
| Icon not visible | Right-click KeepUp → Pin to toolbar |
| Auto-update not working | Use "Update Now" manually (same result) |
| Want to restore deleted entry | Import from backup JSON file |
| Need to move data to new device | Export on old device, import on new |
| Icon says "disabled" | Open about:debugging, re-enable it |
| "No tracking entry for this domain" | Click "Add Current" first |

### Keyboard Shortcuts
Unfortunately, KeepUp doesn't have keyboard shortcuts yet (they require additional permissions). But everything is just one click away!

### Privacy Check

✓ All data stays on your computer  
✓ No internet connection required  
✓ No tracking of your behavior  
✓ No ads or telemetry  
✓ Open source code (you can review it)  

### Best Practices

1. **Use Distinct Titles**: If tracking multiple series, use clear names
2. **Regular Backups**: Export weekly to prevent data loss
3. **One Entry Per Series**: Each domain gets one tracking entry per tracking session
4. **Check History**: Use History view to review your reading/watching progress
5. **Import Carefully**: Confirm before importing (replaces all data)

### Common Use Cases

**Reading Manga:**
```
1. Find manga on site → Click KeepUp → "Add Current"
2. Each time you read new chapter → KeepUp auto-updates
3. History shows your entire reading progression
```

**Taking Online Course:**
```
1. Go to current lesson → Click KeepUp → "Add Current"
2. Take lessons on same platform → KeepUp auto-updates
3. Check history to see your learning timeline
```

**Watching TV Series:**
```
1. Navigate to current episode → Click KeepUp → "Add Current"
2. When you watch next episode → KeepUp auto-updates
3. Export periodically for backup
```

### File Structure Reminder

```
bookmarks/                    ← Your extension folder
├── manifest.json            ← Configuration (don't edit)
├── popup.html               ← UI code (don't edit)
├── popup.js                 ← Extension logic (don't edit)
├── background.js            ← Auto-update logic (don't edit)
├── styles.css               ← Design (don't edit)
├── README.md                ← Full documentation
├── INSTALLATION_GUIDE.md    ← Detailed setup guide
├── QUICK_REFERENCE.md       ← This file
└── icons/                   ← Icon folder
    ├── icon-16.png          ← Optional (Firefox uses default if missing)
    ├── icon-48.png
    └── icon-128.png
```

### Getting Help

1. **Installation issues** → See INSTALLATION_GUIDE.md
2. **Feature questions** → See README.md
3. **Troubleshooting** → See INSTALLATION_GUIDE.md "Troubleshooting" section
4. **How to use** → See INSTALLATION_GUIDE.md "Creating Your First Tracking Entry"

### Pro Tips

- **Backup location**: Save exports to a cloud drive (Google Drive, OneDrive, Dropbox) for extra safety
- **Multiple series**: Create new entries for different sources - they stay separate by domain
- **History analysis**: Your history log shows exactly how often you use each tracked series
- **Data migration**: Export on old device, import on new device - instant transfer!

### Key Stats

- **Install time**: < 2 minutes
- **Time to add tracking**: 1 click (~1 second)
- **Time to export**: 1 click (~1 second)
- **Data retention**: Unlimited (depends on Firefox storage)
- **Auto-update latency**: Instant (detects on page load)

---

**That's it! You now know everything needed to master KeepUp. Happy tracking!**

For more details, see the full [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) or [README.md](README.md).
