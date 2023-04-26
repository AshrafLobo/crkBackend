/** Import statements */
const Joi = require("joi");
const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");

const PayrollForm = sequelize.define("PayrollForm", {
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
  company: {
    type: DataTypes.STRING,
    validate: {
      max: 255,
    },
  },
  jobTitle: {
    type: DataTypes.STRING,
    validate: {
      max: 255,
    },
  },
  noOfEmployees: {
    type: DataTypes.STRING,
  },
  enquireAbout: {
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
    company: Joi.string().allow(""),
    jobTitle: Joi.string().allow(""),
    noOfEmployees: Joi.string().allow(""),
    enquireAbout: Joi.string().required(),
    message: Joi.string().required(),
  });

  return schema.validate(data);
}

exports.PayrollForm = PayrollForm;
exports.validate = validate;
