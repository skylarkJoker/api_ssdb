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
        if (err) {
          console.log(err);
          callback(true);
          return;
        } else if (res) {
          var userData = {
            member_id: account.MemberId,
            class_id: account.SbClassId,
            level: account.level
          };
          callback(false, userData);
        } else {
          callback(true, "incorrect password");
        }
      });
    }
    callback(true, "no user found")

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
      member_id: member_id
    }).then((account) => {
      callback(false, account.get({
        plain: true
      }).username)
    })
  })
}