# 📸 Local Photo Gallery

A modern, mobile-first photo gallery that stores your images locally in your browser. No backend, no server, just pure client-side storage.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎯 Core Features
- **💾 Local Storage** - All photos stored in browser localStorage (no server needed)
- **📤 Multiple Upload** - Upload multiple photos at once
- **🔍 Smart Search** - Search by title, place, date, or tags
- **🏷️ Category Filters** - Filter by People, Places, or Things
- **✅ Batch Operations** - Select and delete multiple photos
- **🔎 Lightbox Viewer** - Full-screen viewer with zoom, pan, and navigation
- **📱 Mobile-First** - Optimized for touch devices with intuitive controls

### 📱 Mobile Features
- **Bottom Navigation Bar** - Easy-to-reach controls at the bottom
- **Touch-Optimized** - Large tap targets and smooth interactions
- **Prominent Upload Button** - Clear call-to-action for adding photos
- **Responsive Grid** - Adapts from 2 to 5 columns based on screen size

### 🎨 UI/UX Features
- **Dark Theme** - Modern dark interface with proper contrast
- **Smooth Animations** - Polished transitions throughout
- **Empty State** - Helpful message when no photos exist
- **Keyboard Shortcuts** - Navigate gallery with arrow keys, zoom with +/-
- **Double-Click Zoom** - Quick zoom toggle in lightbox

## 🚀 Quick Start

### Installation

1. Download `index.html`
2. Open it in any modern web browser
3. That's it! No installation or build process required.

### Usage

#### Upload Photos:
1. Click/tap the **Upload** button (blue button on mobile, top-right on desktop)
2. Select one or multiple photos from your device
3. Photos will be converted to base64 and stored in localStorage

#### Browse Photos:
1. Scroll through your gallery
2. Use the search bar to find specific photos
3. Filter by category chips: All, People, Places, Things
4. Sort by newest or oldest first

#### View Full-Screen:
1. Tap/click any photo to open lightbox
2. Use arrow keys (← →) or buttons to navigate
3. Zoom with mouse wheel, + / - keys, or zoom buttons
4. Drag to pan when zoomed in
5. Press Escape or tap Close to exit

#### Manage Photos:
1. Click **Select** button to enter selection mode
2. Tap photos to select them
3. Use **Select all** or **Clear** buttons
4. Click **Delete** to remove selected photos (with confirmation)

## 📱 Responsive Breakpoints

| Screen Size | Grid Columns | Navigation |
|-------------|--------------|------------|
| Mobile (< 640px) | 2 columns | Bottom Nav |
| Small (640px) | 3 columns | Bottom Nav |
| Medium (768px) | 4 columns | Top Bar |
| Large (1024px+) | 5 columns | Top Bar |

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **Tailwind CSS v3** - Utility-first CSS (CDN)
- **Vanilla JavaScript** - Pure JS, no frameworks
- **localStorage API** - Client-side persistent storage
- **FileReader API** - Convert images to base64

## 📂 Project Structure

```
gallery/
├── index.html          # Complete single-file application
└── README.md          # This file
```

## 💡 How It Works

### Storage
- Photos are converted to **base64 data URLs**
- Stored in browser's **localStorage** under key `gallery_photos`
- Each photo includes: id, title, place, date, time, tags, and base64 src

### Persistence
- Photos persist across browser sessions
- Survives page refreshes and browser restarts
- **Lost when clearing browser data or cache**

### Limitations
- localStorage typically limited to **5-10MB** per domain
- Recommended max **50-100 photos** for best performance
- No cloud backup or sync
- No sharing between devices

## ⚠️ Important Notes

- **Photos are stored ONLY in your browser**
- Clearing browser data/cache will **delete all photos**
- Private browsing won't save photos after closing
- Not suitable for large photo libraries (use cloud services for that)
- Each browser has independent storage (Chrome ≠ Firefox)

## 🎨 Customization

### Change Theme Colors
Search for these in `index.html` and replace:
- `bg-zinc-950` - Main background
- `text-zinc-100` - Primary text
- `sky-500` - Accent color (blue)
- `border-white/10` - Border opacity

### Modify Default Tags
In the upload function, change:
```javascript
tags: ["things"],  // Change to your preferred default tag
```

### Adjust Storage Key
Change the storage key:
```javascript
const STORAGE_KEY = "gallery_photos";  // Rename this
```

## 🔧 Browser Support

- ✅ Chrome/Edge 88+
- ✅ Firefox 78+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari 14+, Chrome Mobile 88+)

Requires support for:
- localStorage API
- FileReader API  
- ES6 JavaScript (arrow functions, async/await)

## 📝 Keyboard Shortcuts

### Lightbox Mode:
- `←` / `→` - Previous/Next photo
- `+` / `=` - Zoom in
- `-` - Zoom out
- `Esc` - Close lightbox

### Global:
- `/` - Focus search bar

## 🤝 Contributing

Feel free to fork and customize for your needs! Suggestions welcome.

## 📞 Support

For issues or questions, please open an issue on the repository.

---

**Made with ❤️ - A simple, clean, functional photo gallery**

*Last updated February 11, 2026*
