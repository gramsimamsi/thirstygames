/*******************************************
 user Schema

 Passwort-Hashing from Stackeoverflow -> https://stackoverflow.com/questions/14588032/mongoose-password-hashing
 ************************/

var mongoose = require('mongoose');
bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        //_id should be defined by default
        user_id: {type: String, required: true},
        user_name: {type: String, required: true, max: 100},
        user_password: {type: String, required: true, max: 100},
        user_role: {type: Number, required: true}
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
UserSchema
    .virtual('url')
    .get(function () {
        return '/usercatalog/user/' + this._id;
    });


//taken from above stackoverflow-post, also example of usage there
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.user_password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.user_password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};




//Export model
module.exports = mongoose.model('User', UserSchema);


