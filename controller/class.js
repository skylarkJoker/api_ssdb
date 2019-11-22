var db = require("./db");

module.exports.readClassMembers = (class_id, callback) => {
  let query =
    `
    SELECT
    ssdb.member.id,
    ssdb.member.first_name,
    ssdb.member.last_name,
    ssdb.member.address,
    ssdb.member.phone_home,
    ssdb.member.email
   FROM
    ssdb.member 
   INNER JOIN
       ssdb.membership ON ssdb.membership.member_id=ssdb.member.id
   WHERE 
       ssdb.membership.class_id = ` +
    class_id +
    ` 
    `;
  db.pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }
    conn.query(query, (err, r, f) => {
      conn.release();
      if (err) {
        console.log(err);
        callback(true);
        return;
      }
      callback(false, r);
    });
  });
};

module.exports.updateMembership = (members, class_id, callback) => {
  let query = `
  UPDATE
	  ssdb.membership
  SET
	  ssdb.membership.class_id = ?
  WHERE 
	  ssdb.membership.member_id IN ?; 
 `;

  db.pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }
    conn.query(query, [class_id, [members]], (err, r, f) => {
      conn.release();
      if (err) {
        console.log(err);
        callback(true);
        return;
      }
      callback(false, r.affectedRows + "row(s) updated");
    });
  });
};

module.exports.readMembersNoClass = (class_id, callback) => {
  let query =
    `SELECT ssdb.church_class.church_id FROM ssdb.church_class WHERE ssdb.church_class.class_id =` +
    class_id;
  db.pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    conn.query(query, (err, r, f) => {
      if (err) {
        console.log(err);
        callback(true);
        return;
      }

      query =
        `
        SELECT
        ssdb.member.id,
        ssdb.member.first_name,
        ssdb.member.last_name,
        ssdb.member.address,
        ssdb.member.phone_home,
        ssdb.member.email
       FROM
        ssdb.member
       INNER JOIN
           ssdb.membership ON ssdb.membership.member_id=ssdb.member.id
       WHERE
           ssdb.membership.church_id = ` +
        r[0].church_id +
        `
      AND
        ssdb.membership.class_id IS NULL
        `;

      conn.query(query, (err, r, f) => {
        conn.release();
        if (err) {
          console.log(err);
          callback(true);
          return;
        }
        callback(false, r);
      });
    });
  });
};

module.exports.createClass = (name, division, church_id, callback) => {
  let post = {
    name: name,
    division: division
  };
  db.pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }
    conn.query("INSERT INTO ssdb.sbclass SET ?", post, (err, r, f) => {
      conn.release();
      if (err) {
        console.log(err);
        callback(true);
        return;
      }
      post = {
        class_id: r.insertId,
        church_id: church_id
      };

      conn.query("INSERT INTO ssdb.church_class SET ?", post, (err, r, f) => {
        conn.release();
        if (err) {
          conn.query(
            "DELETE FROM ssdb.sbclass WHERE ssdb.sbclass.class_id = ?",
            [r.insertId],
            (err, r, f) => {
              conn.release();
            }
          );
          console.log(err);
          callback(true);
          return;
        }

        callback(false, r.affectedRows + "row(s) inserted");
      });
    });
  });
};
//prevent if no members added yet
module.exports.readClassInfo = (class_id, callback) => {
  let query =
    `
    SELECT 
    ssdb.sbclass.name,
    ssdb.sbclass.division,
    concat_ws("", teacher.first_name, " ", teacher.last_name) as tname,
    concat_ws("", secretary.first_name, " ", secretary.last_name) as sname,
    concat_ws("", care.first_name, " ", care.last_name) as cname
   
   FROM
     ssdb.sbclass
   LEFT JOIN 
     ssdb.member as teacher
   ON
     ssdb.sbclass.teacher=teacher.id
   LEFT JOIN 
     ssdb.member as secretary
   ON
     ssdb.sbclass.secretary=secretary.id
   LEFT JOIN 
     ssdb.member as care
   ON
     ssdb.sbclass.care_coordinator=care.id
   WHERE 
     ssdb.sbclass.class_id=
        
    ` +
    class_id +
    ` 
    `;
  let query2 =
    `
    SELECT
    ssdb.member.id,
    ssdb.member.first_name,
    ssdb.member.last_name,
      ssdb.member.address
  FROM
    ssdb.membership
  INNER JOIN
    ssdb.member
  ON
    ssdb.membership.member_id=ssdb.member.id
  WHERE
    ssdb.membership.class_id=
        
    ` +
    class_id +
    ` 
    `;
  var resultSet = [];
  db.pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }
    conn.query({ sql: query + ";" + query2, timeout: 5000 }, (err, r, f) => {
      conn.release();

      if (err && err.code === "PROTOCOL_SEQUENCE_TIMEOUT") {
        console.log(err);
        callback(true);
        return;
      } else if (err) {
        console.log(err);
        callback(true);
        return;
      }
      if (!(r[0] && r[0].length)) {
        callback(false, "class not found");
        return;
      }

      resultSet = r[0];
      resultSet[0]["members"] = r[1];

      callback(false, resultSet);
    });
  });
};

module.exports.updateClass = (sbclass, callback) => {
  let query = `
  UPDATE
    ssdb.sbclass
  SET
	  ssdb.sbclass.name = ?,
    ssdb.sbclass.division = ?,
	  ssdb.sbclass.teacher = ?,
    ssdb.sbclass.care_coordinator = ?,
    ssdb.sbclass.secretary = ?
  WHERE
	  ssdb.sbclass.class_id = ?;
  `;

  let post = [
    sbclass.name,
    sbclass.division,
    sbclass.teacher,
    sbclass.care_coordinator,
    sbclass.secretary,
    sbclass.class_id
  ];

  db.pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }
    conn.query(query, post, (err, r, f) => {
      conn.release();
      if (err) {
        console.log(err);
        callback(true);
        return;
      }
      callback(false, r.affectedRows + "row(s) inserted");
    });
  });
};

module.exports.deleteClass = (class_id, callback) => {
  let query = "DELETE FROM ssdb.sbclass WHERE ssdb.sbclass.class_id = ?";
  db.pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }
    conn.query(query, [class_id], (err, r, f) => {
      conn.release();
      if (err) {
        console.log(err);
        callback(true);
        return;
      }
      callback(false, "Class deleted");
    });
  });
};

module.exports.addAttendanceRecords = (members, overwrite, callback) => {
  let post = [];
  members.forEach(member => {
    post.push([member.id, members.class_id, member.status, member.studied]);
  });

  db.pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }
    conn.query(
      "INSERT INTO ssdb.attendance (member_id, class_id, status, study) VALUES ?",
      [post],
      (err, r, f) => {
        conn.release();
        if (err) {
          console.log(err);
          callback(true);
          return;
        }
        callback(false, r.affectedRows + " row(s) inserted");
      }
    );
  });
};

module.exports.checkAttendance = callback => {
  db.pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }
    conn.query(
      "SELECT ssdb.attendance.id FROM ssdb.attendance WHERE date(ssdb.attendance.date) = date(now())",
      (err, r, f) => {
        conn.release();
        if (err) {
          console.log(err);
          callback(true);
          return;
        }
        callback(false, r);
      }
    );
  });
};
