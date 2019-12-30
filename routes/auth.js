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
      return res.status(422).json({
        errors: errors.array()
      });
    }

    authController.authenticate(
      req.body.username,
      req.body.password,
      (err, r) => {
        if (err) {
          res.status(422).send(r);
        } else {
          req.session.MemberId = r.id;
          req.session.SbClassId = r.SbClassId;
          req.session.level = r.level;
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

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }
    authController.addUser(
      req.body.username,
      req.body.password,
      req.body.id,
      (err, r) => {
        if (err)
          return res.status(422).json({
            errors: errors.array()
          });
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
