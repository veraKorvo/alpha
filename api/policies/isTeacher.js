
module.exports = function (req, res, next) {
  if (req.session.authenticated) {
    Teacher.findOne({useraccount: req.session.userId}, function (err, teacher) {
      if (err || !teacher) {
        return res.serverError();
      }
      return next();
    });
  }
  return res.forbidden('You are not permitted to perform this action.');
};
