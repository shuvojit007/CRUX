const passport = require('passport');
//find the user from token 
const JWTStrategy = require('passport-jwt').Strategy;
//this is for get token frn header
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const config = require('../../config/config');
const User = require('../../models/user');
//JSON WEB TOKEN STRATEGY (authenticate using token)
passport.use("jwt", new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('auth'),
    secretOrKey: config.JWT_SECRET
}, async(payload, done) => {
    try {
        const user = await User.findById(payload.sub, "_id");
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (err) {
        done(err, false)
    }
}));

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async(email, password, done) => {
    try {
        console.log(email)
        const user = await User.findOne({ "local.email": email });
        console.log(user)
        if (!user) {
            console.log('not found')
            return done(null, false)
        }
        const isMatch = user.isValidPassword(password);
        if (!isMatch) { return done(null, false) }
        done(null, user)
    } catch (error) {
        done(error, false);
    }
}));