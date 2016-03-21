var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt-nodejs');

passport.use(new LocalStrategy({usernameField: 'email'}, function (email, password, done) {
  User.findOne({
    email: email
  }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      // user not found;
      return done(null, false, {message: '1Credentials not recognized'});
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (!result) {
        // wrong password
        return done(null, false, {message: 'Credentials not recognized'});
      }
      // Signing in the user
      return done(null, user, 'Signin success');
    });
  });
}));
