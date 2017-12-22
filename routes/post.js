const router = require('express-promise-router')();
const PostControllers = require('../controllers/posts');
const {
    validateParam,
    validateBody,
    schemas
} = require('../helpers/RouteHelpers');
const passport = require('passport');
//new we here add the passport middleware which i wrote on config dirrectory 
require('../server/auth/passport')
const passportSignJWT = passport.authenticate('jwt', { session: false });

router.route('/')
    .get(PostControllers.GetAllPost)
    .post(validateBody(schemas.postSchema), passportSignJWT, PostControllers.AddPost);
router.route('/:postId')
    .get(validateParam(schemas.idSchema, 'postId'),
        PostControllers.GetPostById)
    .put([validateParam(schemas.idSchema, 'postId'),
            validateBody(schemas.updateSchema)
        ],
        PostControllers.UpdatePost)
    .delete(validateParam(schemas.idSchema, 'postId'),
        PostControllers.DeletePostById);

module.exports = router;