const passport = require('passport');
//find the user from token 
const JWTStrategy = require('passport-jwt').Strategy;
//this is for get token frn header
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
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
        const user = await User.findOne({ "local.email": email });
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


//Google Auth Strategy
passport.use('googleToken',
    new GooglePlusTokenStrategy({
        clientID: config.oauth.google.clientID,
        clientSecret: config.oauth.google.clientSecret
    }, async(accessToken, refreshToken, profile, done) => {
        try {
            //Should have full user profile here 
            const existingUser = await User
                .findOne({ "google.id": profile.id })

            if (existingUser) {
                console.log("Existing User : ", existingUser)
                return done(null, existingUser);
            }

            const newUser = new User({
                method: 'google',
                google: {
                    id: profile.id,
                    email: profile.emails[0].value
                },
                firstName: profile.name.givenName,
                lastName: profile.name.familyName
            });

            var user = await newUser.save();
            console.log(" User : ", user);
            done(null, newUser);

        } catch (error) {
            console.log(error);
            done(error, false, error.message);
        }
    }));