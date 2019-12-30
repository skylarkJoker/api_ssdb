var express = require("express");
var router = express.Router();
var memberController = require("../controller/member");
const { check, validationResult } = require("express-validator");
var authCheck = require("./mdware");

router.post(
  "/read",
  check("id").exists(),
  authCheck.sessionChecker,
  authCheck.levelCheck(authCheck.accessLevel.clead),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }
    memberController.readGuest(req.body.id, (err, r) => {
      if (err) return res.status(422).send("Guest not found");
      res.status(200).json(r);
    });
  }
);

module.exports = router;
