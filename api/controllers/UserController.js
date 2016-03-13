/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {
  signin: function (req, res) {
    passport.authenticate('local', function (err, user, info) {
      if ((err) || (!user)) {
        res.status(403);
        return res.send({ message: info.message });
      }
      req.session.authenticated = true;
      req.session.User = user; //TODO save the entire user instance? or just the id?
      return res.ok();
    })(req, res);
  },
  signout: function (req, res) {
    if (req.session.authenticated) {
      req.session.destroy();
    }
    return res.ok();
  },
  stat: function (req, res) {
    var info = req.session.authenticated ? req.session.User : "not signed in";
    return res.send({ message: info });
  }
	
};
