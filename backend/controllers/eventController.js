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

exports.all_events_delete = function(req, res)
{
    //delete all events
    eventModel.remove({})
        .exec(function(err)
        {
            if(err){
                return next(err);
            }
            res.send('All events where deleted successfully');
        });
}

exports.single_event_get = function(req, res)
{
    //get a single event by its event_id
    eventModel.find({event_id: req.params.event_id})
        .exec(function (err, single_event_name)
        {
            if(err){
                return next(err);
            }
            res.send(single_event_name);
        });
}

exports.single_event_delete = function(req, res)
{
    //delete a single event by its event_id
    eventModel.remove({event_id: req.params.event_id})
        .exec(function (err)
        {
            if(err){
                return next(err);
            }
            res.send('Event was removed successfully');
        });
}