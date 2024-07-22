const MySQLStore = require("express-mysql-session");
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "4784",
  database: "test",
});

const promisePool = pool.promise();
module.exports = promisePool;

// 아래와 같은 방식을 취하지 않는 이유:
// pool 연결은 여러개의 DB 연결을 생성해두고 요청 들어올때마다 재사용하는데,
// 단일 연결 방식은 간단한 대신 클라이언트가 동시에 여러개 연결시 이슈생길수도

// var mysql = require("mysql2");
// var db = mysql.createConnection({
//   host: "",
//   user: "",
//   password: "",
//   database: "",
// });
// db.connect();
// module.exports = db;

// 다음과 같이 선언 가능
// const options = {
//   host: 'localhost',
//   port: 3306,
//   user: 'db_user',
//   password: 'password',
//   database: 'db_name'
// };
// const connection = mysql.createPool(options);
