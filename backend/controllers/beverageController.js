const beverageModel = require('../models/beverageModel');
const beverage = require('../routes/beverage');

beverage.all_beverages_get = function(req, res, next) {
  // find all beverages in database
  beverageModel.find({})
      .exec(function(err, beverageNameList) {
        if (err) {
          return next(err);
        }
        res.status(200).send(beverageNameList);
      });
};

module.exports = beverage;
