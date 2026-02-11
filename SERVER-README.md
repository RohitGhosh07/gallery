# 📸 Gallery with Server-Side Image Storage

A modern photo gallery with face recognition and server-side image storage. Upload your images and they'll be stored on the backend server!

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install:
- **Express** - Web server framework
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### 2. Start the Server

```bash
npm start
```

The server will start on **http://localhost:3000**

You should see:
```
✅ Gallery server running at http://localhost:3000
📁 Uploads directory: C:\Users\rohit\Projects\gallery\uploads
📸 Photos in gallery: 0
```

### 3. Open the Gallery

Open your browser and go to:
```
http://localhost:3000
```

## ✨ Features

### 📤 Image Upload
- Click the **"📤 Upload"** button in the top bar
- Select one or multiple images from your device
- Images are uploaded to the server and stored in the `uploads/` folder
- Supports: JPG, PNG, GIF, WebP
- Max file size: 10MB per image

### 🖼️ Gallery Features
- **Face Recognition** - Detect and group similar faces
- **Search** - Search by title or metadata
- **Fullscreen Viewer** - Click any photo to view fullscreen
- **Navigation** - Use arrow keys, swipe, or buttons to navigate
- **People Filter** - Click "People" to analyze faces and filter by person

### 🔧 Backend Features
- **Server Storage** - Images stored in `uploads/` directory
- **Persistent Metadata** - Photo information saved in `photos-metadata.json`
- **RESTful API** - Clean API endpoints for upload, fetch, and delete
- **File Management** - Automatic file naming and organization

## 📡 API Endpoints

### Upload Images
```
POST /api/upload
Content-Type: multipart/form-data
Body: images (files)
```

### Get All Photos
```
GET /api/photos
Response: { success: true, photos: [...] }
```

### Delete Photo
```
DELETE /api/photos/:id
Response: { success: true, message: "Photo deleted" }
```

### Health Check
```
GET /api/health
Response: { status: "ok", photos: 0 }
```

## 📂 Project Structure

```
gallery/
├── server.js              # Express backend server
├── package.json           # Dependencies and scripts
├── index.html             # Frontend application
├── uploads/               # Uploaded images (auto-created)
├── photos-metadata.json   # Photo metadata (auto-created)
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## 🛠️ How It Works

### Backend (server.js)
1. **Express server** listens on port 3000
2. **Multer** handles multipart/form-data file uploads
3. **Images saved** to `uploads/` folder with unique filenames
4. **Metadata stored** in JSON file for persistence
5. **Static file serving** for uploaded images

### Frontend (index.html)
1. **User clicks upload** → Opens file picker
2. **Files selected** → Sends to `/api/upload` endpoint
3. **Server responds** → Frontend refreshes gallery
4. **On page load** → Fetches photos from `/api/photos`
5. **Display images** → Shows from server URL

### File Storage
- Original: `IMG_123.jpg`
- Stored as: `1736635200000-123456789.jpg`
- URL: `http://localhost:3000/uploads/1736635200000-123456789.jpg`

## 🔒 Storage Details

- **Location**: `uploads/` folder in project directory
- **Persistence**: Files remain until manually deleted
- **Metadata**: Stored in `photos-metadata.json`
- **Max size**: 10MB per image (configurable in server.js)
- **Formats**: JPEG, JPG, PNG, GIF, WebP

## ⚙️ Configuration

### Change Upload Size Limit
Edit `server.js`:
```javascript
limits: {
  fileSize: 10 * 1024 * 1024 // Change to desired size in bytes
}
```

### Change Upload Directory
Edit `server.js`:
```javascript
const uploadsDir = path.join(__dirname, 'your-folder-name');
```

### Change Server Port
Edit `server.js`:
```javascript
const PORT = 3000; // Change to desired port
```

Then update frontend `index.html`:
```javascript
const API_BASE = 'http://localhost:YOUR_PORT';
```

## 🐛 Troubleshooting

### "Error loading photos" message
- **Check**: Is the server running? Run `npm start`
- **Check**: Is server on port 3000? Look for "running at http://localhost:3000"
- **Check**: Any firewall blocking port 3000?

### Upload fails
- **Check**: File size under 10MB?
- **Check**: File is an image (jpg, png, gif, webp)?
- **Check**: Console for error messages (F12 → Console tab)

### Photos don't appear after upload
- **Check**: `uploads/` folder exists and has images
- **Check**: `photos-metadata.json` file has photo entries
- **Check**: Browser developer tools Network tab for failed requests

### CORS errors
- **Check**: Server has CORS enabled (it should by default)
- **Check**: Frontend accessing correct server URL

## 📝 Notes

- **Development Mode**: All data stored locally
- **Production**: Consider using cloud storage (AWS S3, Cloudinary)
- **Database**: Currently using JSON file, consider MongoDB/PostgreSQL for production
- **Security**: Add authentication and file validation for production use
- **Backup**: The `uploads/` folder and `photos-metadata.json` contain all your data

## 🎯 Next Steps

Potential enhancements:
- [ ] Add user authentication
- [ ] Implement photo editing (crop, rotate, filters)
- [ ] Add cloud storage integration (S3, Azure, etc.)
- [ ] Create admin panel for photo management
- [ ] Add photo albums/collections
- [ ] Implement sharing and public links
- [ ] Add compression and thumbnail generation
- [ ] Auto-backup to cloud

## 💻 Tech Stack

**Frontend:**
- HTML5, Tailwind CSS
- Vanilla JavaScript
- FaceAPI.js (face recognition)

**Backend:**
- Node.js
- Express.js
- Multer (file uploads)
- CORS middleware

## 📞 Support

If you encounter issues:
1. Check the console for errors (F12 → Console)
2. Check server terminal for error messages
3. Verify file permissions on `uploads/` folder
4. Ensure Node.js version is 14+ (`node --version`)

---

**Made with ❤️ - Upload, store, and view your photos!**

*Last updated February 11, 2026*
