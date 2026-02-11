# 📸 Mobile Photo Gallery

A modern, mobile-first photo gallery inspired by Google Photos with a sleek dark theme and intuitive interface.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎯 Core Features
- **Full-Screen Image Viewer** - Tap any photo to view in full screen with smooth animations
- **Mobile-First Design** - Optimized for mobile devices with touch-friendly interactions
- **Responsive Grid Layout** - Adaptive grid that adjusts from 2 to 8 columns based on screen size
- **Date-Based Organization** - Photos organized by Today, Yesterday, and Last Week sections
- **Dark Mode Ready** - Beautiful dark theme with proper contrast ratios

### 📱 Mobile Features
- **Bottom Navigation Bar** - Easy-to-reach navigation at the bottom of the screen
- **Touch Gestures** - Smooth swipe and tap interactions
- **Full-Screen Image Modal** - Immersive image viewing experience
- **Close with Tap** - Tap anywhere or use the close button to exit full-screen
- **Mobile-Optimized Grid** - 2-column layout for comfortable mobile viewing

### 🎨 UI/UX Features
- **Smooth Animations** - Transitions and hover effects for modern feel
- **Sticky Headers** - Section headers stay visible while scrolling
- **Backdrop Blur Effects** - Modern glassmorphism effects
- **Interactive Overlays** - Favorite and more options on photo hover/tap
- **Search Bar** - Quick photo search functionality
- **Storage Widget** - Visual storage meter (desktop only)

## 🚀 Quick Start

### Installation

1. Clone or download this repository
2. Open `index.html` in your browser
3. That's it! No build process or dependencies required.

### Usage

#### On Mobile:
1. **View Photos** - Scroll through your timeline-organized gallery
2. **Full-Screen View** - Tap any photo to view it full screen
3. **Navigate** - Use the bottom navigation bar to switch between Photos, Search, Albums, and Library
4. **Close Image** - Tap anywhere on the full-screen image or use the × button to close

#### On Desktop:
1. Use the sidebar navigation for quick access to different sections
2. Hover over photos to see favorite and more options
3. Grid automatically expands to show more photos on larger screens

## 📱 Responsive Breakpoints

| Screen Size | Grid Columns | Navigation |
|-------------|--------------|------------|
| Mobile (< 640px) | 2 columns | Bottom Nav |
| Tablet (640px - 1024px) | 3-4 columns | Bottom Nav |
| Desktop (> 1024px) | 5-6 columns | Sidebar + Top Bar |
| Large Desktop (> 1280px) | 6-8 columns | Sidebar + Top Bar |

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **Tailwind CSS v3** - Utility-first CSS framework (CDN)
- **Vanilla JavaScript** - No framework dependencies
- **Unsplash API** - High-quality placeholder images

## 📂 Project Structure

```
gallery/
├── index.html          # Main HTML file with embedded styles and scripts
└── README.md          # Project documentation
```

## 🎨 Customization

### Change Colors

The project uses Tailwind's color system. To customize:
- **Primary Color**: Change `blue-600` classes to your preferred color
- **Dark Background**: Modify `zinc-950` classes
- **Accent Color**: Update gradient colors in `from-blue-500 to-purple-600`

### Add Your Own Images

Replace Unsplash URLs in the `<img>` tags:
```html
<img src="your-image-url.jpg" alt="Description" />
```

### Modify Grid Layout

Adjust grid columns in the main sections:
```html
<!-- Current: 2 cols mobile, 6 cols desktop -->
<div class="grid grid-cols-2 ... xl:grid-cols-6">

<!-- Custom: 3 cols mobile, 8 cols desktop -->
<div class="grid grid-cols-3 ... xl:grid-cols-8">
```

## 🌟 Key Features Explained

### Full-Screen Image Viewer
When you tap/click on any photo, a full-screen modal opens with:
- Black background overlay
- Centered, scaled image that fits the screen
- Close button (×) in the top-right
- Tap anywhere to close
- Smooth fade-in/fade-out animations

### Mobile Bottom Navigation
Fixed navigation bar at the bottom includes:
- **Photos** - Main gallery view (active)
- **Search** - Search your photos
- **Albums** - Organized collections
- **Library** - Your photo library

### Responsive Design
The gallery automatically adapts:
- **Mobile**: 2-column grid, bottom navigation
- **Tablet**: 3-4 column grid
- **Desktop**: 5-6 column grid, sidebar navigation
- **Large Desktop**: Up to 8 columns for maximum screen usage

## 📸 Image Sources

All images are sourced from [Unsplash](https://unsplash.com), a free high-quality photo library. The URLs include automatic cropping and resizing parameters for optimal performance.

## 🔧 Browser Support

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📞 Support

For issues or questions, please open an issue on the repository.

---

**Made with ❤️ for mobile photography enthusiasts**

*Last updated: February 11, 2026*
