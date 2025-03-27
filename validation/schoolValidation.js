const Joi = require("joi");

const schoolSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  address: Joi.string().min(10).max(200).required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
});

module.exports = schoolSchema;
