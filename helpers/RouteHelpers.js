//Object schema description language and validator for JavaScript objects.
//validate the params or body 
const Joi = require('joi');
module.exports = {
    validateParam: (schema, name) => {
        return (req, res, next) => {
            const result = Joi.validate({ param: req['params'][name] }, schema);
            if (result.error) {
                return res.status(400).json(result.error);
            } else {
                if (!req.value)
                    req.value = {};
                if (!req.value['params'])
                    req.value['params'] = {};

                req.value['params'][name] = result.value.param;
                next();
            }
        }
    },
    /*
    { param: req['params'][name] } => req.params.userId
    name = "userId"
    */
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                return res.status(400).json(result.error);
            } else {
                if (!req.value)
                    req.value = {};
                if (!req.value['body'])
                    req.value['body'] = {};

                req.value['body'] = result.value;
                next();
            }

        }
    },

    schemas: {
        postSchema: Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            user: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            image: Joi.array()

        }),
        updateSchema: Joi.object().keys({
            title: Joi.string(),
            description: Joi.string(),
            user: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            image: Joi.array()
        }),
        idSchema: Joi.object().keys({
            param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        authSignInSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }),
        authSignUpSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required()
        })

    }
}