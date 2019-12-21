var express = require("express");
var router = express.Router();
var memberController = require("../controller/member");
const { check, validationResult } = require("express-validator");
var authCheck = require("./mdware");

router.post(
  "/create",
  check("member.first_name")
    .exists()
    .not()
    .isEmpty(),
  check("member.last_name")
    .exists()
    .not()
    .isEmpty(),
  check("member.address")
    .exists()
    .not()
    .isEmpty(),
  check("member.phone")
    .exists()
    .not()
    .isEmpty(),
  check("member.email")
    .optional({
      nullable: true,
      checkFalsy: true
    })
    .isEmail(),
  authCheck.sessionChecker,
  authCheck.levelCheck(authCheck.accessLevel.clead),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }
    var member = req.body.member;
    console.log(member);

    member["SbClassId"] = req.session.SbClassId;
    memberController.createMember(member, (err, r) => {
      if (err) return res.status(422).send("Error creating member");

      res.status(200).json(r);
    });
  }
);

//returns array of containing member
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
    memberController.readMember(req.body.id, (err, r) => {
      if (err) return res.status(422).send("Member not found");
      res.status(200).json(r);
    });
  }
);

router.post(
  "/update",
  check("member.first_name")
    .exists()
    .not()
    .isEmpty(),
  check("member.last_name")
    .exists()
    .not()
    .isEmpty(),
  check("member.address")
    .exists()
    .not()
    .isEmpty(),
  check("member.phone")
    .exists()
    .not()
    .isEmpty(),
  check("member.email")
    .optional({
      nullable: true,
      checkFalsy: true
    })
    .isEmail(),
  check("member.id").exists(),
  authCheck.sessionChecker,
  authCheck.levelCheck(authCheck.accessLevel.clead),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }
    memberController.updateMember(req.body.member, (err, r) => {
      if (err)
        return res.status(422).json({
          errors: errors.array()
        });
      res.status(200).send("Member updated: " + r);
    });
  }
);
//just sets membership to null to remove from class. also intended for reassignment
router.post(
  "/delete",
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
    memberController.deleteMember(req.body.id, (err, r) => {
      if (err) return res.status(422).json(r);
      res.status(200).send(r);
    });
  }
);

router.post(
  "/createguest",
  check("guest.first_name")
    .exists()
    .not()
    .isEmpty(),
  check("guest.last_name")
    .exists()
    .not()
    .isEmpty(),
  authCheck.sessionChecker,
  authCheck.levelCheck(authCheck.accessLevel.clead),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }
    var guest = req.body.guest;
    console.log(guest);

    guest["SbClassId"] = req.session.SbClassId;
    memberController.createGuest(guest, (err, r) => {
      if (err) return res.status(422).send("Error adding guest");

      res.status(200).json(r);
    });
  }
);

module.exports = router;
