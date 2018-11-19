/*******************************************
 event Schema
 ************************/


var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EventSchema = new Schema(
    {
        //_id should be defined by default
        event_name: {type: String, required: true, max: 100},
        event_date: {type: Date, required: true},
        event_logo: {type: String, required: false, max: 255}, //path to icon
        event_id: {type: String, required: true}
    }
);

// Virtual for author's full name
/*EventSchema
    .virtual('name')
    .get(function () {
        return this.family_name + ', ' + this.first_name;
    });
*/

// Virtual for event's URL
EventSchema
    .virtual('url')
    .get(function () {
        return '/eventcatalog/event/' + this._id;
    });

//Export model
module.exports = mongoose.model('Event', EventSchema);