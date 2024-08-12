const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

// nodemailer
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cra2024.2048@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

const mailOption = {
  to: "cndlsrb2739@gmail.com",
  subject: "Test Email",
  html: `
  <h1>테스트 메시지입니다.</h1>
  <h5>해당 부분에 인증코드 들어갑니다</h5>
  `,
};

async function SendmailTransport() {
  await transporter.sendMail(mailOption);
}

SendmailTransport();

// Session
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const db = require("./src/config/dbConfig");

// Router
const authRoutes = require("./src/routes/authRoutes");

const PORT = 3001;
const app = express();
app.use(cors());
app.use(express.json());

const sessionStore = new MySQLStore({}, db);

// session setup
app.use(
  session({
    key: "session_cookie_name",
    secret: "session_cookie_secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/auth", authRoutes);
app.use(express.static(path.join(__dirname, "../my-app/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../my-app/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
