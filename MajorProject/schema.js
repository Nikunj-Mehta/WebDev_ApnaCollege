const Joi = require("joi"); // server side schema validator.

module.exports.listingSchema = Joi.object({ // joi k andr humere pass ek object aani chaiyea aur vo object ka jo naam hoga uska naam listing hoga
  listing : Joi.object({ // aur vo listing naam ka object joi k according ek object honi chaiyea aur ye required hona chaiyea matlab hona he chaiyea.
    title: Joi.string().required(), // aab vo object k andr ye sb parameters hone chaiyea
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    country: Joi.string().required(),
    location: Joi.string().required(),
    image: Joi.string().allow("", null)
  }).required() 
})