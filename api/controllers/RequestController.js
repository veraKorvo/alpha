/**
 * RequestController
 *
 * @description :: Server-side logic for managing requests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  show: function(req, res) {
    // if the user is teacher -> policy
    console.log(req.session.User.teacheraccount);
    /* Teacher.findOne(req.session.User.teacheraccount).populate('lectures').exec(function(err, lectures) {
      if (err) return res.badRequest();
      console.log(lectures);
    });
    */
    return res.ok();
  }
};

