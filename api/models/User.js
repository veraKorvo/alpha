/**
 * User.js
 *
 * @description :: User model. Creating a user automatically triggers student creation.
 *                 Password is hashed.
 */

var bcrypt = require('bcrypt-nodejs');

module.exports = {
  schema: true,

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    nick: {
      type: 'string',
      unique: true
    },
    email: {
      type: 'email',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    language: {
      model: 'language'
      //required: true
    },
    country: {
      type: 'string',
      required: false 
    },
    livein: {
      type: 'string',
      required: false
    },
    timezone: {
      type: 'string',
      required: true
    },
    point: {
      type: 'integer',
      defaultsTo: 0
    },
    description: {
      type: 'string',
    },

    studentaccount: {
      model: 'student',
      unique: true,
    },
    teacheraccount: {
      model: 'teacher',
      unique: true,
    },

    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  beforeCreate: function (values, cb) {
    // TODO eliminate fields that shouldn't be managed by users
    bcrypt.hash(values.password, null, null, function (err, hash) {
      if (err) console.log(err); // TODO
      else values.password = hash;
      cb();
    });
  },
  afterCreate: function (values, cb) {
    Student.create({useraccount: values.id}, function (err, student) {
      if (err) {
        // TODO Student account creation error
        console.log(err);
        return;
      }
      // TODO user save? update? or no need? --> maybe not
      cb();
    });
  }
};

