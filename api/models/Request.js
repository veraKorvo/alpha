/**
 * Request.js
 *
 * @description :: Represent each event of a request. Sent by a student and approved by the
 *                 teacher it belongs to. On approval, the assigned schedule
 *                 gets updated accordingly.
 */

module.exports = {

  attributes: {
    student: {
      model: 'student',
      required: true
    },
    lecture: {
      model: 'lecture',
      required: true
    },
    schedule: {
      model: 'schedule',
      required: true
    },
    approved: {
      type: 'boolean',
      defaultsTo: false,
      required: true
    }
  },
  afterUpdate: function(values, cb) {
    if (values.approved) {
      // add the lecture to the schedule
      // add the schedule to the student's schedules (or student to the
      // schedule's students)
      console.log("schedule approved");
      Schedule.findOne(values.schedule, function(err, schedule) {
        if (err) return cb(err);
        schedule.lecture = values.lecture;
        schedule.students.add(values.student);
        schedule.save();
      });
    }
    cb();
  }
};

