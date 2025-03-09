const Joi = require("joi");

// Register Validation
exports.validateRegister = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().optional(),
    phone: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .required(),
  });
  return schema.validate(data);
};

// Login Validation
exports.validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    panelType:Joi.string().required()
  });
  return schema.validate(data);
};

// Reset Password Validation
exports.validateResetPassword = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    resetToken: Joi.string().required(),
    newPassword: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
