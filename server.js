const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
var auth = require("./routes/auth");
var members = require("./routes/member");
var sbclass = require("./routes/class");
var db = require("./models");
var Church = db.Church;
var SbClass = db.SbClass;
var SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const port = 3002;
const path = require("path");
const crypt = require("bcrypt");

var dotenv = require("dotenv");
dotenv.config();

// db.sequelize.sync({
//   force: true
// }).then(() => {
//   db.Church.bulkCreate([{
//       id: '153af8c2-fe18-4550-a80a-8503ce2c35c8',
//       name: 'Magnolia',
//       address: 'The Woods',
//       country: 'Anatolia',
//       createdAt: new Date(),
//       updatedAt: new Date()
//     },
//     {
//       id: '6e954601-7704-47f2-bb6e-be3e47986d47',
//       name: 'Oak',
//       address: 'The Ridge',
//       country: 'Anatolia',
//       createdAt: new Date(),
//       updatedAt: new Date()
//     },
//     {
//       id: 'e0cca5d7-00c7-4df6-812b-dac5936294ad',
//       name: 'Pine',
//       address: 'The Forest',
//       country: 'Antartica',
//       createdAt: new Date(),
//       updatedAt: new Date()
//     }
//   ])
//   SbClass.bulkCreate([{
//       id: '138f2ef0-da3b-420e-a571-45d23714140a',
//       name: 'Advent',
//       division: 'adult',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       ChurchId: '153af8c2-fe18-4550-a80a-8503ce2c35c8'
//     },
//     {
//       id: '2a72a9bd-9b29-4b10-9bba-c4d3c75004f9',
//       name: 'Moon',
//       division: 'adult',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       ChurchId: '6e954601-7704-47f2-bb6e-be3e47986d47'
//     },
//     {
//       id: '74fe1ee3-0a4c-45b3-8662-2c86c7141dc4',
//       name: 'Sun',
//       division: 'youth',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       ChurchId: '153af8c2-fe18-4550-a80a-8503ce2c35c8'
//     }
//   ])
//   db.Member.bulkCreate([{
//       id: '907e1d3e-6633-4b26-81bc-f5e0917fb418',
//       first_name: 'Andrew',
//       last_name: 'Aardvark',
//       address: 'The Estate',
//       phone: '2687770000',
//       email: 'aardvark@email.com',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       SbClassId: '138f2ef0-da3b-420e-a571-45d23714140a',
//       ChurchId: '153af8c2-fe18-4550-a80a-8503ce2c35c8'
//     },
//     {
//       id: '110c0565-f5c8-4b11-ac3a-95cb0c48ba3f',
//       first_name: 'Brandon',
//       last_name: 'Marks',
//       address: 'The Ocho',
//       phone: '2688880000',
//       email: 'marks@email.com',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       SbClassId: '138f2ef0-da3b-420e-a571-45d23714140a',
//       ChurchId: '153af8c2-fe18-4550-a80a-8503ce2c35c8'
//     },
//     {
//       id: '7e3872c0-545e-49cd-8a60-7dfe0d2e3ddc',
//       first_name: 'Charles',
//       last_name: 'King',
//       address: 'The Ridge',
//       phone: '2689990000',
//       email: 'king@email.com',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       SbClassId: null,
//       ChurchId: '153af8c2-fe18-4550-a80a-8503ce2c35c8'
//     }
//   ]).then(() => {
//     SbClass.update({
//       teacher: '907e1d3e-6633-4b26-81bc-f5e0917fb418',
//       secretary: '110c0565-f5c8-4b11-ac3a-95cb0c48ba3f',
//       care_coordinator: '7e3872c0-545e-49cd-8a60-7dfe0d2e3ddc'
//     }, {
//       where: {
//         name: 'Advent'
//       }
//     });

//     db.Account.create({
//       username: "aardvark",
//       password: crypt.hashSync('ragemachine', 10),
//       level: 3,
//       MemberId: '907e1d3e-6633-4b26-81bc-f5e0917fb418'
//     })
//   })
// });

var corsOptions = {
  // origin: "http://localhost:3000",
  optionSuccessStatus: 200,
  credentials: true
};


db.sequelize.authenticate().then(() => {
  console.log("Success");
}).catch(err => {
  console.error("No conn", err);
})

var sessionStore = new SequelizeStore({
  db: db.sequelize,
  checkExpirationInterval: 60 * 1000 * 5,
  expiration: 60 * 1000 * 10
})
var sessionOps = {
  secret: process.env.SECRET,
  name: "blitz",
  saveUninitialized: false,
  resave: true,
  store: sessionStore,
  cookie: {
    httpOnly: false,
    secure: false,
    domain: "localhost"
  }
};

sessionStore.sync();

app.use(express.static(path.join(__dirname, "client/build")));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOptions));
app.use(session(sessionOps));
app.use((req, res, next) => {
  if (req.cookies.blitz && !req.session.member_id) {
    res.clearCookie("blitz");
  }
  next();
});

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
  sessionOps.cookie.secure = true;
}

//authentication routes
app.use("/auth", auth);

//member function routes
app.use("/members", members);

//class function routes
app.use("/class", sbclass);

app.get("/test", (req, res) => {
  Church.findAll({
    include: [{
      model: SbClass
    }],
  }).then((account) => {
    res.send(account);
  })
})

//test route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(port, () => console.log(`SSDB app listening on port ${port}!`));