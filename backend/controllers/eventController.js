let eventModel = require('../models/eventModel');

exports.all_events_get = function(req, res) {
    eventModel.find({})
        .exec(function (err, event_list_name)
        {
            if(err)
            {
                return next(err);
            }
            res.send(event_list_name);
        });
};