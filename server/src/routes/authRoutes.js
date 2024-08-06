const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/dbConfig");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM user WHERE username = ?", [
      username,
    ]);
    if (rows.length > 0) {
      // username과 일치하는 row 찾으면
      const user = rows[0];
      const isPwMatch = await bcrypt.compare(password, user.password);
      if (isPwMatch) {
        req.session.userId = user.id;
        return res.json({ success: true });
      }
    }
    // username 일치하는 거 없으면
    res.status(401).json({ success: false, message: "Invalid username" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.query("INSERT INTO user (username, password) VALUES (?, ?)", [
      username,
      hashedPassword,
    ]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/logout", (req, res) => {
  // session destroy 시키기
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({ success: true });
  });
});

router.get("/profile", (req, res) => {
  // session 로그인 안된 상태이면
  if (!req.session.userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  res.json({ success: true, userId: req.session.userId });
});

module.exports = router;
