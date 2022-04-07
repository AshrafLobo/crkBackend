/** Import statements */
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("config");

const DbService = require("../dbService");

/** User model */
class User extends DbService {
  #database = null;
  #table = null;

  /** Set database and table name */
  constructor(database) {
    super();
    super.connect();

    this.#database = database;
    this.#table = "users";
  }

  async getOne(pnoneNo) {
    return await super.getOne(pnoneNo, this.#database, this.#table, "phoneNo");
  }

  /** Generate a jwt token for logged in user */
  generateToken(data) {
    return jwt.sign(_.pick(data, ["id"]), config.get("jwtPrivateKey"));
  }
}

/** Validate login credentials */
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
