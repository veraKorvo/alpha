/**
 * Schedule.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,

  attributes: {
    begin: {
      type: 'datetime',
      required: true
    },
    finish: {
      type: 'datetime',
      required: true
    },
    teacher: {
      model: 'teacher',
      required: true 
    },
    lecture: {
      model: 'lecture',
      defaultsTo: 'null'
    },
    students: {
      collection: 'student',
      via: 'schedules'
    }

  }
};

