/**
 * Request.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
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
      model: 'schedule'
    },
    approved: {
      type: 'boolean',
      defaultsTo: false,
      required: true
    }
  },
  afterUpdate: function(values, cb) {
    if (values.approved) {
      // TODO 
      // add the lecture to the schedule
      // add the schedule to the student's schedules (or student to the
      // schedule's students)
      console.log("approved");
      console.log("student", values.student);
      console.log("schedule", values.schedule);
    }
    cb();
  }
};

