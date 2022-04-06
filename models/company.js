const config = require("config");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const DbService = require("../dbService");

class Company extends DbService {
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

  generateCompanyToken(data) {
    return jwt.sign(_.pick(data, ["id", "db"]), config.get("jwtPrivateKey"));
  }
}

module.exports = Company;
