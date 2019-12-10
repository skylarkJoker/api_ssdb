const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
var auth = require("./routes/auth");
var members = require("./routes/member");
var sbclass = require("./routes/class");
var db = require("./controller/db");
const app = express();
const port = 3002;
var MySQLStore = require("express-mysql-session")(session);
const path = require("path");

var dotenv = require("dotenv");
dotenv.config();

var corsOptions = {
  // origin: "http://localhost:3000",
  optionSuccessStatus: 200,
  credentials: true
};

var sessionStore = new MySQLStore(
  {
    clearExpired: true,
    checkExpirationInterval: 60 * 1000 * 5,
    expiration: 60 * 1000 * 10
  },
  db.pool
);
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

//test route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(port, () => console.log(`SSDB app listening on port ${port}!`));
