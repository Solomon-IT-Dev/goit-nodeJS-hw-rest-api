const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .min(1)
    .pattern(/^([^\[\#\@\]\{\}\(\)\:\;\=\?]+)$/, "name")
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(1).required(),
});

module.exports = contactSchema;
