/*******************************************
 user Schema

 Passwort-Hashing from Stackeoverflow -> https://stackoverflow.com/questions/14588032/mongoose-password-hashing
 ************************/

let mongoose = require('mongoose');
bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

let Schema = mongoose.Schema;

let UserSchema = new Schema(
    {
        //_id should be defined by default
        user_name: {type: String, required: true, max: 100},
        user_password: {type: String, required: true, max: 100},
        user_role: {type: Number, required: true},
        user_id: {type: String, required: true},
        user_refresh_token: {type: String, required: false} //will be set by application automatically
    }
);
/*
// Virtual for event's URL
UserSchema
    .virtual('url')
    .get(function () {
        return '/usercatalog/user/' + this._id;
    });
*/
//create hock to hash password before save function is executed
UserSchema.pre("save", function(next)
{
    const user = this;
    if(user.user_password === undefined)
    {
        return next();
    }
    UserSchema.methods.hashPassword(user.user_password).then(function(hash)
    {
        user.user_password = hash;
        next();
    }).catch(function(err)
    {
        console.log("Could not hash new User password" + err.toString());
        next();
    })
});

//candidate password is hashed implizite -> use this function to hash passwords before store them in DB
UserSchema.methods.hashPassword = function(passwordToHash)
{
    return new Promise(function(resolve, reject)
    {
        bcrypt.hash(passwordToHash, SALT_WORK_FACTOR, function (err, hash) {

            if(err)
            {
                reject(new Error("Can not hash password"));
            }
            else
            {
                resolve(hash);
            }
        });

    });
};

UserSchema.methods.comparePassword = function(candidatePassword, user_password) {

    return new Promise(function(resolve,reject)
    {
        bcrypt.compare(candidatePassword, user_password, function (err, isMatch) {

            if (err)
            {
                reject(new Error("Error checking use password"));
            }
            else
            {
                //console.log(isMatch === true ? 'passwords match' : 'passwords dont match');
                resolve(isMatch);
            }
        });
    });
};

//Export model
module.exports = mongoose.model('User', UserSchema);


