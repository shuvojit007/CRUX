const router = require('express-promise-router')();
const ComntControllers = require('../controllers/comments');
const { validateParam, validateBody, schemas } = require('../helpers/RouteHelpers');
const passport = require('passport');
//new we here add the passport middleware which i wrote on config dirrectory 
require('../server/auth/passport')
const passportSignJWT = passport.authenticate('jwt', { session: false });

router.route('/:postId')

//get All comments
.get(validateParam(schemas.idSchema, 'postId'), ComntControllers.GetAllPostComntById)

//post a new Comment 
.post([validateParam(schemas.idSchema, 'postId'),
        validateBody(schemas.commentsSchema)
    ],
    passportSignJWT,
    ComntControllers.PostComment);

module.exports = router;