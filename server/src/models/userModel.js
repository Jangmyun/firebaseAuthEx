const db = require("../config/dbConfig");

async function getUserById(username) {
  const [rows] = await db.query(
    `
    SELECT * FROM user WHERE email = ?
    `,
    [email]
  );
  return rows[0];
}

async function createUser(username, password, phone) {
  await db.query(
    `INSERT INTO user (username, password, phone, user_type) VALUES (?,?,?,?)`[
      (username, password, phone, "normal")
    ]
  );
}

async function updateUser(username, password, phone) {}

module.exports = {
  getUserById,
  createUser,
};
