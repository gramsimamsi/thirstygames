/*******************************************
 team Schema
 ************************/

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let TeamSchema = new Schema(
    {
        //_id should be defined by default
        team_name: {type: String, required: true, max: 100},
        team_alc_count: {type: Number, required: true}
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
TeamSchema
    .virtual('url')
    .get(function () {
        return '/teamcatalog/team/' + this._id;
    });

//Export model
module.exports = mongoose.model('Team', TeamSchema);