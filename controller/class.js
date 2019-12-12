var db = require("../models");
var SbClass = db.SbClass;
var Member = db.Member;
var Church = db.Church;
var Op = db.Sequelize.Op;

module.exports.readClassMembers = (class_id, callback) => {
  Member.findAll({
    where: {
      SbClassId: class_id
    }
  }).then((members) => {
    if (members && members.length) {
      callback(false, members)
    } else {
      callback(true);
    }
  })
};

module.exports.updateMembership = (members, class_id, callback) => {
  Member.update({
    SbClassId: class_id
  }, {
    where: {
      id: {
        [Op.in]: members
      }
    }
  }).then(([affectedCount, affectedRows]) => {
    callback(false, affectedCount + " Membership(s) changed")
  })

};

module.exports.readMembersNoClass = (class_id, callback) => {
  Church.findOne({
      attributes: [],
      include: [{
        model: SbClass,
        attributes: [],
        where: {
          id: class_id
        }
      }, {
        model: Member,
        where: {
          SbClassId: null
        }
      }]
    })
    .then((members) => {
      callback(false, members);
    }).catch(err => {
      callback(true, err);
    })
};

module.exports.createClass = (name, division, church_id, callback) => {
  SbClass.create({
    name: name,
    division: division,
    ChurchId: church_id
  }).then(() => {
    callback(false, name + " has been created");
  }).catch((err) => {
    console.log(err);

    callback(true, err)
  })
};
//prevent if no members added yet
module.exports.readClassInfo = (class_id, callback) => {
  SbClass.findOne({
    where: {
      id: class_id
    },
    include: [{
      model: Member
    }, ]
  }).then(sbclass => {
    callback(false, sbclass)
  }).catch(err => {
    callback(true, err)
  })
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