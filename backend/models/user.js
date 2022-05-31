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
      _.pick(data, ["id", "phoneNo", "db"]),
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
          "{{#label}} should be a valid 12 digit phone number",
      }),
    pin: Joi.string().pattern(new RegExp("^[0-9]{4}$")).required().messages({
      "string.pattern.base": "{{#label}} should be a valid 4 digit number",
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
          "{{#label}} should be a valid 12 digit phone number",
      }),
    email: Joi.string().email(),
    paymentMethod: Joi.string().required(),
  });

  return schema.validate(data);
}

exports.User = User;
exports.validate = validate;
exports.validateUser = validateUser;