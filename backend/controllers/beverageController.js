let beverageModel = require('../models/beverageModel');

exports.all_beverages_get = function(req, res) {
    //find all beverages in database
    beverageModel.find({})
        .exec(function (err, beverage_name_list)
        {
            if(err)
            {
                return next(err);
            }
            res.status(200).send(beverage_name_list);
        });
};

exports.all_beverages_delete = function(req, res)
{
    //delete all beverages
    beverageModel.deleteMany({})
        .exec(function(err)
        {
            if(err)
            {
                return next(err);
            }
            res.status(204).send();
        });
}

exports.single_beverage_get = function(req, res)
{
    //get a single beverage by its beverage_id
    beverageModel.find({beverage_id: req.params.beverage_id})
        .exec(function (err, single_beverage_name)
        {
            if(err){
                return next(err);
            }
            res.status(200).send(single_beverage_name);
        });
}

exports.single_beverage_delete = function(req, res)
{
    //delete a single beverage by its beverage_id
    beverageModel.deleteOne({beverage_id: req.params.beverage_id})
        .exec(function (err)
        {
            if(err){
                return next(err);
            }
            res.status(204).send();
        });
}

/*create a new beverage*/
exports.single_beverage_post = function(req, res)
{
    //create beverage and add to database
    beverageModel.countDocuments({}, function (err, count) {
        req.body.beverage_id = 'beverage_' + count;
        let newBeverage = new beverageModel( req.body );
        newBeverage.save(function (err)
        {
            if (err) {
                return next(err);
            }
            //ToDo remove console.log()
            console.log('New Beverage: ' + newBeverage);
            res.status(201).send();
        });
    });
}

/*update a new beverage*/
exports.single_beverage_put = function(req, res)
{
    //update beverage in the database
    beverageModel.updateOne({beverage_id: req.params.beverage_id}, req.body)
        .exec(function (err)
        {
            if(err){
                return next(err);
            }
            res.status(200).send();
        });
}