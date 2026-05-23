# KeepUp - Smart Bookmarking Extension for Sequential Content

A production-ready Firefox Manifest V3 extension that revolutionizes how you track sequential content like manga chapters, online courses, TV episodes, and more.

## 🚀 Quick Start

### Installation (2 minutes)
1. Open Firefox and go to `about:debugging`
2. Click "Load Temporary Add-on..." 
3. Select the `manifest.json` file from this folder
4. KeepUp is now active!

See [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) for detailed beginner-friendly instructions.

## ✨ Core Features

- **Dynamic Tracking**: Create tracking entries for any series/course/content
- **Auto-Update Detection**: Automatically updates your position when you navigate to new chapters/episodes
- **Manual One-Click Update**: Override auto-detection with a single button click
- **Granular History**: Every update is timestamped and logged (format: `YYYY-MM-DD HH:MM:SS`)
- **Data Portability**: Export to JSON for backup, import to restore
- **Clean UI**: Modern, minimal design with dark/light mode support

## 📁 Project Structure

```
bookmarks/
├── manifest.json               # Firefox MV3 configuration
├── popup.html                  # Extension popup interface
├── popup.js                    # UI logic, import/export handling
├── background.js               # Service worker with auto-update logic
├── styles.css                  # Modern, responsive styling
├── icons/                      # Extension icons
│   ├── icon-16.png
│   ├── icon-48.png
│   └── icon-128.png
├── README.md                   # This file
└── INSTALLATION_GUIDE.md       # Step-by-step user guide
```

## 🎯 How It Works

### Add a Tracking Entry
1. Navigate to the content you want to track (e.g., a manga chapter)
2. Click the KeepUp icon
3. Click "Add Current"
4. Done! Entry created and tracked

### Auto-Update
- When you navigate to the next chapter/episode on the same domain
- KeepUp automatically updates the tracking entry
- All changes are logged with precise timestamps

### Manual Update
- Click "Update Now" to manually sync the entry to the current page
- Useful if auto-detection doesn't trigger (different site navigation patterns)

### View History
- Click "History" on any entry to see the complete update timeline
- See exactly when you reached each chapter/episode/lecture

### Export/Import Data
- **Export**: Backup all entries and history as JSON
- **Import**: Restore from backup on the same device or transfer to another

## 🔧 Technical Details

### Technology Stack
- **Language**: Vanilla JavaScript (no frameworks)
- **Manifest Version**: 3 (Firefox compatible)
- **Storage**: Firefox browser.storage API
- **UI**: Clean HTML5 + CSS3 with CSS variables for theming

### Key Technologies Used
- Firefox WebExtensions API (`browser.tabs`, `browser.storage.local`)
- Session storage for tab URL tracking
- URL parsing for domain extraction
- JSON serialization for data portability

### Permissions Required
- `storage` - Store tracking entries and history
- `tabs` - Access tab information and monitor navigation
- `<all_urls>` - Track navigation on any domain

## 📋 File Descriptions

### manifest.json
Firefox extension configuration defining:
- Extension metadata (name, version, description)
- Required permissions
- Service worker entry point
- Popup UI definition
- Icon definitions

### popup.html
Main user interface featuring:
- Header with extension branding
- Quick action buttons (Add Current, Update Now)
- Tracking entries list
- Data management buttons (Export, Import)
- Status message display area

### popup.js (UI Controller)
Complete implementation of:
- Event listeners for all buttons
- Tracking entry creation and deletion
- History modal window
- Export to JSON functionality
- Import from JSON with validation
- Real-time entry rendering

### background.js (Service Worker)
Backend logic implementing:
- Tab URL change monitoring
- Auto-detection of next content navigation
- Automatic tracking entry updates
- Badge updates showing tracking status
- Timestamp-based history logging

### styles.css
Modern styling including:
- CSS variables for theming support
- Dark/light mode detection
- Smooth transitions and animations
- Responsive design
- Clean typography and spacing

## 🎨 UI/UX Highlights

- **Minimal Clicks**: Add or update entries with just one click
- **Clean Design**: Modern sans-serif fonts, smooth transitions, professional color palette
- **Visual Feedback**: Status messages, badges, and hover states
- **Dark Mode**: Automatically respects system preferences
- **Accessibility**: Focus indicators, semantic HTML, clear visual hierarchy

## 📊 Data Structure

### Storage Format
```javascript
{
  "keepup_entries": [
    {
      "id": "entry_1716370200000_abc123xyz",
      "title": "Manga Chapter 50",
      "url": "https://example-manga.com/series/xyz/chapter-50",
      "domain": "example-manga.com",
      "dateAdded": "2024-05-22 10:30:15",
      "lastUpdated": "2024-05-22 16:45:33",
      "history": [
        {
          "timestamp": "2024-05-22 10:30:15",
          "url": "https://example-manga.com/series/xyz/chapter-50"
        },
        {
          "timestamp": "2024-05-22 14:20:19",
          "url": "https://example-manga.com/series/xyz/chapter-51"
        }
      ]
    }
  ]
}
```

### Export Format
Complete snapshot of all entries with version info for future compatibility.

## 🔒 Privacy & Security

- **Local Only**: All data stored locally in Firefox, never sent to servers
- **No Tracking**: Extension doesn't track user behavior beyond what's needed
- **No Analytics**: No telemetry or analytics collection
- **No External Calls**: All processing happens locally in the browser

## 🐛 Troubleshooting

See [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) for comprehensive troubleshooting, including:
- Extension not appearing in toolbar
- Auto-update not working on specific sites
- Import/export issues
- Data recovery procedures

## 💡 Use Cases

### Perfect For:
- **Manga Readers**: Track chapters across different manga sites
- **Online Students**: Follow courses on platforms like Udemy, Coursera, edX
- **TV Show Fans**: Remember where you are in series on streaming platforms
- **Webcomic Readers**: Track your progress through web serials
- **Audiobook Listeners**: Keep track of current position
- **Blog Series**: Follow multi-part articles and tutorials

## 📝 Notes for Developers

### Code Quality
- All code is written without placeholders
- Complete implementations for all features
- Clean, readable variable and function names
- No `// ... implement this ...` comments
- Proper error handling throughout

### Extensibility
To add new features:
1. Extend storage schema in popup.js and background.js
2. Add UI elements in popup.html
3. Style with CSS variables for consistency
4. Update manifest.json if new permissions needed

### Testing
Manual testing steps included in INSTALLATION_GUIDE.md, including:
- Adding entries
- Testing auto-update
- Testing manual updates
- Export/import verification

## 📄 License

This extension is provided as-is for personal use.

## 🎓 Learning Resources

This project demonstrates:
- Modern Firefox WebExtensions API usage
- Service Worker patterns for background tasks
- Storage API for persistent data
- Event delegation for dynamic DOM
- JSON serialization and file handling
- Responsive CSS with dark mode support
- Clean JavaScript patterns without frameworks

---

**Ready to start tracking? See [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) to get started in minutes!**
