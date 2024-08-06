// server.js
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const uploadDirectory = path.join(__dirname, "uploads");

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the correct file extension
  },
});

const upload = multer({ storage });

// Serve static files from the uploads directory
app.use("/uploads", express.static(uploadDirectory));

// Upload endpoint
app.post("/upload", upload.single("image"), (req, res) => {
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.send({
    message: "File uploaded successfully",
    file: req.file,
    url: fileUrl,
  });
});

// Download endpoint
app.get("/download/:filename", (req, res) => {
  const filePath = path.join(uploadDirectory, req.params.filename);
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).send({ message: "File not found" });
  }
});

// Delete endpoint
app.delete("/delete/:filename", (req, res) => {
  const filePath = path.join(uploadDirectory, req.params.filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.send({ message: "File deleted successfully" });
  } else {
    res.status(404).send({ message: "File not found" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
