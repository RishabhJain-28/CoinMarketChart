const Joi = require("joi");
// Joi.objectId = require("joi-objectid")(Joi);

const newUser = (body) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
  });
  return schema.validate(body);
};

module.exports = {
  newUser,
};
