/** *****************************************
beverage Schema
 ************************/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BeverageSchema = new Schema(
    {
      // _id should be defined by default
      beverage_name: {type: String, required: true, max: 100},
      beverage_alc: {type: Number, required: true},
    }
);

// Virtual for author's full name
/* EventSchema
    .virtual('name')
    .get(function () {
        return this.family_name + ', ' + this.first_name;
    });
*/

// Virtual for event's URL
BeverageSchema
    .virtual('url')
    .get(() => {
      return '/beveragecatalog/beverage/' + _id;
    });

// Export model
module.exports = mongoose.model('Beverage', BeverageSchema);
