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
  }
};

