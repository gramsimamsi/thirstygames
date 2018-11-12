/*******************************************
 *just a skeleton -> needs to be filled
 ************************/

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EventSchema = new Schema(
    {
        /*
        first_name: {type: String, required: true, max: 100},
        family_name: {type: String, required: true, max: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date},
        */
    }
);

// Virtual for author's full name
EventSchema
    .virtual('name')
    .get(function () {
        return this.family_name + ', ' + this.first_name;
    });

// Virtual for author's lifespan
EventSchema
    .virtual('lifespan')
    .get(function () {
        return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
    });

// Virtual for author's URL
EventSchema
    .virtual('url')
    .get(function () {
        return '/eventcatalog/event/' + this._id;
    });

//Export model
module.exports = mongoose.model('Event', EventSchema);