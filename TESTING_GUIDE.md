# Testing Guide for KeepUp Extension

Complete step-by-step guide to test all features of the KeepUp extension.

## Pre-Test Checklist

- [ ] Firefox browser is installed
- [ ] All KeepUp files are in `/home/matteo/Documents/projects/Extension/bookmarks/`
- [ ] You have access to the internet (for testing)
- [ ] Browser tabs can be used for testing

## Test 1: Installation

### Steps:
1. Open Firefox
2. Type `about:debugging` in the address bar
3. Press Enter
4. Click "This Firefox" in the left sidebar
5. Click "Load Temporary Add-on..."
6. Navigate to `/home/matteo/Documents/projects/Extension/bookmarks/`
7. Click `manifest.json` and open it

### Expected Results:
- [ ] KeepUp appears in the list of loaded extensions
- [ ] Status shows "Enabled" (green indicator)
- [ ] No error messages appear

**Result**: ✓ PASS / ✗ FAIL

---

## Test 2: UI Loads Correctly

### Steps:
1. Click the KeepUp icon in the Firefox toolbar (or puzzle icon → KeepUp)
2. The popup window should open

### Expected Results:
- [ ] Popup appears with "KeepUp" header
- [ ] "Add Current" button is visible (blue button with + icon)
- [ ] "Update Now" button is visible (gray button with ↻ icon)
- [ ] "Export Data" and "Import Data" buttons appear at bottom
- [ ] Empty state message shows "No tracking entries yet"

**Result**: ✓ PASS / ✗ FAIL

---

## Test 3: Add Current Entry

