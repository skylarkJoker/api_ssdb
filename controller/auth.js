const crypt = require("bcrypt");
var db = require("./db");

getUser = (username, callback) => {
  let query = `
    SELECT 
    ssdb.membership.member_id,
      ssdb.membership.class_id,
      ssdb.auth.password,
      ssdb.auth.level
  FROM 
    ssdb.membership 
  INNER JOIN
    ssdb.auth
  ON
    ssdb.auth.member_id=ssdb.membership.member_id
  WHERE 
    ssdb.auth.username = ? 
    `;

  db.pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }
    conn.query(query, [username], (err, r) => {
      if (err) {
        console.log(err);
        callback(true);
        return;
      }
      callback(false, r);
    });
  });
};

module.exports.authenticate = (username, password, callback) => {
  getUser(username, (err, r) => {
    if (err) {
      console.log(err);
    }
    if (r && r.length) {
      crypt.compare(password, r[0].password, (err, res) => {
        if (err) {
          console.log(err);
          callback(true);
          return;
        } else if (res) {
          var userData = {
            member_id: r[0].member_id,
            class_id: r[0].class_id,
            level: r[0].level
          };
          callback(false, userData);
        }
      });
    } else {
      console.log("user not found");
      callback(true);
      return;
    }
  });
};

module.exports.addUser = (username, password, member_id, callback) => {
  crypt.hash(password, 10, (err, hash) => {
    let post = {
      username: username,
      password: hash,
      member_id: member_id
    };

    db.pool.getConnection((err, conn) => {
      conn.query("INSERT INTO ssdb.auth SET ?", post, (err, r, f) => {
        if (err) {
          console.log(err);
          callback(true);
          return;
        }
        callback(false, results.affectedRows + " row(s) inserted");
      });
    });
  });
};
