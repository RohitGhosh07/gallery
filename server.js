const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadsDir));

// Serve frontend files
app.use(express.static(__dirname));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    // Only accept images
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Photo metadata storage (in-memory for now)
// In production, use a database
let photosMetadata = [];

// Load metadata from file if exists
const metadataFile = path.join(__dirname, 'photos-metadata.json');
if (fs.existsSync(metadataFile)) {
  try {
    const data = fs.readFileSync(metadataFile, 'utf8');
    photosMetadata = JSON.parse(data);
  } catch (err) {
    console.error('Error loading metadata:', err);
  }
}

// Save metadata to file
function saveMetadata() {
  try {
    fs.writeFileSync(metadataFile, JSON.stringify(photosMetadata, null, 2));
  } catch (err) {
    console.error('Error saving metadata:', err);
  }
}

// Upload endpoint - accepts single or multiple files
app.post('/api/upload', upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadedPhotos = req.files.map((file, index) => {
      const photo = {
        id: Date.now() + index,
        filename: file.filename,
        originalName: file.originalname,
        path: `/uploads/${file.filename}`,
        thumbSrc: `/uploads/${file.filename}`,
        fullSrc: `/uploads/${file.filename}`,
        size: file.size,
        title: req.body.title || file.originalname.replace(/\.[^/.]+$/, ''),
        meta: req.body.meta || new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        uploadedAt: new Date().toISOString()
      };

      photosMetadata.push(photo);
      return photo;
    });

    saveMetadata();

    res.json({
      success: true,
      message: `${uploadedPhotos.length} file(s) uploaded successfully`,
      photos: uploadedPhotos
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed: ' + error.message });
  }
});

// Get all photos
app.get('/api/photos', (req, res) => {
  res.json({
    success: true,
    photos: photosMetadata
  });
});

// Delete photo
app.delete('/api/photos/:id', (req, res) => {
  try {
    const photoId = parseInt(req.params.id);
    const photoIndex = photosMetadata.findIndex(p => p.id === photoId);

    if (photoIndex === -1) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    const photo = photosMetadata[photoIndex];
    const filePath = path.join(__dirname, photo.path);

    // Delete file from disk
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Remove from metadata
    photosMetadata.splice(photoIndex, 1);
    saveMetadata();

    res.json({ success: true, message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Delete failed: ' + error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', photos: photosMetadata.length });
});

app.listen(PORT, () => {
  console.log(`✅ Gallery server running at http://localhost:${PORT}`);
  console.log(`📁 Uploads directory: ${uploadsDir}`);
  console.log(`📸 Photos in gallery: ${photosMetadata.length}`);
});
