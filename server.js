const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const crypt = require("bcrypt");
var mysql = require("mysql");

const app = express();
const port = 3002;

var corsOptions = {
  // origin: "http://localhost:3000",
  optionSuccessStatus: 200,
  credentials: true
};

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(
  session({
    secret: "YellowPancakeHut",
    saveUninitialized: true,
    resave: true,
    cookie: {
      httpOnly: false,
      secure: false
    }
  })
);

var conn = mysql.createConnection({
  host: "localhost",
  user: "aardvark",
  password: "skyl4rkjok3r",
  database: "ssdb",
  multipleStatements: true
});

readClassMembers = (class_id, res) => {
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

  conn.query(query, (error, results, fields) => {
    res.send(results);
  });
};

updateMembership = (member_id, class_id, res) => {
  let query = `
  UPDATE
	  ssdb.membership
  SET
	  ssdb.membership.class_id = ?
  WHERE 
	  ssdb.membership.member_id = ?; 
 `;
  conn.query(query, [member_id, class_id], (err, r, f) => {
    if (err) {
      res.send(false);
      throw err;
    }
    res.send(true);
  });
};

readMembersNoClass = (church_id, res) => {
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
    ssdb.membership.class_id = NULL
    `;

  conn.query(query, (error, results, fields) => {
    res.send(results);
  });
};

authenticate = (username, password, req, res) => {
  let query = `
    SELECT 
    ssdb.membership.member_id,
      ssdb.membership.class_id,
      ssdb.auth.password
  FROM 
    ssdb.membership 
  INNER JOIN
    ssdb.auth
  ON
    ssdb.auth.member_id=ssdb.membership.member_id
  WHERE 
    ssdb.auth.username = ? 
    `;

  conn.query(query, [username], (error, results, fields) => {
    const options = {
      secure: false,
      httpOnly: false
      // domain: "localhost"
    };

    if (results && results.length) {
      crypt.compare(password, results[0].password, (err, resp) => {
        if (resp) {
          req.session.memberID = results[0].member_id;
          req.session.classID = results[0].class_id;
          res
            .cookie(
              "member",
              { id: results[0].member_id, classID: results[0].class_id },
              options
            )
            .status(200)
            .send("success");
        } else {
          res.send("fail");
        }
      });
    } else {
      res.send("fail");
    }
  });
};

createMember = (
  first_name,
  last_name,
  address,
  phone_home,
  email,
  req,
  res
) => {
  let post = {
    first_name: first_name,
    last_name: last_name,
    address: address,
    phone_home: phone_home,
    email: email
  };

  conn.query(
    "INSERT INTO ssdb.member SET ?",
    post,
    (error, results, fields) => {
      if (error) throw error;
      post = {
        member_id: results.insertId,
        class_id: req.cookies.member.classID
      };

      conn.query("INSERT INTO ssdb.membership SET ?", post, (err, r, f) => {
        if (err) {
          console.log(err);
        } else console.log(r.affectedRows + " row(s) inserted");
      });
      console.log(results.affectedRows + " row(s) inserted");
      res.send("new member created");
    }
  );
};

readMember = (member_id, res) => {
  let query2 =
    `SELECT ssdb.attendance.id, ssdb.attendance.date, ssdb.attendance.status, ssdb.attendance.study FROM ssdb.attendance where ssdb.attendance.member_id=` +
    memberID +
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

  conn.query(query + ";" + query2, (error, results, fields) => {
    resultSet = results[0];
    resultSet[0]["attendance"] = results[1];
    res.send(resultSet);
  });
};

updateMember = (member, res) => {
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

  conn.query(query, post, (err, results, fields) => {
    if (err) {
      console.log(err);
      res.send(false);
    }
    res.send(true);
  });
};

deleteMember = (member_id, res) => {
  let query = `
    UPDATE
      ssdb.membership
    SET
      ssdb.membership.class_id = NULL
    WHERE
      ssdb.membership.member_id = ?
  `;

  conn.query(query, [member_id], (err, result, fields) => {
    if (err) {
      console.log(err);

      res.send(false);
    }
    res.send(true);
  });
};

createClass = (name, division, church_id, res) => {
  let post = {
    name: name,
    division: division
  };

  conn.query(
    "INSERT INTO ssdb.sbclass SET ?",
    post,
    (error, results, fields) => {
      if (error) {
        res.send(false);
        throw error;
      }
      post = {
        class_id: results.insertId,
        church_id: church_id
      };

      conn.query("INSERT INTO ssdb.church_class SET ?", post, (err, r, f) => {
        if (err) {
          conn.query(
            "DELETE FROM ssdb.sbclass WHERE ssdb.sbclass.class_num = ?",
            [results.insertId],
            (err2, r2, f2) => {}
          );
          console.log(err);
          res.send(false);
        }
        res.send(true);
      });
    }
  );
};

readClassInfo = (class_id, res) => {
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
     ssdb.sbclass.class_num=
        
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
    classID +
    ` 
    `;
  var resultSet = [];
  conn.query(query + ";" + query2, (error, results, fields) => {
    resultSet = results[0];
    resultSet[0]["members"] = results[1];
    res.send(resultSet);
  });
};

updateClass = (sbclass, res) => {
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
	  ssdb.sbclass.class_num = ?;
  `;

  let post = [
    sbclass.name,
    sbclass.division,
    sbclass.teacher,
    sbclass.care_coordinator,
    sbclass.secretary,
    sbclass.class_num
  ];

  conn.query(query, post, (err, r, f) => {
    if (err) {
      res.send(false);
      throw err;
    }
    res.send(true);
  });
};

