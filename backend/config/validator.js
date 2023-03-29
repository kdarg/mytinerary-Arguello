const joi = require('joi')

const validator = (req, res, next) => {

    const schema = joi.object({

        firstname: joi.string().max(25).min(2).trim().pattern(new RegExp('[a-zA-Z]')).required().messages({
            'string.min':"First name must have at least 2 characters.",
            'string.max':"First name can't have more than 25 characters."
        }),

        lastname: joi.string().max(25).min(2).trim().pattern(new RegExp('[a-zA-Z]')).required().messages({
            'string.min':"Last name must have at least 2 characters.",
            'string.max':"Last name can't have more than 25 characters."
        }),

        email: joi.string().email({ minDomainSegments: 2 }).required().messages({
            'string.email':"You must write a valid email adress."
        }),

        password: joi.string().pattern(new RegExp('[a-zA-Z0-9]')).required().trim().min(8).max(30).messages({
            'string.min':"Your password must be at least 8 characters long, and must include at least one uppercase letter and one number.",
            'string.pattern':"The password must be alphanumeric and contain a number."
        }),

        urlimage: joi.string().min(5).trim().required().messages({
            'string.min': "Please use a valid URL."
        }),

        country:joi.string().required(),

        from:joi.string()
    })

    const validation = schema.validate(req.body.userData, {abortEarly:false})
    
    if (validation.error) {
        
        return res.json({success: false, from:"validator", message:validation.error.details})
    }
    
    next()
    
}

module.exports = validator