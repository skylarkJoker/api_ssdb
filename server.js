const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
var auth = require("./routes/auth");
var members = require("./routes/member");
var sbclass = require("./routes/class");
var authCheck = require("./routes/mdware");
var MySQLStore = require("express-mysql-session")(session);
var db = require("./controller/db");
const app = express();
const port = 3002;

var corsOptions = {
  // origin: "http://localhost:3000",
  optionSuccessStatus: 200,
  credentials: true
};
var sessionStore = null;
db.pool.getConnection((err, conn) => {
  sessionStore = new MySQLStore({}, conn);
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOptions));
app.use(
  session({
    secret: "YellowPancakeHut",
    name: "blitz",
    saveUninitialized: true,
    resave: true,
    store: sessionStore,
    cookie: {
      httpOnly: false,
      secure: false
    }
  })
);

//authentication routes
app.use("/auth", auth);

//member function routes
app.use("/members", members);

//class function routes
app.use("/class", sbclass);

//test route
app.post("/", authCheck.levelCheck(authCheck.accessLevel.admin), (req, res) => {
  res.send(true);
});

app.listen(port, () => console.log(`SSDB app listening on port ${port}!`));
