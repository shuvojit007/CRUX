const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const UserSchema = new Schema({
    method: {
        type: String,
        enum: ['local', 'google'],
        require: true
    },
    local: {
        email: {
            type: String,
            lowercase: true
        },
        password: {
            type: String
        }
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    },
    firstName: String,
    lastName: String,
    phnNumber: String,
    image: {
        type: String,
        default: "default"
    },
    post: [{
        type: Schema.Types.ObjectId,
        ref: 'post'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }]
});

//arrow funciton doesn't support this keyword for this here 
//we called  function in a old Fashion way
// UserSchema.pre('save', async function(next) {
//     try {

//         //if we use OAuth then we dont need to 
//         //hash the password
//         // if (this.method !== 'local') {
//         //     next();
//         // }
//         // if (this.update == !true) {
//         //     this.update = true;
//         //     const salt = await bcrypt.genSalt(10)
//         //     const passHash = await bcrypt.hash(this.local.password, salt)
//         //     this.local.password = passHash;
//         //     next()
//         // } else {
//         //     next()
//         // }
//         //Generate a Salt 
//         next()

//     } catch (error) {
//         next(error);
//     }
// });

//To chekc is the given pass is correct or not
UserSchema.methods.isValidPassword = async function(newPass) {
    try {
        return await bcrypt.compare(newPass, this.local.password)
    } catch (error) {
        throw new Error(error);
    }
}
const User = mongoose.model('user', UserSchema);
module.exports = User;