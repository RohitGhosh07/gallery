# Google Drive Image Gallery with Face Detection

A modern, responsive image gallery that loads photos from Google Drive with advanced face detection and clustering capabilities. Includes a CORS proxy to solve Google Drive's image loading restrictions.

## ✨ Features

- 📸 **Auto-load images** from Google Drive folders
- 🔍 **Search & filter** by filename or date
- 🖼️ **Fullscreen viewer** with swipe/keyboard navigation
- 👤 **Face detection & clustering** - automatically group photos by people
- 🎨 **Modern UI** built with Tailwind CSS
- 🚫 **CORS-free** - proxy server handles Drive API restrictions

## 🚀 Quick Start

### Prerequisites

- Node.js installed (v16 or higher)
- Google Cloud API Key with Drive API enabled
- Public Google Drive folder with images

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gallery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API credentials**
   
   Edit `server.js` and `index.html` to add your Google API key:
   ```javascript
   const API_KEY = "YOUR_API_KEY_HERE";
   ```

4. **Set your Drive folder ID**
   
   In `index.html`, update:
   ```javascript
   const FOLDER_ID = "YOUR_FOLDER_ID_HERE";
   ```

5. **Start the proxy server**
   ```bash
   npm start
   ```
   Server runs on `http://localhost:3000`

6. **Open the gallery**
   
   Open `index.html` in your browser using Live Server (recommended) or by double-clicking the file.

## 🔧 Configuration

### Google API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google Drive API**
4. Create credentials → API Key
5. Copy the API key to `server.js` and `index.html`

### Drive Folder Setup

1. Create a folder in Google Drive with your images
2. Right-click folder → Share → Change to "Anyone with the link"
3. Copy folder ID from URL: `drive.google.com/drive/folders/FOLDER_ID_HERE`
4. Paste into `index.html`

## 🎮 How to Use

### Gallery Navigation
- **Click image** → Open fullscreen
- **Arrow keys** / **Swipe** → Navigate photos
- **Esc** → Close fullscreen
- **Search bar** → Filter by name/date

### Face Detection
1. Click **"People"** button to open panel
2. Click **"Analyze faces"** to scan all photos
3. Wait for analysis (can take a few minutes depending on image count)
4. Click on detected **person clusters** to filter photos by person

## 🏗️ Architecture

### Why a Proxy Server?

Google Drive doesn't allow direct image loading in browsers due to CORS restrictions. The proxy:
- Fetches images from Drive API using your key
- Serves them with proper CORS headers
- Enables face detection (requires pixel data access)

### File Structure

```
gallery/
├── index.html          # Main gallery UI
├── server.js           # Express proxy server
├── package.json        # Node.js dependencies
└── README.md          # This file
```

## 🔍 Face Detection Details

- Uses **face-api.js** library with TinyFaceDetector
- Creates face embeddings (128D descriptors)
- Clusters similar faces using euclidean distance
- Adjustable matching threshold (default: 0.52)
- Runs entirely in browser (CPU-intensive)

## ⚙️ Customization

### Change Port

In `server.js`:
```javascript
const PORT = 3000; // Change to your preferred port
```

In `index.html`:
```javascript
const PROXY_BASE = "http://localhost:3000/img/"; // Update port here too
```

### Adjust Face Detection

- **Threshold**: Lower = stricter matching, more clusters
- **Input size**: Higher = more accurate, slower (in code)

## 🐛 Troubleshooting

### Images not loading
- Check if proxy server is running (`npm start`)
- Verify API key is correct in both files
- Ensure Drive folder is publicly accessible
- Check browser console for errors (F12)

### Face detection fails
- Ensure images load properly first
- Use Live Server (file:// protocol won't work)
- Check CORS in console
- Images need to be clear enough for detection

### API errors
- Verify Drive API is enabled in Google Cloud Console
- Check API key restrictions
- Confirm folder is shared publicly

## 📦 Dependencies

- **express**: Web server for proxy
- **@vladmandic/face-api**: Face detection and recognition
- **Tailwind CSS**: UI styling (loaded via CDN)

## 🚀 Production Deployment

For production use:

1. Use environment variables for API keys
2. Deploy proxy to cloud (Vercel, Railway, Cloud Run)
3. Use service account instead of API key
4. Add rate limiting and caching
5. Update PROXY_BASE URL in HTML

## 📄 License

ISC

## 🙏 Credits

- Face detection: [face-api.js](https://github.com/vladmandic/face-api)
- UI: [Tailwind CSS](https://tailwindcss.com)
