/**
 * Language.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    teachers: {
      collection: 'teacher',
      via: 'specialties',
      unique: true
    },
    lectures: {
      collection: 'lecture',
      via: 'language',
      unique: true
    }
  }
};

