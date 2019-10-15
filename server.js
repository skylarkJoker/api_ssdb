const express = require("express");
const bodyParser = require("body-parser");
var mysql = require("mysql");

const app = express();
const port = 3002;
app.use(bodyParser.json());

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

getUserInfo = (memberID, res) => {
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

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/members", (req, res) => {
  getMembers(1, res);
});
app.get("/memberinfo", (req, res) => {
  getUserInfo(1, res);
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

app.listen(port, () => console.log(`SSDB app listening on port ${port}!`));
