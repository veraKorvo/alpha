/**
 * Lecture.js
 *
 * @description :: Describes a lecture. 
 * @collections :: Schedules, Requests
 */

module.exports = {
  schema: true,

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    duration: {
      type: 'integer',
      required: true
    },
    language: {
      model: 'language',
      required: false //Temp
    },
    category: {
      model: 'category',
      required: false //Temp
    },
    teacher: {
      model: 'teacher',
      required: true 
    },
    schedules: {
      collection: 'schedule',
      via: 'lecture',
      unique: true
    },
    requests: {
      collection: 'request',
      via: 'lecture'
    }

  }
};

