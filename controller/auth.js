const crypt = require("bcrypt");
const db = require("../models");
const Member = db.Member;
const Account = db.Account;

module.exports.authenticate = (username, password, callback) => {
  Account.findOne({
    where: {
      username: username
    },
    include: [
      {
        model: Member
      }
    ]
  })
    .then(account => {
      if (account) {
        crypt.compare(password, account.password, (err, res) => {
          if (res) {
            var userData = {
              id: account.Member.id,
              SbClassId: account.Member.SbClassId,
              level: account.level
            };

            callback(false, userData);
          } else {
            callback(true, "Incorrect Password");
          }
        });
      } else {
        callback(true, "User not found");
      }
    })
    .catch(err => {
      callback(true, err);
    });
};

module.exports.addUser = (username, password, id, callback) => {
  crypt.hash(password, 10, (err, hash) => {
    Account.create({
      username: username,
      password: hash,
      level: 3,
      MemberId: id
    }).then(account => {
      callback(
        false,
        account.get({
          plain: true
        }).username
      );
    });
  });
};
