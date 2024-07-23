const express = require("express");
const path = require("path");
const cors = require("cors");

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
