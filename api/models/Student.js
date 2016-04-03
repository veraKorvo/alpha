/**
 * Student.js
 *
 * @description :: Added fields to support student activities. Not using html
 *                 forms to perform CU actions(D is not allowed)
 * @collections :: schedules, groups
 */

module.exports = {
  schema: true,

  attributes: {
    // TODO features to be implemented: 
    // favorite teachers, favorite lectures, language of interest, ...
    useraccount: {
      model: 'user',
      unique: true,
      required: true
    },
    schedules: {
      collection: 'schedule',
      via: 'students'
    },
    groups: {
      collection: 'group',
      via: 'members'
    }
  },
  afterCreate: function(values, cb) {
    User.findOne(values.useraccount, function (err, user) {
      if (err || !user) {
        console.log(err);
        return;
      }
      user.studentaccount = values.id;
      user.save(function (err) {
        if (err) console.log(err);
        cb();
      });
    });
  }
};