### Steps:
1. Navigate to any website (e.g., https://www.wikipedia.org)
2. Click KeepUp icon
3. Click "Add Current" button
4. Wait for status message

### Expected Results:
- [ ] Green status message appears: "Added: [Page Title]"
- [ ] New tracking entry appears in the list
- [ ] Entry shows the page title
- [ ] Entry shows the page URL (truncated)
- [ ] Entry shows "Last updated: [timestamp]"
- [ ] Timestamp format is YYYY-MM-DD HH:MM:SS

**Result**: ✓ PASS / ✗ FAIL

**Entry should contain:**
```
Wikipedia (or page title)
https://www.wikipedia.org/ (truncated)
Last updated: 2024-05-22 14:30:15 (current time)
[History] [Delete] buttons
```

---

## Test 4: Manual Update

### Steps:
1. Navigate to a different website (e.g., https://www.github.com)
2. Click KeepUp icon
3. Note the current entry showing the Wikipedia page
4. Click "Update Now" button
5. Wait for status message

### Expected Results:
- [ ] Green status message appears: "Updated tracking entry"
- [ ] The entry URL changes to the new site (GitHub)
- [ ] "Last updated" timestamp changes to current time
- [ ] Previous URL is preserved in history (see Test 7)

**Result**: ✓ PASS / ✗ FAIL

---

## Test 5: Auto-Update Detection

### Steps:
1. Navigate to https://en.wikipedia.org/wiki/Cat
2. Click KeepUp → "Add Current"
3. Verify entry is created for Wikipedia
4. Navigate to another Wikipedia page: https://en.wikipedia.org/wiki/Dog
5. Wait 2 seconds for auto-update to process
6. Click KeepUp icon to refresh popup

### Expected Results:
- [ ] Entry URL automatically updates to the Dog page
- [ ] "Last updated" timestamp updates
- [ ] No user action needed (auto-detected because same domain)
- [ ] Both updates are in history

**Result**: ✓ PASS / ✗ FAIL

---

## Test 6: Delete Entry

### Steps:
1. Click KeepUp icon
2. Find any tracking entry
3. Click the "Delete" button on that entry
4. Confirmation dialog appears asking "Delete [Title]?"
5. Click "OK"

### Expected Results:
- [ ] Green status message: "Deleted tracking entry"
- [ ] Entry disappears from the list
- [ ] If last entry: empty state message reappears

**Result**: ✓ PASS / ✗ FAIL

---

## Test 7: View History

### Steps:
1. Add a tracking entry (Test 3)
2. Update the same entry to different URLs (Tests 4 & 5)
3. Click KeepUp icon
4. Click "History" button on the entry
5. History modal should open

### Expected Results:
- [ ] Modal window appears with title "Update History"
- [ ] "Added on" entry shows initial creation timestamp
- [ ] Each update is listed with its timestamp
- [ ] All URLs are shown for each update
- [ ] Timestamps are in YYYY-MM-DD HH:MM:SS format
- [ ] Multiple entries if you updated it several times
- [ ] X button closes the modal

**Example History:**
```
Added on
2024-05-22 14:30:15

2024-05-22 14:35:42
https://en.wikipedia.org/wiki/Cat

2024-05-22 14:36:10
https://en.wikipedia.org/wiki/Dog
```

**Result**: ✓ PASS / ✗ FAIL

---

## Test 8: Export Data

### Steps:
1. Create at least 2-3 tracking entries (from previous tests)
2. Click KeepUp icon
3. Click "Export Data" button
4. File dialog appears
5. Choose a location (e.g., Desktop)
6. File is saved

### Expected Results:
- [ ] Green status message: "Data exported successfully"
- [ ] File is downloaded with name format: `keepup-backup-[timestamp].json`
- [ ] File size is > 100 bytes (contains data)
- [ ] File can be opened in a text editor
- [ ] JSON file contains valid structure

**JSON Structure Check:**
1. Open the downloaded file with a text editor
2. Should contain:
   - [ ] `"version": "1.0.0"`
   - [ ] `"exportedAt": "[timestamp]"`
   - [ ] `"entries": [...]` array
   - [ ] Each entry has: id, title, url, domain, dateAdded, history
   - [ ] Entries are valid JSON (can be parsed)

**Result**: ✓ PASS / ✗ FAIL

---

## Test 9: Import Data

### Steps:
1. Export data from Test 8 (or have a backup file)
2. Delete all entries (or clear using multiple Delete buttons)
3. Verify empty state shows "No tracking entries yet"
4. Click "Import Data" button
5. File dialog appears
6. Select the exported JSON file
7. Confirmation dialog: "This will replace all existing tracking entries. Continue?"
8. Click OK

### Expected Results:
- [ ] Green status message: "Data imported successfully"
- [ ] All entries from the backup are restored
- [ ] Entry titles match the exported data
- [ ] URLs match the exported data
- [ ] History is restored for each entry
- [ ] Timestamps are preserved

**Result**: ✓ PASS / ✗ FAIL

---

## Test 10: Invalid Import

### Steps:
1. Create a text file with invalid JSON:
   ```
   { "invalid": "data" }
   ```
2. Save it as `.json`
3. Click "Import Data"
4. Select this invalid file

### Expected Results:
- [ ] Red status message appears
- [ ] Error specifies the problem (e.g., "Invalid file format")
- [ ] Existing entries are NOT affected
- [ ] Extension continues working

**Result**: ✓ PASS / ✗ FAIL

---

## Test 11: Badge Display

### Steps:
1. Add a tracking entry for wikipedia.org (from earlier tests)
2. Navigate to any Wikipedia page while KeepUp popup is closed
3. Look at the KeepUp icon in toolbar

### Expected Results:
- [ ] When on tracked domain: Badge shows "✓" with green background
- [ ] Hover over icon shows tooltip: "KeepUp: Tracking "[Entry Title]"
- [ ] When on non-tracked domain: Badge is empty or shows default
- [ ] Tooltip shows: "KeepUp: Click to add tracking"

**Result**: ✓ PASS / ✗ FAIL

---

## Test 12: UI Responsiveness

### Steps:
1. Open KeepUp popup
2. Click buttons and verify no freezing
3. Create multiple entries (5-10)
4. Scroll through the list
5. View history on several entries
6. Export and import large datasets

### Expected Results:
- [ ] All buttons respond immediately
- [ ] No lag when scrolling
- [ ] History modal opens/closes smoothly
- [ ] Export completes in < 2 seconds
- [ ] Import completes in < 2 seconds
- [ ] UI remains responsive throughout

**Result**: ✓ PASS / ✗ FAIL

---

## Test 13: Domain Matching

### Steps:
1. Add tracking for: https://www.example.com/page1
2. Navigate to: https://www.example.com/page2
3. Click "Update Now" - should find the entry
4. Navigate to: https://different-site.com/page
5. Click "Update Now" - should NOT find entry (different domain)

### Expected Results:
- [ ] Same domain updates work correctly
- [ ] Different domain shows error: "No tracking entry for this domain"
- [ ] Subdomain variations match correctly

**Result**: ✓ PASS / ✗ FAIL

---

## Test 14: Error Handling

### Steps:
1. Try clicking "Update Now" with no entries (should fail gracefully)
2. Try importing with popup closed (should work when reopened)
3. Test on special pages (about:home, about:config)
4. Test network disconnected/reconnected scenarios

### Expected Results:
- [ ] Clear error messages for each scenario
- [ ] No crashes or freezing
- [ ] Application recovers properly
- [ ] No data loss

**Result**: ✓ PASS / ✗ FAIL

---

## Test 15: Dark Mode (if system supports it)

### Steps:
1. Open Firefox Settings → General → Colors
2. Set to "Dark" mode
3. Open KeepUp popup

### Expected Results (on Dark Mode):
- [ ] UI is dark-themed (dark background, light text)
- [ ] Colors are readable
- [ ] All buttons are visible and clickable
- [ ] Contrast is good

**Result**: ✓ PASS / ✗ FAIL

---

## Final Summary

### Total Tests: 15
- ✓ Passed: ___ / 15
- ✗ Failed: ___ / 15

### Overall Assessment:
- [ ] All tests passed - Extension is production-ready
- [ ] Minor issues - Extension is usable with minor fixes
- [ ] Major issues - Extension needs debugging

### Notes:
```
[Use this section to document any issues or observations]




```

---

## Bonus: Real-World Usage Test

### Scenario: Track a Manga Series

1. Find a manga site (e.g., mangadex.org, manganelo.com)
2. Go to a chapter you're currently reading
3. Click KeepUp → "Add Current"
4. Read the chapter
5. Click "Next Chapter" button on the site
6. **Verify auto-update happened** (check last updated time)
7. Navigate to another random chapter
8. Click "Update Now" manually
9. View history to see your reading progression
10. Export your data
11. Delete the entry
12. Import your data to restore it

**Result**: ✓ PASS / ✗ FAIL

---

## Known Limitations (Not Bugs)

These are design choices, not failures:
- [ ] Each domain can only have one active tracking entry per Firefox window
- [ ] History shows all updates, but can't selectively delete specific history entries
- [ ] Import always replaces all data (no "merge" option)
- [ ] Extension only works on HTTP/HTTPS sites (not file://, data:, etc.)

---

**Testing complete! Document any issues and you're ready to use KeepUp.**
