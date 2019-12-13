var db = require("../models");
var Member = db.Member;
var Church = db.Church;
var Attendance = db.Attendance;
var SbClass = db.SbClass;

module.exports.createMember = (member, callback) => {
  Member.create({
    first_name: member.first_name,
    last_name: member.last_name,
    address: member.address,
    phone: member.phone_home,
    email: member.email,
    SbClassId: member.SbClassId
  }).then((nMember) => {
    Church.findOne({
      attributes: ['id'],
      include: [{
        model: SbClass,
        where: {
          id: member.SbClassId
        }
      }]
    }).then((church) => {
      nMember.update({
          ChurchId: church.id
        }).then(() => {
          callback(false, nMember)
        })
        .catch(err => {
          callback(true, "Error updating member")
        })
    }).catch(err => {
      callback(true, "Error finding church")
    })
  }).catch(err => {
    callback(true, "Error creating member")
  })
};

module.exports.readMember = (id, callback) => {
  Member.findOne({
    where: {
      id
    },
    include: [{
      model: Attendance
    }]
  }).then((member) => {
    callback(false, member)
  }).catch(err => {
    callback(true, "Member not found")
  })
};

module.exports.updateMember = (member, callback) => {
  Member.update({
    first_name: member.first_name,
    last_name: member.last_name,
    address: member.address,
    phone: member.phone,
    email: member.email,
  }, {
    where: {
      id: member.id
    }
  }).then(([affectedCount, affectedRows]) => {
    callback(false, affectedCount + " Member has been updated: " + member.first_name);
  }).catch(err => {
    callback(true, err)
  })
};

module.exports.deleteMember = (id, callback) => {
  Member.update({
    SbClassId: null
  }, {
    where: {
      id
    }
  }).then(([affectedCount, affectedRows]) => {
    callback(false, affectedCount + " Member has been removed: " + member.first_name);
  }).catch(err => {
    callback(true, err)
  })
};