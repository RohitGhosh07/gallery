import express from "express";

const app = express();
const PORT = 3000;

// Put your key here
const API_KEY = "AIzaSyDq1zUnvwrQoOKh9yJPh38zqz6HOvBvCIU";

// CORS for everything
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// Serve image bytes from Drive using alt=media
app.get("/img/:id", async (req, res) => {
  const fileId = req.params.id;

  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${encodeURIComponent(API_KEY)}`;

  const r = await fetch(url);

  if (!r.ok) {
    const txt = await r.text().catch(() => "");
    return res.status(r.status).send(txt || "Drive fetch failed");
  }

  // Forward content type (important for images)
  const contentType = r.headers.get("content-type") || "application/octet-stream";
  res.setHeader("Content-Type", contentType);

  // Cache (optional)
  res.setHeader("Cache-Control", "public, max-age=86400");

  // Stream response
  const buf = Buffer.from(await r.arrayBuffer());
  res.send(buf);
});

app.listen(PORT, () => {
  console.log(`✅ Drive proxy running: http://localhost:${PORT}`);
  console.log(`Example: http://localhost:${PORT}/img/FILE_ID`);
});
