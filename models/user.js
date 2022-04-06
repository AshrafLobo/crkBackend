const Joi = require("joi");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("config");

const DbService = require("../dbService");

class User extends DbService {
  #database = null;
  #table = null;

  constructor(database, table) {
    super();
    super.connect();

    this.#database = database;
    this.#table = table;
  }

  async getAll() {
    return await super.getAll(this.#database, this.#table);
  }

  async getOne(id) {
    return await super.getOne(id, this.#database, this.#table, "phoneNo");
  }

  generateToken(data) {
    return jwt.sign(_.pick(data, ["id"]), config.get("jwtPrivateKey"));
  }
}

function validate(data) {
  const schema = Joi.object({
    number: Joi.string().pattern(new RegExp("[0-9]{12}")).required().messages({
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
