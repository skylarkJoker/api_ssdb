const crypt = require("bcrypt");
const db = require('../models');
const Member = db.Member;
const Account = db.Account;

module.exports.authenticate = (username, password, callback) => {
  Account.findOne({
    where: {
      username: username
    },
    include: [{
      model: Member
    }]
  }).then(result => {

    if (result) {
      var account = result.get({
        plain: true
      })
      crypt.compare(password, account.password, (err, res) => {
        if (res) {
          var userData = {
            member_id: account.Member.id,
            class_id: account.Member.SbClassId,
            level: account.level
          };
          callback(false, userData);
        } else {
          callback(true, "Incorrect Password");
        }
      });
    } else {
      callback(true, "User not found")
    }

  }).catch(err => {
    callback(true, err)
  })
};

module.exports.addUser = (username, password, member_id, callback) => {
  crypt.hash(password, 10, (err, hash) => {
    Account.create({
      username: username,
      password: hash,
      level: 'chlead',
      MemberId: member_id
    }).then((account) => {
      callback(false, account.get({
        plain: true
      }).username)
    })
  })
}