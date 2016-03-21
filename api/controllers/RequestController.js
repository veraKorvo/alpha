/**
 * RequestController
 *
 * @description :: Server-side logic for managing requests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  received: function(req, res) {
    // if the user is teacher -> policy
    // get given teacher's requests
    User.findOne(req.session.userId, function (err, user) {
      if(err || !user) return res.serverError();
      Lecture.find({teacher: user.teacheraccount})
        .populate('requests', {approved: false})
        .exec(function (err, lectures) {
        if(err) return res.serverError();
        var result = _.reduce(lectures, function(a, b){
          return {requests: a.requests.concat(b.requests)};
        }, {requests: []});
        return res.json(200, result);
      });
    });
  },
  sent: function (req, res) {
    User.findOne(req.session.userId, function (err, user) {
      if(err || !user) return res.serverError();
      Request.find({student: user.studentaccount})
        .where({approved: false}).exec(function (err, requests) {
        if(err) return res.serverError();
        return res.json(200, requests);
      });
    });
  },
  create: function (req, res) {
    var data = {
      lecture: req.param('lecture'),
      schedule: req.param('schedule')
    }
    User.findOne(req.session.userId, function (err, user) {
      if(err || !user) return res.serverError();
      _.extend(data, {student: user.studentaccount});
      Lecture.findOne(data.lecture, function(err, lecture) { 
        Schedule.findOne(data.schedule, function(err, schedule) {
          if(lecture.teacher !== schedule.teacher) return res.serverError();
          Request.create(data, function (err, createdRequest) {
            if(err) return res.serverError();
            return res.ok();
          });
        })
      });
    });
  },
  approve: function (req, res) {
    var data = {
      id: req.param('id'),
    }
    User.findOne(req.session.userId, function (err, user) {
      if(err || !user) return res.serverError();
      Request.findOne(data.id, function(err, request) {
        if(err || !request) return res.serverError();
        Lecture.findOne(request.lecture, function (err, lecture) {
          if(err || !lecture) return res.serverError();
          if(lecture.teacher !== user.teacheraccount) return res.serverError();
          request.approved = true;
          request.save(function (err, updatedRequest) {
            if(err) return res.serverError();
            return res.ok();
          });
        });
      });
    });
  }
};

