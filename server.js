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
  origin: "http://localhost:3000",
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

getMembers = (classID, res) => {
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
    classID +
    ` 
    `;

  conn.connect();

  conn.query(query, (error, results, fields) => {
    res.send(results);
  });

  conn.end();
};

getUserInfo = (username, password, req, res) => {
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
      httpOnly: false,
      domain: "localhost"
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

getMemberInfo = (memberID, res) => {
  let query2 =
    `SELECT ssdb.attendance.date, ssdb.attendance.status, ssdb.attendance.study FROM ssdb.attendance where ssdb.attendance.member_id=` +
    memberID +
    ``;
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
   WHERE 
       ssdb.member.id = ` +
    memberID +
    ` 
    `;

  var resultSet = [];

  conn.connect();

  conn.query(query + ";" + query2, (error, results, fields) => {
    resultSet = results[0];
    resultSet[0]["attendance"] = results[1];
    res.send(resultSet);
  });

  conn.end();
};

getClassInfo = (classID, res) => {
  let query =
    `
    SELECT
      *
    FROM
    ssdb.sbclass 
   WHERE 
       ssdb.sbclass.class_num = ` +
    classID +
    ` 
    `;

  conn.connect();

  conn.query(query, (error, results, fields) => {
    res.send(results);
  });

  conn.end();
};

addMember = (fname, lname, address, phone, email, res) => {
  let post = {
    first_name: fname,
    last_name: lname,
    address: address,
    phone_home: phone,
    email: email
  };

  conn.connect();

  conn.query(
    "INSERT INTO ssdb.member SET ?",
    post,
    (error, results, fields) => {
      if (error) throw error;
      console.log(results.affectedRows + " row(s) inserted");
    }
  );

  conn.end();
};

addUser = (username, password, member_id, res) => {
  crypt.hash(password, 10, (err, hash) => {
    let post = {
      username: username,
      password: hash,
      member_id: member_id
    };

    conn.connect();

    conn.query(
      "INSERT INTO ssdb.auth SET ?",
      post,
      (error, results, fields) => {
        if (error) throw error;
        console.log(results.affectedRows + " row(s) inserted");
      }
    );

    conn.end();
  });
};

addAttendanceRecord = (memberID, classID, status, study, res) => {
  let post = {
    member_id: memberID,
    class_id: classID,
    status: status,
    study: study
  };

  conn.connect();

  conn.query(
    "INSERT INTO ssdb.attendance SET ?",
    post,
    (error, results, fields) => {
      if (error) throw error;
      res.send(results.affectedRows + " row(s) inserted");
    }
  );

  conn.end();
};

sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.member.id) {
    res.send(true);
  } else {
    next();
  }
};

app.get("/", sessionChecker, (req, res) => {
  res.send(false);
});

app.get("/members", (req, res) => {
  getMembers(req.body.classID, res);
});

app.get("/memberinfo", (req, res) => {
  getMemberInfo(req.body.memberID, res);
});

app.get("/classinfo", (req, res) => {
  getClassInfo(req.body.classID, res);
});

app.post("/addmember", (req, res) => {
  addMember(
    req.body.fname,
    req.body.lname,
    req.body.address,
    req.body.phone,
    req.body.email
  );
});

app.post("/addrecord", (req, res) => {
  addAttendanceRecord(
    req.body.memberID,
    req.body.classID,
    req.body.status,
    req.body.study,
    res
  );
});

app.post("/adduser", (req, res) => {
  addUser(req.body.username, req.body.password, req.body.member_id, res);
});

app.post("/login", (req, res) => {
  getUserInfo(req.body.username, req.body.password, req, res);
});

app.get("/logout", (req, res) => {
  if (res.session.user && req.cookies.member.id) {
    res.clearCookie("member");
    res.send("success");
  } else {
    res.send("fail");
  }
});

app.listen(port, () => console.log(`SSDB app listening on port ${port}!`));
