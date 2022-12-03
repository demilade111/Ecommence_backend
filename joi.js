const Joi = require("joi");

const createScheme = () => {
  const scheme = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    image: Joi.string().required(),
    categories: Joi.array().required(),
    size: Joi.string(),
    color: Joi.string(),
    price: Joi.number().required(),
  });
  const { error } = scheme.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message,
    });
  }
};

module.exports = createScheme;
