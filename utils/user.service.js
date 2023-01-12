const pool = require("../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into users(name, email, password) 
                  values(?,?,?)`,
      [data.name, data.email, data.password],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `SELECT * FROM users WHERE email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserId: (id, callBack) => {
    pool.query(
      `SELECT id,name,email from users where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUsers: (callBack) => {
    pool.query(
      `SELECT id,name,email FROM users`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `UPDATE users SET name=?, email=?, password=? WHERE id = ?`,
      [data.name, data.email, data.password, data.id],
      (error, results, fields) => {
        console.log(results);
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteUser: (data, callBack) => {
    pool.query(
      `DELETE FROM users WHERE id = ?`,
      [data.id],
      (error, results, fields) => {
        console.log(results.affectedRows);
        if (error) {
          callBack(error);
        }
        return callBack(null, results.affectedRows);
      }
    );
  },
};
