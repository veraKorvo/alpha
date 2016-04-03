/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {
  signup: function (req, res) {
    return res.view();
  },
  signin: function (req, res) {
    if (req.method == 'POST') {
      passport.authenticate('local', function (err, user, info) {
        if ((err) || (!user)) {
          res.status(403);
          return res.send({ message: info.message });
        }
        req.session.authenticated = true;
        req.session.userId = user.id; //TODO save the entire user instance? or just the id?
        return res.ok();
      })(req, res);
    } else if (req.isSocket) {
      // case of socket GET connection
    } else { 
      // http GET connection
      return res.view();
    }
  },
  signout: function (req, res) {
    if (req.session.authenticated) {
      req.session.destroy();
    }
    return res.ok();
  },
  // authentication test code
  stat: function (req, res) {
    var info = req.session.authenticated ? req.session.userId : "not signed in";
    return res.send({ message: info });
  }
	
};

