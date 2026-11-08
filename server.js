const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const allowedTypes = new Set(["image/png", "image/jpeg", "image/webp"]);
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (!allowedTypes.has(file.mimetype)) {
      return cb(new Error("Upload a PNG, JPG, or WEBP chart image."));
    }
    cb(null, true);
  }
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "SMC Dashboard API", aiConfigured: Boolean(process.env.GEMINI_API_KEY) });
});

app.post("/api/analyze", upload.single("chart"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Please upload a chart screenshot first." });
  }

  // Next milestone: securely send req.file.buffer to the chosen vision model.
  // Keep GEMINI_API_KEY on the server; never expose it in browser JavaScript.
  if (!process.env.GEMINI_API_KEY) {
    return res.status(503).json({
      error: "AI analysis is not connected yet.",
      detail: "The upload endpoint is working. Add GEMINI_API_KEY as a server-side environment variable after configuring the AI integration."
    });
  }

  return res.status(501).json({
    error: "AI integration is the next development milestone.",
    detail: "Image upload is validated, but no analysis is generated until the vision-model integration is implemented and tested."
  });
});

app.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ error: "Image is too large. Maximum size is 8 MB." });
  }
  res.status(400).json({ error: err.message || "Request could not be processed." });
});

app.listen(PORT, () => console.log(`SMC Dashboard running on port ${PORT}`));
