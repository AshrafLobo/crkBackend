/** Import statements */
const Joi = require("joi");
const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");

const ContactUsForm = sequelize.define("contactusform", {
  firstName: {
    type: DataTypes.STRING,
    validate: {
      max: 255,
    },
  },
  lastName: {
    type: DataTypes.STRING,
    validate: {
      max: 255,
    },
  },
  phoneNo: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      max: 255,
    },
  },
  subject: {
    type: DataTypes.STRING,
    validate: {
      max: 255,
    },
  },
  message: {
    type: DataTypes.TEXT,
  },
});

function validate(data) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNo: Joi.string().required(),
    subject: Joi.string().required(),
    message: Joi.string().required(),
  });

  return schema.validate(data);
}

exports.ContactUsForm = ContactUsForm;
exports.validate = validate;
