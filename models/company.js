const config = require("config");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const DbService = require("../dbService");

/** Company model */
class Company extends DbService {
  /** Initialise database name */
  #database = "agm";

  constructor() {
    super();
    super.connect();
  }

  async getAll() {
    return await super.getAll(this.#database, "company");
  }

  async getOne(id) {
    return await super.getOne(id, this.#database, "company");
  }

  /** Generate token for selected company */
  generateCompanyToken(data) {
    return jwt.sign(_.pick(data, ["id", "db"]), config.get("jwtPrivateKey"));
  }
}

/** Validate login credentials */
function validate(data) {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  return schema.validate(data);
}

exports.Company = Company;
exports.validate = validate;
