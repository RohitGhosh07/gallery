# 📸 Intelligent Photo Gallery

A modern photo gallery with AI-powered face recognition and dual storage modes. Features client-side face clustering, server-side persistent storage, and an elegant dark interface.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)

## ✨ Features

### 🎯 Core Features
- **🧠 Face Recognition** - AI-powered face detection and clustering using face-api.js
- **👥 People Grouping** - Automatically groups photos by detected faces
- **💾 Dual Storage** - Client-side (localStorage) or server-side (file system) storage
- **📤 Multiple Upload** - Upload multiple photos at once with drag & drop
- **🔍 Smart Search** - Real-time search across titles and metadata
- **🎭 People Filter** - Filter gallery by detected persons
- **🔎 Fullscreen Viewer** - Immersive viewer with keyboard and swipe navigation
- **📱 Mobile-First Design** - Touch-optimized responsive interface

### 🤖 AI Features
- **Face Detection** - Powered by @vladmandic/face-api (TinyFaceDetector)
- **Face Clustering** - Groups similar faces into "people" automatically
- **Adjustable Threshold** - Fine-tune face matching sensitivity (0.35-0.70)
- **Cross-origin Support** - Works with server-hosted images
- **In-Browser Processing** - All AI runs client-side, no cloud required

### 🎨 UI/UX Features
- **Dark Theme** - Modern dark interface with zinc color palette
- **Smooth Animations** - Polished transitions and hover effects
- **Responsive Grid** - 2-5 columns based on screen size
- **Keyboard Shortcuts** - Arrow keys for navigation, ESC to close
- **Touch Gestures** - Swipe to navigate in fullscreen mode
- **Progress Indicators** - Real-time feedback for face analysis

## 🚀 Quick Start

### Prerequisites

- **Node.js** 14.0.0 or higher
- **npm** (comes with Node.js)
- Modern web browser (Chrome, Firefox, Edge, Safari)

### Installation

```bash
# Clone or download the repository
cd gallery

# Install dependencies
npm install

# Start the server
npm start
```

The server will start at `http://localhost:3000`

### Usage

#### 1. Upload Photos
- Click the **📤 Upload** button in the top-right
- Select one or multiple photos from your device
- Photos are stored on the server in the `uploads/` directory
- Metadata is saved in `photos-metadata.json`

#### 2. Browse Gallery
- Scroll through the responsive photo grid
- Use the **search bar** to filter by title or metadata
- Click **Clear** to reset search

#### 3. Analyze Faces (AI Feature)
- Click **People** button to open the face analysis panel
- Click **Analyze faces** to start face detection
- Wait for processing (progress bar shows status)
- Detected people appear as circular thumbnails
- Click any person to filter photos containing them
- Use **Show all** to clear the filter
- Adjust **Match threshold** slider for sensitivity

#### 4. Fullscreen Viewer
- Click any photo to open fullscreen viewer
- Navigate with:
  - **Arrow keys** (← →)
  - **Screen edges** (click left/right)
  - **Swipe** gestures on mobile
- Press **ESC** or click **✕** to close

## ⚠️ Important Notes & Limitations

### Storage
- Photos stored in server's `uploads/` directory
- Metadata in `photos-metadata.json` file
- No database required (JSON file storage)
- Server must be running to access photos
- Files persist on disk until manually deleted

### Face Recognition Performance
- **CPU-intensive**: Runs entirely in browser JavaScript
- **Processing time**: ~1-5 seconds per photo (varies by device)
- **Memory usage**: Can be high with many photos (100+ photos may lag)
- **Model download**: ~6MB on first analysis (cached after)
- **CORS requirement**: Images must be served with proper CORS headers
- **Accuracy**: ~85-95% for clear, frontal faces; lower for profiles/poor lighting

