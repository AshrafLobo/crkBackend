/** Import statements */
const Joi = require("joi");
var generator = require("generate-password");

const DbService = require("../dbService");

/** Proxy model */
class Proxy extends DbService {
  /** Set database and table name */
  constructor(database) {
    super(database, "proxy_users");
    super.connect();
  }

  async getOne(ID_RegCert_No) {
    return await super.getOne(ID_RegCert_No, "ID_RegCert_No");
  }

  async getProxy(users_MemberNo) {
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

  async updateRecord(data, ID_RegCert_No) {
    return await super.updateRecord(data, ID_RegCert_No, "ID_RegCert_No");
  }

  async deleteRecord(ID_RegCert_No) {
    return await super.deleteRecord(ID_RegCert_No, "ID_RegCert_No");
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
    email: Joi.string().email(),
    full_name: Joi.string().required(),
    ID_RegCert_No: Joi.string().required(),
  });

  return schema.validate(data);
}

/** Validate proxy details */
function validateProxy(data) {
  const schema = Joi.object({
    name: Joi.string().required(),
    ID_RegCert_No: Joi.string().required(),
    email: Joi.string().email(),
  });

  return schema.validate(data);
}

function validateCode(data) {
  const schema = Joi.object({
    ID_RegCert_No: Joi.string().required(),
    code: Joi.string()
      .pattern(new RegExp("^[0-9A-Z]{4}$"))
      .required()
      .messages({
        "string.pattern.base": "{{#label}} should be a valid 4 digit code",
      }),
    db: Joi.string().required(),
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

exports.Proxy = Proxy;
exports.validate = validate;
exports.validateProxy = validateProxy;
exports.validateCode = validateCode;
exports.validateChangePin = validateChangePin;
