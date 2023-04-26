/** Import statements */
const Joi = require("joi");
const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");

const PayrollDownloadForm = sequelize.define("payrolldownloadform", {
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
  noOfEmployees: {
    type: DataTypes.STRING,
    validate: {
      max: 50,
    },
  },
});

function validate(data) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNo: Joi.string().required(),
    company: Joi.string().required(),
    noOfEmployees: Joi.string().required(),
  });

  return schema.validate(data);
}

exports.PayrollDownloadForm = PayrollDownloadForm;
exports.validate = validate;
