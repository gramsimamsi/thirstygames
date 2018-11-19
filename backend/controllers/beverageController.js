var beverageModel = require('../models/beverageModel');

exports.all_beverages_get = function(req, res) {
    //find all beverages in database
    beverageModel.find({})
        .exec(function (err, beverage_name_list)
        {
            if(err)
            {
                return next(err);
            }
            res.send(beverage_name_list);
        });
};

exports.all_beverages_delete = function(req, res)
{
    //delete all beverages
    beverageModel.remove({})
        .exec(function(err)
        {
            if(err){
                return next(err);
            }
            res.send('All beverages where deleted successfully');
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
            res.send(single_beverage_name);
        });
}

exports.single_beverage_delete = function(req, res)
{
    //delete a single beverage by its beverage_id
    beverageModel.remove({beverage_id: req.params.beverage_id})
        .exec(function (err)
        {
            if(err){
                return next(err);
            }
            res.send('Beverage was removed successfully');
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
            console.log('New Beverage: ' + newBeverage);
            res.send(newBeverage);
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
            res.send('Beverage was updated successfully');
        });
}