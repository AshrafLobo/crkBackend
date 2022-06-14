/** Import statements */
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("config");
var generator = require("generate-password");

const DbService = require("../dbService");

/** Proxy model */
class Proxy extends DbService {
  /** Set database and table name */
  constructor(database) {
    super(database, "proxy_users");
    super.connect();
  }

  async getOne(users_MemberNo) {
    return await super.getOne(users_MemberNo, "users_MemberNo");
  }

  async createRecord(data) {
    data["created"] = new Date();
    data["created"] = data["created"].toISOString();

    data["code"] = generator.generate({
      length: 4,
      numbers: true,
      uppercase: true,
      lowercase: false,
    });

    return await super.createRecord(data);
  }

  async updateRecord(data, phoneNo) {
    return await super.updateRecord(data, phoneNo, "phoneNo");
  }

  /** Generate a pin for a verified proxy */
  generatePin() {
    return generator.generate({
      length: 4,
      numbers: true,
      uppercase: false,
      lowercase: false,
    });
  }
}

function validate(data) {
  const schema = Joi.object({
    users_MemberNo: Joi.number().required(),
    phoneNo: Joi.string()
      .pattern(new RegExp("^[0-9]{12}$"))
      .required()
      .messages({
        "string.pattern.base":
          "{{#label}} should be a valid 12 digit phone number",
      }),
    email: Joi.string().email(),
    full_name: Joi.string().required(),
    ID_RegCert_No: Joi.string().max(8).pattern(new RegExp("[0-9]+")).required(),
  });

  return schema.validate(data);
}

function validateCode(data) {
  const schema = Joi.object({
    phoneNo: Joi.string()
      .pattern(new RegExp("^[0-9]{12}$"))
      .required()
      .messages({
        "string.pattern.base":
          "{{#label}} should be a valid 12 digit phone number",
      }),
    code: Joi.string()
      .pattern(new RegExp("^[0-9A-Z]{4}$"))
      .required()
      .messages({
        "string.pattern.base": "{{#label}} should be a valid 4 digit code",
      }),
  });

  return schema.validate(data);
}

exports.Proxy = Proxy;
exports.validate = validate;
exports.validateCode = validateCode;
