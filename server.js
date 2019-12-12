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

var dotenv = require("dotenv");
dotenv.config();

// db.sequelize.sync({
//   force: true
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