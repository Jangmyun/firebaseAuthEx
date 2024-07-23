const express = require("express");
const parseurl = require("parseurl");
const session = require("express-session");
// MySQL Session Store
const MySQLStore = require("express-mysql-session")(session);
//
const db = require("./src/config/dbConfig");

const sessionStore = new MySQLStore({} /* session store options */, db);

var app = express();

// session의 미들웨어 세팅
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: sessionStore, // 얘 필수
  })
);

sessionStore
  .onReady()
  .then(() => {
    // MySQL session store 사용 준비 완료됨
    console.log("MySQLStore ready");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", function (req, res, next) {
  console.log(req.session);
  if (req.session.num === undefined) {
    req.session.num = 1;
  } else {
    req.session.num = req.session.num + 1;
  }
  res.send(`Views : ${req.session.num}`);
});

app.listen(3001, function () {
  console.log("Example code running on port 3001");
});
