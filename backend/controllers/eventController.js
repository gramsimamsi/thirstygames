let eventModel = require('../models/eventModel');

exports.all_events_get = function(req, res) {
    eventModel.find({})
        .exec(function (err, event_list_name)
        {
            if(err)
            {
                return next(err);
            }
            res.status(200).send(event_list_name);
        });
};

exports.all_events_delete = function(req, res)
{
    //delete all events
    eventModel.deleteMany({})
        .exec(function(err)
        {
            if(err){
                return next(err);
            }
            res.status(204).send();
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
            res.status(200).send(single_event_name);
        });
}

exports.single_event_delete = function(req, res)
{
    //delete a single event by its event_id
    eventModel.deleteOne({event_id: req.params.event_id})
        .exec(function (err)
        {
            if(err){
                return next(err);
            }
            res.status(204).send();
        });
}

/*create a new event*/
exports.single_event_post = function(req, res)
{
    //create event and add to database
    eventModel.countDocuments({}, function (err, count) {
        req.body.event_id = 'event_' + count;
        let newEvent = new eventModel( req.body );
        newEvent.save(function (err)
        {
            if (err) {
                return next(err);
            }
            //ToDo remove console.log()
            console.log('New Event: ' + newEvent);
            res.status(201).send();
        });
    });
}

/*update a new event*/
exports.single_event_put = function(req, res)
{
    //update event in the database
    eventModel.updateOne({event_id: req.params.event_id}, req.body)
        .exec(function (err)
        {
            if(err){
                return next(err);
            }
            res.status(200).send();
        });
}