const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const DbService = require("../dbService");

/** Company model */
class Company extends DbService {
  /** Connect to database  */
  constructor() {
    super("agm", "company");
    super.connect();
  }

  async getAll() {
    return await super.getAll();
  }

  async getOne(id) {
    return await super.getOne(id);
  }

  async getOneWithDb(db) {
    return await super.getOne(db, "db");
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
