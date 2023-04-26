/** Import statements */
const Joi = require("joi");
const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");

const ShareRegistrationForm = sequelize.define("shareregistrationform", {
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
  email: {
    type: DataTypes.STRING,
    validate: {
      max: 255,
    },
  },
  phoneNo: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
    validate: {
      max: 255,
    },
  },
  idNumber: {
    type: DataTypes.STRING,
    validate: {
      max: 255,
    },
  },
  company: {
    type: DataTypes.STRING,
    validate: {
      max: 255,
    },
  },
  cdscNumber: {
    type: DataTypes.STRING,
    validate: {
      max: 255,
    },
  },
  service: {
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
    address: Joi.string().allow(""),
    idNumber: Joi.string().allow(""),
    company: Joi.string().required(),
    cdscNumber: Joi.string().allow(""),
    service: Joi.string().required(),
    message: Joi.string().required(),
  });

  return schema.validate(data);
}

exports.ShareRegistrationForm = ShareRegistrationForm;
exports.validate = validate;
