/**
 * Student.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,

  attributes: {
    // favorite teachers, favorite lectures, language of interest,
    useraccount: {
      model: 'user',
      unique: true
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
      user.save(function (err, _) {
        if (err) console.log(err);
        cb();
      });
    });
  }
};

