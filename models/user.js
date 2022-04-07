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

  /** Generate a jwt token for logged in user */
  generateToken(data) {
    return jwt.sign(_.pick(data, ["id"]), config.get("jwtPrivateKey"));
  }
}

/** Validate login credentials */
function validate(data) {
  const schema = Joi.object({
    phoneNo: Joi.string().pattern(new RegExp("[0-9]{12}")).required().messages({
      "string.pattern.base":
        "{{#label}} should be a valid 12 digit phone number",
    }),
    pin: Joi.string().pattern(new RegExp("[0-9]{4}")).required().messages({
      "string.pattern.base": "{{#label}} should be a valid 4 digit number",
    }),
  });

  return schema.validate(data);
}

exports.User = User;
exports.validate = validate;
