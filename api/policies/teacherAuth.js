
module.exports = function (req, res, next) {
  if (req.session.authenticated || !!req.session.User.teacheraccount) {
    Teacher.findOne({id: req.session.User.teacheraccount}, function (err, teacher) {
      if (err || !teacher) {
        return res.serverError();
      }
      return next();
    });
  }
  return res.forbidden('You are not permitted to perform this action.');
};
