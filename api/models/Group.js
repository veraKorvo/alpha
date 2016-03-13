/**
 * Group.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  // group interests, requests, 

  attributes: {
    members: {
      collection: 'student',
      via: 'groups',
      unique: true,
      required: true
    },

    lecture: {
      model: 'lecture'
    }
  }
};

