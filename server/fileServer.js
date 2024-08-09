const express = require("express");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const ip = require("ip");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));

// 이미지 저장 디렉토리 설정
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

// 이미지 업로드 라우트
app.post("/upload", upload.single("image"), (req, res) => {
  console.log(ip.address());
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;
  return res.json({ imageUrl: imageUrl });
});

app.delete("/images/:filename", async (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(uploadDir, filename);

  try {
    await fs.access(filepath); // 파일 존재 여부 확인
    await fs.unlink(filepath); // 파일 삭제
    res.status(200).send("Image deleted successfully");
  } catch (error) {
    if (error.code === "ENOENT") {
      res.status(404).send("Image not found");
    } else {
      console.error("Error deleting image:", error);
      res.status(500).send("Error deleting image");
    }
  }
});

// 이미지 접근 라우트
app.use("/images", express.static(uploadDir));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
