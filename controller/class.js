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
      if (err) {
        console.log(err);
        callback(true);
        return;
      }
      callback(false, r);
    });
  });
};

module.exports.updateMembership = (member_id, class_id, callback) => {
  let query = `
  UPDATE
	  ssdb.membership
  SET
	  ssdb.membership.class_id = ?
  WHERE 
	  ssdb.membership.member_id = ?; 
 `;

  db.pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }
    conn.query(query, [class_id, member_id], (err, r, f) => {
      if (err) {
        console.log(err);
        callback(true);
        return;
      }
      callback(false, r.affectedRows + "row(s) updated");
    });
  });
};

module.exports.readMembersNoClass = (church_id, callback) => {
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
       ssdb.membership.church_id = ` +
    church_id +
    ` 
  AND
    ssdb.membership.class_id IS NULL
    `;
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
      callback(false, r);
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
        if (err) {
          conn.query(
            "DELETE FROM ssdb.sbclass WHERE ssdb.sbclass.class_id = ?",
            [r.insertId],
            (err, r, f) => {}
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

module.exports.readClassInfo = (class_id, callback) => {
  let query =
    `
    SELECT 
    ssdb.sbclass.name,
    ssdb.sbclass.division,
    concat_ws("", teacher.first_name, " ", teacher.last_name) as tname,
    concat_ws("", secretary.first_name, " ", teacher.last_name) as sname,
    concat_ws("", care.first_name, " ", care.last_name) as cname
   
   FROM
     ssdb.sbclass
   INNER JOIN 
     ssdb.member as teacher
   ON
     ssdb.sbclass.teacher=teacher.id
   INNER JOIN 
     ssdb.member as secretary
   ON
     ssdb.sbclass.secretary=secretary.id
   INNER JOIN 
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
    conn.query(query + ";" + query2, (err, r, f) => {
      if (err) {
        console.log(err);
        callback(true);
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
      if (err) {
        console.log(err);
        callback(true);
        return;
      }
      callback(false, "Class deleted");
    });
  });
};

module.exports.addAttendanceRecords = (members, req, callback) => {
  let post = [];
  members.forEach(member => {
    post.push([
      member.id,
      req.cookies.member.class_id,
      member.status,
      member.studied
    ]);
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
        if (err) {
          console.log(err);
          callback(true);
          return;
        }
        callback(false, results.affectedRows + " row(s) inserted");
      }
    );
  });
};
