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

  async getOne(phoneNo) {
    return await super.getOne(phoneNo, "phoneNo");
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

  /** Generate a jwt token for logged in user */
  generateToken(data) {
    return jwt.sign(_.pick(data, ["id"]), config.get("jwtPrivateKey"));
  }
}

function validate(data) {
  const schema = Joi.object({
    phoneNo: Joi.string().pattern(new RegExp("[0-9]{12}")).required().messages({
      "string.pattern.base":
        "{{#label}} should be a valid 12 digit phone number",
    }),
    full_name: Joi.string().required(),
    ID_RegCert_No: Joi.string().max(8).pattern(new RegExp("[0-9]+")).required(),
    language: Joi.string().valid("English", "Kiswahili").required(),
  });

  return schema.validate(data);
}

exports.Proxy = Proxy;
exports.validate = validate;
