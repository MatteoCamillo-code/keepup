# KeepUp Icon Files

This folder contains the extension icons for KeepUp. Firefox displays these in the extensions menu and toolbar.

## Icon Sizes Required:
- `icon-16.png` - 16x16 pixels (toolbar icon, small)
- `icon-48.png` - 48x48 pixels (extensions menu icon)
- `icon-128.png` - 128x128 pixels (large extensions menu icon)

## Current Status:

**Important**: The manifest.json references these icon files, but they are optional for testing purposes. 

If the PNG files are missing:
- Firefox will display a default puzzle piece icon instead
- **The extension will work perfectly** - this doesn't affect any functionality
- You can still install and use KeepUp fully

## Creating Icons:

### Option 1: Use Online Icon Generator (Easiest)
1. Go to https://www.favicon-generator.org/
2. Design or upload an icon
3. Generate PNG files in sizes 16x16, 48x48, and 128x128
4. Download and save them to this folder

### Option 2: Use Professional Design Tool
- Figma (Free): https://www.figma.com/
- Sketch: https://www.sketch.com/
- Adobe XD: https://www.adobe.com/products/xd.html

### Option 3: Use Simple Design
Create a simple icon with:
- Color: Deep indigo (#4f46e5)
- Symbol: Letter "K" for KeepUp, or a bookmark symbol
- Style: Modern, minimal, flat design

### Option 4: Keep Using Default Icon
Firefox will display a default icon, which is totally fine for testing and development.

## Design Suggestions:
- Use the primary brand color: `#4f46e5` (indigo)
- Incorporate a bookmark or tracking theme
- Keep it simple and recognizable at small sizes
- Ensure good contrast for visibility

## For Production:
If you're publishing this extension to the Firefox Add-ons Store, you'll want professional-looking icons. Consider hiring a designer or using a service like Fiverr.

---

**Current Status**: Extension works perfectly without custom icons. Add them when ready!
