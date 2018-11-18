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
            res.send("All beverages where deleted successfully");
        });
}