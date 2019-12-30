var db = require("../models");
var SbClass = db.SbClass;
var Member = db.Member;
var Guests = db.Guests;
var Saved = db.Saved;
var Attendance = db.Attendance;
var Church = db.Church;
var Op = db.Sequelize.Op;

module.exports.readClassMembers = (SbClassId, callback) => {
  Member.findAll({
    where: {
      SbClassId
    }
  }).then(members => {
    if (members && members.length) {
      callback(false, members);
    } else {
      callback(true);
    }
  });
};

module.exports.updateMembership = (members, SbClassId, callback) => {
  Member.update(
    {
      SbClassId
    },
    {
      where: {
        id: {
          [Op.in]: members
        }
      }
    }
  ).then(([affectedCount, affectedRows]) => {
    callback(false, affectedCount + " Membership(s) changed");
  });
};

module.exports.readMembersNoClass = (id, callback) => {
  Church.findOne({
    attributes: [],
    include: [
      {
        model: SbClass,
        attributes: [],
        where: {
          id
        }
      },
      {
        model: Member,
        where: {
          SbClassId: null
        }
      }
    ]
  })
    .then(members => {
      callback(false, members);
    })
    .catch(err => {
      callback(true, err);
    });
};

module.exports.createClass = (name, division, ChurchId, callback) => {
  SbClass.create({
    name: name,
    division: division,
    ChurchId
  })
    .then(() => {
      callback(false, name + " has been created");
    })
    .catch(err => {
      console.log(err);

      callback(true, err);
    });
};
//prevent if no members added yet
module.exports.readClassInfo = (id, callback) => {
  SbClass.findOne({
    where: {
      id
    },
    include: [
      {
        model: Member
      },
      {
        model: Member,
        attributes: ["first_name", "last_name"],
        as: "Teacher"
      },
      {
        model: Member,
        attributes: ["first_name", "last_name"],
        as: "Secretary"
      },
      {
        model: Member,
        attributes: ["first_name", "last_name"],
        as: "Care_Coordinator"
      },
      { model: Guests }
    ]
  })
    .then(sbclass => {
      callback(false, sbclass);
    })
    .catch(err => {
      callback(true, err);
    });
};

module.exports.updateClass = (sbclass, callback) => {
  SbClass.update(
    {
      name: sbclass.name,
      division: sbclass.division,
      teacher: sbclass.teacher,
      secretary: sbclass.secretary,
      care_coordinator: sbclass.care_coordinator
    },
    {
      where: {
        id: sbclass.id
      }
    }
  )
    .then(([affectedCount, affectedRows]) => {
      callback(
        false,
        affectedCount + " Class has been updated: " + sbclass.name
      );
    })
    .catch(err => {
      callback(true, err);
    });
};

module.exports.deleteClass = (id, callback) => {
  SbClass.destroy({
    where: {
      id
    }
  })
    .then(() => {
      callback(false, "Class deleted");
    })
    .catch(err => {
      callback(true, "Class could not be deleted");
    });
};

module.exports.addAttendanceRecords = (
  members,
  saved,
  SbClassId,
  overwrite,
  callback
) => {
  let post = [];
  members.forEach(member => {
    post.push({
      MemberId: member.id,
      SbClassId,
      status: member.status,
      study: member.studied
    });
  });

  if (overwrite) {
    Attendance.destroy({
      where: {
        createdAt: {
          [Op.lt]: new Date(),
          [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
        }
      }
    }).then(() => {
      Attendance.bulkCreate(post)
        .then(() => {
          callback(false, Attendance.findAll());
        })
        .catch(err => {
          callback(true, "Error updating attendance");
        });
    });

    Saved.destroy({
      where: {
        createdAt: {
          [Op.lt]: new Date(),
          [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
        }
      }
    }).then(() => {
      Saved.create({
        saved,
        SbClassId
      });
    });
  } else {
    Attendance.bulkCreate(post)
      .then(() => {
        callback(false, Attendance.findAll());
      })
      .catch(err => {
        callback(true, "Error updating attendance");
      });

    Saved.create({
      saved,
      SbClassId
    });
  }
};

module.exports.checkAttendance = callback => {
  Attendance.findAll({
    where: {
      createdAt: {
        [Op.lt]: new Date(),
        [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
      }
    }
  })
    .then(records => {
      callback(false, records);
    })
    .catch(err => {
      callback(true, err);
    });
};
