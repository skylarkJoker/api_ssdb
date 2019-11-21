var express = require("express");
var router = express.Router();
var classController = require("../controller/class");
const { check, validationResult } = require("express-validator");
var authCheck = require("./mdware");

router.post(
  "/members",
  authCheck.sessionChecker,
  authCheck.levelCheck(authCheck.accessLevel.clead),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    classController.readClassMembers(req.session.class_id, (err, r) => {
      if (err) return res.status(422).send("Error getting members");

      res.status(200).json(r);
    });
  }
);

router.post(
  "/membership",
  authCheck.sessionChecker,
  authCheck.levelCheck(authCheck.accessLevel.clead),
  (req, res) => {
    classController.updateMembership(
      req.body.members,
      req.session.class_id,
      (err, r) => {
        if (err) return res.status(422).send("Error updating membership");

        res.status(200).send("Membership updated: " + r);
      }
    );
  }
);

router.post(
  "/noclass",
  authCheck.sessionChecker,
  authCheck.levelCheck(authCheck.accessLevel.clead),
  (req, res) => {
    classController.readMembersNoClass(req.session.class_id, (err, r) => {
      if (err) return res.status(422).send("Error retrieving members");

      res.status(200).json(r);
    });
  }
);

//create class, add members, then assign roles
router.post(
  "/create",
  authCheck.sessionChecker,
  authCheck.levelCheck(authCheck.accessLevel.chlead),
  check("name").exists(),
  check("division")
    .exists()
    .isIn(["adult", "youth"]),
  check("church_id")
    .exists()
    .isInt(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    classController.createClass(
      req.body.name,
      req.body.division,
      req.body.church_id,
      (err, r) => {
        if (err) return res.status(422).send("Error creating class");

        res.status(200).send("Class created: " + r);
      }
    );
  }
);

router.post(
  "/info",
  authCheck.sessionChecker,
  authCheck.levelCheck(authCheck.accessLevel.clead),
  check("class_id")
    .exists()
    .isInt(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    classController.readClassInfo(req.body.class_id, (err, r) => {
      if (err) return res.status(422).send("Error getting class");

      res.status(200).json(r);
    });
  }
);

router.post(
  "/myclassinfo",
  authCheck.sessionChecker,
  authCheck.levelCheck(authCheck.accessLevel.clead),
  (req, res) => {
    classController.readClassInfo(req.session.class_id, (err, r) => {
      if (err) return res.status(422).send("Error getting class");
      res.status(200).json(r);
    });
  }
);

router.post(
  "/update",
  authCheck.sessionChecker,
  authCheck.levelCheck(authCheck.accessLevel.chlead),
  check("sbclass.name")
    .exists()
    .not()
    .isEmpty(),
  check("sbclass.division")
    .exists()
    .isIn(["adult", "youth"]),
  check("sbclass.teacher").exists(),
  check("sbclass.care_coordinator").exists(),
  check("sbclass.secretary").exists(),
  check("sbclass.class_id")
    .exists()
    .not()
    .isEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    classController.updateClass(req.body.sbclass, (err, r) => {
      if (err) return res.status(422).send("Error updating class");

      res.status(200).send("Class updated: " + r);
    });
  }
);

router.post(
  "/delete",
  authCheck.sessionChecker,
  authCheck.levelCheck(authCheck.accessLevel.chlead),
  check("class_id")
    .exists()
    .isInt(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    classController.deleteClass(req.body.class_id, (err, r) => {
      if (err) return res.status(422).send("Error deleting class");

      res.status(200).send("Class deleted: " + r);
    });
  }
);

router.post(
  "/addrecords",
  authCheck.sessionChecker,
  authCheck.levelCheck(authCheck.accessLevel.clead),
  check("members").isArray({ min: 1 }),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    var members = req.body.members;
    members["class_id"] = req.session.class_id;
    classController.addAttendanceRecords(members, (err, r) => {
      if (err) return res.status(422).send("Error creating records");

      res.status(200).send("Records created: " + r);
    });
  }
);

module.exports = router;
