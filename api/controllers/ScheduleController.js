/**
 * ScheduleController
 *
 * @description :: Server-side logic for managing Schedules
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  test: function (req, res) {
    Schedule.findOne(req.param('id'), function (err, schedule) {
      if (err) return res.serverError();
      if (!schedule) return res.notFound();
      return res.send(200, {stats: schedule.isFilled(), dur: schedule.getDurationInMin()});
    });
  },
  test2: function (req, res) {
    Teacher.findOne(req.param('id')).populate('schedules').exec(function (err, teacher) {
      _.each(teacher.schedules.slice(1), function (schedule) {
        console.log(teacher.schedules[0].isNotOverlapping(schedule));
      });
    });
    return res.ok();
  },
  create: function (req, res, next) {
    var data = {
      begin: new Date(req.param('begin')),
      finish: new Date(req.param('finish'))
    };
    User.findOne(req.session.userId, function (err, user) {
      // TODO Error handling
      if (err) return next(err);
      if (!user || !user.teacheraccount) return next(new Error('user related error'));
      Schedule.find({teacher: user.teacheraccount}, function (err, schedules) {
        if (err) return next(err);
        // check if the schedule overlaps with predefined schedules
        if (! _.every(schedules, function(schedule) { return schedule.isNotOverlapping(data); })) {
          return next(new Error('Schedule Overlaps'));
        }
        // create schedule
        Schedule.create(_.extend(data, {teacher: user.teacheraccount}), function (err, createdSchedule) {
          if (err) return next(err);
          return res.ok();
        });
      });
    });
  }
};

