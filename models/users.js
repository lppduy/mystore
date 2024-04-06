const pool = require('../utils/database')

module.exports = class Users {
  constructor(id, userName, password) {
    this.id = id;
    this.userName = userName;
    this.password = password;
  }

  insertUser() {
    return pool.execute(
      'INSERT INTO users (userName, password) VALUES (?, ?)',
      [this.userName, this.password]
    )
  }
}