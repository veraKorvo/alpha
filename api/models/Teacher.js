/**
 * Teacher.js
 *
 * @description :: Added fields to support teacher activities. Gets created by
 *                 admin when approved. Not using html forms to perform update.
 * @collections :: schedules, lectures, specialties 
 */

module.exports = {
  schema: true,

  attributes: {
    // completed schedules, 
    useraccount: {
      model: 'user',
      unique: true,
      required: true
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
    },
    schedules: {
      collection: 'schedule',
      via: 'teacher'
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

