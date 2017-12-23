const router = require('express-promise-router')();
const ComntControllers = require('../controllers/comments');
const { validateParam, validateBody, schemas } = require('../helpers/RouteHelpers');
const passport = require('passport');
//new we here add the passport middleware which i wrote on config dirrectory 
require('../server/auth/passport')
const passportSignJWT = passport.authenticate('jwt', { session: false });

router.route('/:postId')
    .post([validateParam(schemas.idSchema, 'postId'),
            validateBody(schemas.commentsSchema)
        ],
        passportSignJWT,
        ComntControllers.PostComment);

module.exports = router;