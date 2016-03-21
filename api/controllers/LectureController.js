/**
 * LectureController
 *
 * @description :: Server-side logic for managing Lectures
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /*
  index: function (req, res) {
    // find lectures in suitable order
    // paginate
    Lecture.find().populateAll().exec(function (err, lectures) {
      if (err) res.serverError(err);
      return res.json(lectures);
    });
  },
  */
  create: function (req, res, next) {
    var data = {
      title: req.param('title'),
      description: req.param('description'),
      duration: req.param('duration'),
      language: req.param('language'),
      category: req.param('category'),
    };
    User.findOne(req.session.userId, function (err, user) {
      // TODO Error handling
      if (err) return next(err);
      if (!user || !user.teacheraccount) return next();

      console.log('user account is', user.id);
      console.log('teacher account is', user.teacheraccount);
      Lecture.create(_.extend(data, {teacher: user.teacheraccount}),function (err, createdLecture) {
        if (err) return next(err);
        return res.ok();
      });
    });
  }
};

