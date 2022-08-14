/** Import statements */
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("config");
var generator = require("generate-password");

const DbService = require("../dbService");

/** User model */
class User extends DbService {
  /** Set database and table name */
  constructor(database) {
    super(database, "users");
    super.connect();
  }

  async getOne(ID_RegCert_No) {
    return await super.getOne(ID_RegCert_No, "ID_RegCert_No");
  }

  async updateRecord(data, ID_RegCert_No) {
    return await super.updateRecord(data, ID_RegCert_No, "ID_RegCert_No");
  }

  /** Generate a jwt token for logged in user */
  generateToken(data) {
    return jwt.sign(
      _.pick(data, [
        "ID_RegCert_No",
        "db",
        "isProxy",
        "full_name",
        "email",
        "company",
      ]),
      config.get("jwtPrivateKey")
    );
  }

  /** Generate a pin for a user */
  generatePin() {
    return generator.generate({
      length: 4,
      numbers: true,
      uppercase: false,
      lowercase: false,
    });
  }
}

/** Validate login credentials */
function validate(data) {
  const schema = Joi.object({
    ID_RegCert_No: Joi.string().required(),
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
    ID_RegCert_No: Joi.string().required(),
    db: Joi.string().required(),
  });

  return schema.validate(data);
}

/** Validate user details */
function validateUser(data) {
  const schema = Joi.object({
    name: Joi.string().required(),
    ID_RegCert_No: Joi.string().required(),
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