### Browser Requirements
- Modern browser with ES6 support
- CORS-enabled environment (won't work with `file://` protocol)
- Use `http://localhost:3000` or a web server
- Sufficient RAM for face-api.js models

### Limitations
- Max 10 photos per upload batch
- Max 10MB per photo file
- Face recognition not instant (CPU-bound)
- No cloud sync or multi-device support
- No user authentication or permissions

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express** 4.18+ - Web framework
- **Multer** 1.4+ - File upload middleware
- **CORS** 2.8+ - Cross-origin resource sharing

### Frontend
- **HTML5** - Semantic markup
- **Tailwind CSS v3** - Utility-first CSS (CDN)
- **Vanilla JavaScript** - No framework dependencies
- **face-api.js** 0.30.5 - Face detection and recognition (@vladmandic fork)

### APIs & Storage
- **FileReader API** - Client-side file processing
- **Express Static** - Serve uploaded images
- **JSON File Storage** - Metadata persistence
- **File System** - Server-side image storage

## 📂 Project Structure

```
gallery/
├── index.html              # Frontend application
├── server.js               # Express server with API
├── package.json            # Dependencies and scripts
├── photos-metadata.json    # Photo metadata storage
├── uploads/                # Uploaded photos directory
├── README.md              # This file
└── SERVER-README.md       # Additional server documentation
```

## 💡 How It Works

### Storage Architecture
- **Server-Side Storage**: Photos uploaded via Multer middleware
- **File System**: Images stored in `/uploads` directory with unique filenames
- **Metadata**: Photo info (title, date, path) saved in `photos-metadata.json`
- **REST API**: Express endpoints for upload, list, and delete operations

### Face Recognition Pipeline
1. **Model Loading**: Downloads face-api.js models from CDN (~6MB total)
   - TinyFaceDetector - Fast face detection
   - FaceLandmark68TinyNet - Facial landmarks
   - FaceRecognitionNet - 128-dimensional face descriptors

2. **Face Detection**: For each photo:
   - Loads image with CORS support
   - Detects all faces using TinyFaceDetector (416px input size)
   - Extracts 128-dimensional descriptor vectors

3. **Clustering**: Groups faces by similarity
   - Compares descriptors using Euclidean distance
   - Matches faces within threshold (default 0.52)
   - Creates clusters with mean descriptors
   - Crops face thumbnails for visualization

4. **Filtering**: Click person → shows only photos containing that face cluster

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/photos` | List all photos with metadata |
| POST | `/api/upload` | Upload multiple photos (max 10, 10MB each) |
| DELETE | `/api/photos/:id` | Delete photo by ID |
| GET | `/api/health` | Server health check |

## ⚙️ Configuration

### Server Settings

Edit [server.js](server.js) to customize:

```javascript
const PORT = 3000;  // Change server port

// File upload limits
limits: {
  fileSize: 10 * 1024 * 1024  // Max file size (default 10MB)
}

// Multer accepts up to 10 files
upload.array('images', 10)
```

### Face Recognition Settings

In [index.html](index.html):

```javascript
// Face detection options
const options = new faceapi.TinyFaceDetectorOptions({
  inputSize: 416,      // Higher = more accurate but slower (128, 160, 224, 320, 416, 512, 608)
  scoreThreshold: 0.5  // Minimum confidence (0-1)
});

// Match threshold (adjustable via UI slider)
const thresholdValue = 0.52;  // Lower = stricter matching
```

### UI Customization

Change Tailwind classes in [index.html](index.html):

```javascript
// Color scheme
bg-zinc-950    // Main background (very dark)
text-zinc-100  // Primary text (white-ish)
sky-500        // Accent color (blue)
border-white/10  // Subtle borders
```

## 🔧 Browser Support

- ✅ **Chrome/Edge** 88+ (Recommended)
- ✅ **Firefox** 78+
- ✅ **Safari** 14+
- ✅ **Mobile browsers** (iOS Safari 14+, Chrome Mobile 88+)

**Required APIs:**
- ES6+ JavaScript (async/await, arrow functions, modules)
- Fetch API for server communication
- Canvas API for face thumbnail cropping
- FileReader API for file uploads
- WebAssembly (used by face-api.js)

## 📝 Keyboard Shortcuts

### Fullscreen Viewer
- `←` / `→` - Navigate previous/next photo
- `Esc` - Close fullscreen viewer

### Global
- `/` - Focus search bar (when available)

## 📱 Responsive Grid

| Screen Size | Grid Columns | Layout |
|-------------|--------------|--------|
| Mobile (< 640px) | 2 columns | Stacked |
| Tablet (640px - 768px) | 3 columns | Compact |
| Desktop (768px - 1024px) | 4 columns | Regular |
| Large (1024px+) | 5 columns | Spacious |

## 🧪 Face Recognition Tips

### For Best Results
- **Good lighting**: Well-lit, clear faces
- **Front-facing**: Faces looking at camera work best
- **High resolution**: Larger images = better detection
- **Clear faces**: Avoid sunglasses, heavy shadows
- **Multiple photos**: More photos = better clustering

### Threshold Adjustment
- **Lower (0.35-0.45)**: Stricter matching, more separate people
- **Medium (0.45-0.55)**: Balanced (recommended)
- **Higher (0.55-0.70)**: Looser matching, fewer people

### Performance
- Start with 10-20 photos to test
- Analysis is one-time (results cached in memory)
- Clear cache to re-analyze with different threshold
- Use a local server (avoid network delays)

## 🚀 Deployment

### Development
```bash
npm start
# Server runs on http://localhost:3000
```

### Production

1. **Set environment variables:**
```bash
export PORT=3000
export NODE_ENV=production
```

2. **Run with PM2:**
```bash
npm install -g pm2
pm2 start server.js --name gallery
pm2 save
```

3. **Configure reverse proxy (nginx):**
```nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

## 🔒 Security Considerations

- **File validation**: Only images allowed (jpeg, jpg, png, gif, webp)
- **Size limits**: Max 10MB per file prevents abuse
- **No authentication**: Add auth middleware for production
- **CORS**: Currently allows all origins (restrict in production)
- **File naming**: Random filenames prevent overwrites
- **Input sanitization**: Consider adding for metadata fields

## 🐛 Troubleshooting

### Photos won't upload
- ✅ Check server is running (`npm start`)
- ✅ Verify port 3000 is not in use
- ✅ Check browser console for errors
- ✅ Ensure file size < 10MB

### Face recognition not working
- ✅ Use `http://` not `file://` protocol
- ✅ Check browser console for CORS errors
- ✅ Ensure good internet (models download from CDN)
- ✅ Try on Chrome/Edge (best compatibility)
- ✅ Check images have clear, visible faces

### Server errors
- ✅ Run `npm install` to install dependencies
- ✅ Check Node.js version (>= 14.0.0)
- ✅ Verify `uploads/` folder exists
- ✅ Check file permissions

### Performance issues
- ✅ Limit analysis to <100 photos at once
- ✅ Close other browser tabs
- ✅ Use modern browser (Chrome recommended)
- ✅ Reduce `inputSize` in face detector options

## 🤝 Contributing

Contributions welcome! Feel free to:

- 🐛 Report bugs via issues
- 💡 Suggest features or enhancements
- 🔧 Submit pull requests
- 📖 Improve documentation
- ⭐ Star the repository

### Development Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Multer File Upload](https://github.com/expressjs/multer)
- [face-api.js Documentation](https://github.com/vladmandic/face-api)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👏 Credits

- **face-api.js** - @vladmandic for the excellent face detection library
- **Tailwind CSS** - For the utility-first CSS framework
- **Express.js** - For the robust web framework

## 📞 Support

Having issues or questions?

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review [SERVER-README.md](SERVER-README.md) for server details
3. Search existing issues
4. Open a new issue with details

---

**Built with ❤️ - An intelligent photo gallery with face recognition**

*Version 1.0.0 | Last updated February 11, 2026*
