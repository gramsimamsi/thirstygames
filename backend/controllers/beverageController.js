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