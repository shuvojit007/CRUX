const router = require('express-promise-router')();
const UserController = require('../controllers/users');
const { validateBody, schemas } = require('../helpers/RouteHelpers');
const passport = require('passport');
//now add passport middleware
require('../server/auth/passport');
const passportSignIn = passport.authenticate('local', { session: false });

router.route('/signup')
    .post(validateBody(schemas.authSignUpSchema),
        UserController.SignUp);

router.route('/signin')
    .post(validateBody(schemas.authSignInSchema),
        passportSignIn,
        UserController.SignIn
    );

module.exports = router;