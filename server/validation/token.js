const Joi = require("joi");
// Joi.objectId = require("joi-objectid")(Joi);

const token = (body) => {
  const schema = Joi.object({
    image: Joi.string().required(),
    address: Joi.string().trim().required(), //! more validation sample: "0x51245b9bf3648b3ea6f21f3ba5ae3a946db8a572"
    symbol: Joi.string().required(),
    name: Joi.string().required(),
    displayInfo: Joi.string().required(),
    tokenAddress: Joi.string().trim().required(), //! more validation sample: "0x51245b9bf3648b3ea6f21f3ba5ae3a946db8a572"
    DEX: Joi.string().required(), //! more validation sample: "0x51245b9bf3648b3ea6f21f3ba5ae3a946db8a572"
  });
  return schema.validate(body);
};

module.exports = {
  token,
};
