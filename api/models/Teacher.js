/**
 * Teacher.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,

  attributes: {
    // completed schedules, 
    useraccount: {
      model: 'user',
      unique: true
    },
    lectures: {
      collection: 'lecture',
      via: 'teacher',
      unique: true
    },
    specialties: {
      collection: 'language',
      via: 'teachers',
      unique: true
    }
  },
  afterCreate: function(values, cb) {
    User.findOne(values.useraccount, function (err, user) {
      if (err || !user) {
        console.log(err);
        return;
      }
      user.teacheraccount = values.id;
      user.save(function (err, _) {
        if (err) console.log(err);
        cb();
      });
    });
  }
};

