/** Import statements */
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("config");

const DbService = require("../dbService");

/** User model */
class User extends DbService {
  /** Set database and table name */
  constructor(database) {
    super(database, "users");
    super.connect();
  }

  async getOne(phoneNo) {
    return await super.getOne(phoneNo, "phoneNo");
  }

  async updateRecord(data, phoneNo) {
    return await super.updateRecord(data, phoneNo, "phoneNo");
  }

  /** Generate a jwt token for logged in user */
  generateToken(data) {
    return jwt.sign(
      _.pick(data, ["id", "phoneNo", "db", "isProxy"]),
      config.get("jwtPrivateKey")
    );
  }
}

/** Validate login credentials */
function validate(data) {
  const schema = Joi.object({
    phoneNo: Joi.string()
      .pattern(new RegExp("^[0-9]{12}$"))
      .required()
      .messages({
        "string.pattern.base":
          "Phone number should be a valid 12 digit phone number",
      }),
    pin: Joi.string().pattern(new RegExp("^[0-9]{4}$")).required().messages({
      "string.pattern.base": "Pin should be a valid 4 digit number",
    }),
    db: Joi.string().required(),
  });

  return schema.validate(data);
}

/** Validate check pin */
function validateCheckPin(data) {
  const schema = Joi.object({
    phoneNo: Joi.string()
      .pattern(new RegExp("^[0-9]{12}$"))
      .required()
      .messages({
        "string.pattern.base":
          "Phone number should be a valid 12 digit phone number",
      }),
    pin: Joi.string()
      .allow(null, "")
      .pattern(new RegExp("^[0-9]{4}$"))
      .messages({
        "string.pattern.base": "Pin should be a valid 4 digit number",
      }),
    db: Joi.string().required(),
  });

  return schema.validate(data);
}

/** Validate user details */
function validateUser(data) {
  const schema = Joi.object({
    name: Joi.string().required(),
    phoneNo: Joi.string()
      .pattern(new RegExp("^[0-9]{12}$"))
      .required()
      .messages({
        "string.pattern.base":
          "Phone number should be a valid 12 digit phone number",
      }),
    email: Joi.string().email(),
    paymentMethod: Joi.string().required(),
  });

  return schema.validate(data);
}

/** Validate change pin */
function validateChangePin(data) {
  const schema = Joi.object({
    oldPin: Joi.string().pattern(new RegExp("^[0-9]{4}$")).required().messages({
      "string.pattern.base": "Old pin should be a valid 4 digit number",
    }),
    newPin: Joi.string().pattern(new RegExp("^[0-9]{4}$")).required().messages({
      "string.pattern.base": "New pin should be a valid 4 digit number",
    }),
    confirmPin: Joi.any().valid(Joi.ref("newPin")).required().messages({
      "any.only": "Pins must match",
    }),
  });

  return schema.validate(data);
}

exports.User = User;
exports.validate = validate;
exports.validateCheckPin = validateCheckPin;
exports.validateUser = validateUser;
exports.validateChangePin = validateChangePin;
