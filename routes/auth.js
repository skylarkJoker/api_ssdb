var express = require("express");
var router = express.Router();
var authController = require("../controller/auth");
const { check, validationResult } = require("express-validator");
var authCheck = require("./mdware");

router.post(
  "/login",
  check("username")
    .exists()
    .not()
    .isEmpty(),
  check("password")
    .exists()
    .not()
    .isEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    authController.authenticate(
      req.body.username,
      req.body.password,
      (err, userData) => {
        if (err) {
          res.status(422).send("Unable to login");
        } else {
          req.session.member_id = userData.member_id;
          req.session.class_id = userData.class_id;
          req.session.level = userData.level;
          res.status(200).send("Successfully logged in");
        }
      }
    );
  }
);

router.post(
  "/adduser",
  authCheck.sessionChecker,
  authCheck.levelCheck(authCheck.accessLevel.admin),
  check("username").exists(),
  check("password").exists(),
  check("member_id")
    .exists()
    .isInt(),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    authController.addUser(
      req.body.username,
      req.body.password,
      req.body.member_id,
      (err, r) => {
        if (err) return res.status(422).json({ errors: errors.array() });
        res.status(200).send("User created: " + r);
      }
    );
  }
);

router.get(
  "/logout",

  authCheck.sessionChecker,
  (req, res) => {
    res.clearCookie("blitz");
    res.status(200).send("Successfully logged out");
  }
);

module.exports = router;
