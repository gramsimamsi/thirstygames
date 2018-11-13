/*******************************************
 team Schema
 ************************/

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TeamSchema = new Schema(
    {
        //_id should be defined by default
        team_name: {type: String, required: true, max: 100},
        team_member_count: {type: Number, required: false},
        team_logo: {type: String, required: false, max: 255} //path to icon
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