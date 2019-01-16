/** *****************************************
 team Schema
 ************************/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TeamSchema = new Schema(
    {
      // _id should be defined by default
      team_name: {type: String, required: true, max: 100},
      team_alc_count: {type: Number, required: true},
    }
);

// Virtual for event's URL
TeamSchema
    .virtual('url')
    .get(() => {
      return '/teamcatalog/team/' + _id;
    });

// Export model
module.exports = mongoose.model('Team', TeamSchema);
