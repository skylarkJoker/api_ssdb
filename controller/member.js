var db = require("./db");

module.exports.createMember = (member, callback) => {
  let post = {
    first_name: member.first_name,
    last_name: member.last_name,
    address: member.address,
    phone_home: member.phone_home,
    email: member.email
  };

  db.pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }
    conn.query("INSERT INTO ssdb.member SET ?", post, (err, r, f) => {
      if (err) {
        console.log(err);
        callback(true);
        return;
      }
      post = {
        member_id: r.insertId,
        class_id: member.class_id
      };

      conn.query(
        "SELECT ssdb.church_class.church_id FROM ssdb.church_class WHERE ssdb.church_class.class_id = ?",
        [post.class_id],
        (err, r, f) => {
          if (err) {
            console.log(err);
            callback(true);
            return;
          }

          post["church_id"] = r[0].church_id;

          conn.query("INSERT INTO ssdb.membership SET ?", post, (err, r, f) => {
            if (err) {
              conn.query(
                "DELETE FROM ssdb.member WHERE ssdb.member.id = ?",
                [post.member_id],
                err => {
                  if (err) {
                    console.log(err);
                    callback(true);
                    return;
                  }
                }
              );
              console.log(err);
              callback(true);
              return;
            }
            callback(false, r.affectedRows + " row(s) inserted");
          });
        }
      );
    });
  });
};

module.exports.readMember = (member_id, callback) => {
  let query2 =
    `SELECT ssdb.attendance.id, ssdb.attendance.date, ssdb.attendance.status, ssdb.attendance.study FROM ssdb.attendance where ssdb.attendance.member_id=` +
    member_id +
    ``;
  let query =
    `
    SELECT
    ssdb.member.id,
    ssdb.member.first_name,
    ssdb.member.last_name,
    ssdb.member.address ,
    ssdb.member.phone_home,
    ssdb.member.email
   FROM
    ssdb.member 
   WHERE 
       ssdb.member.id = ` +
    member_id +
    ` 
    `;

  var resultSet = [];
  db.pool.getConnection((err, conn) => {
    conn.query(query + ";" + query2, (err, r, f) => {
      if (err) {
        console.log(err);
        callback(true);
        return;
      }
      resultSet = r[0];
      resultSet[0]["attendance"] = r[1];
      callback(false, resultSet);
    });
  });
};

module.exports.updateMember = (member, callback) => {
  let query = `
  UPDATE
	  ssdb.member
  SET
	  ssdb.member.first_name =  ?,
    ssdb.member.last_name = ?,
    ssdb.member.address = ?,
    ssdb.member.phone_home = ?,
    ssdb.member.email = ?
  WHERE 
	  ssdb.member.id = ?;  
  `;
  let post = [
    member.first_name,
    member.last_name,
    member.address,
    member.phone_home,
    member.email,
    member.id
  ];
  db.pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }
    conn.query(query, post, (err, r, f) => {
      if (err) {
        console.log(err);
        callback(true);
        return;
      }
      callback(false, r.affectedRows + "row(s) updated");
    });
  });
};

module.exports.deleteMember = (member_id, callback) => {
  let query = `
    UPDATE
      ssdb.membership
    SET
      ssdb.membership.class_id = NULL
    WHERE
      ssdb.membership.member_id = ?
  `;
  db.pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }
    conn.query(query, [member_id], (err, r, f) => {
      if (err) {
        console.log(err);
        callback(true);
        return;
      }
      callback(false, "Member was removed from class");
    });
  });
};
