let beverageModel = require('../models/beverageModel');
let beverage = require('../routes/beverage');

beverage.all_beverages_get = function(req, res) {
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

module.exports = beverage;