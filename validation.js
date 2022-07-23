const joi= require("@hapi/joi")

const loginValidation = data=>{

    const schema=joi.object({
        email:joi.string()
        .min(5)
        .required(),
        password:joi.string()
        .min(5)
        .required()
    })
    return  schema.validate(data)
}



const registerValidation = data=>{

    const schema=joi.object({
        name:joi.string()
        .min(5)
        .required(),
        email:joi.string()
        .min(5)
        .required(),
        password:joi.string()
        .min(5)
        .required()
    })
    return  schema.validate(data)
}


module.exports.registerValidation= registerValidation
module.exports.loginValidation= loginValidation