deleteClass = (class_id, res) => {
  let query = "DELETE FROM ssdb.sbclass WHERE ssdb.sbclass.class_num = ?";
  conn.query(query, [class_id], (err, r, f) => {
    if (err) {
      res.send(false);
      throw err;
    }
    res.send(true);
  });
};

addUser = (username, password, member_id, res) => {
  crypt.hash(password, 10, (err, hash) => {
    let post = {
      username: username,
      password: hash,
      member_id: member_id
    };

    conn.query(
      "INSERT INTO ssdb.auth SET ?",
      post,
      (error, results, fields) => {
        if (error) throw error;
        console.log(results.affectedRows + " row(s) inserted");
      }
    );
  });
};

addAttendanceRecords = (members, req, res) => {
  let post = [];
  members.forEach(member => {
    post.push([
      member.id,
      req.cookies.member.classID,
      member.status,
      member.studied
    ]);
  });

  console.log(post);

  var query = conn.query(
    "INSERT INTO ssdb.attendance (member_id, class_id, status, study) VALUES ?",
    [post],
    (error, results, fields) => {
      if (error) throw error;
      res.send(results.affectedRows + " row(s) inserted");
    }
  );

  console.log(query.sql);
};

sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.member.id) {
    next();
  } else {
    res.send(false);
  }
};

app.get("/", sessionChecker, (req, res) => {
  res.send(false);
});

app.post("/classmembers", sessionChecker, (req, res) => {
  readClassMembers(req.body.class_id, res);
});

app.post("/membership", sessionChecker, (req, res) => {
  updateMembership(req.body.member_id, req.body.class_id, res);
});
app.post("/noclass", sessionChecker, (req, res) => {
  readMembersNoClass(req.body.church_id, res);
});

app.post("/createmember", sessionChecker, (req, res) => {
  createMember(
    req.body.first_name,
    req.body.last_name,
    req.body.address,
    req.body.phone_home,
    req.body.email,
    req,
    res
  );
});

app.post("/member", sessionChecker, (req, res) => {
  readMember(req.body.member_id, res);
});

app.post("/updatemember", sessionChecker, (req, res) => {
  update(req.body.member, res);
});

app.post("/deletemember", sessionChecker, (req, res) => {
  deleteMember(req.body.member_id, res);
});

app.post("/createclass", sessionChecker, (req, res) => {
  createClass(req.body.name, req.body.division, req.body.church_id, res);
});

app.post("/classinfo", sessionChecker, (req, res) => {
  readClassInfo(req.body.class_id, res);
});

app.post("/updateclass", sessionChecker, (req, res) => {
  updateClass(req.body.sbclass, res);
});

app.post("/deleteclass", sessionChecker, (req, res) => {
  deleteClass(req.body.class_id, res);
});

app.post("/addrecords", sessionChecker, (req, res) => {
  addAttendanceRecords(req.body.members, req, res);
});

app.post("/adduser", sessionChecker, (req, res) => {
  addUser(req.body.username, req.body.password, req.body.member_id, res);
});

app.post("/login", (req, res) => {
  authenticate(req.body.username, req.body.password, req, res);
});

app.get("/logout", sessionChecker, (req, res) => {
  res.clearCookie("member");
  res.send(true);
  conn.end();
});

app.listen(port, () => console.log(`SSDB app listening on port ${port}!`));
