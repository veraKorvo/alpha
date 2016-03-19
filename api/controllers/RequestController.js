/**
 * RequestController
 *
 * @description :: Server-side logic for managing requests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  show: function(req, res) {
    // if the user is teacher -> policy
    // get given teacher's requests
    var teacherId = req.param('id');
    Lecture.find({teacher: teacherId}).populate('requests').exec(function(err, lectures) {
      var result = _.reduce(lectures, function(a, b){
        return {requests: a.requests.concat(b.requests)};
      }, {requests: []});
      return res.json(200, result);
    });
  }
};

