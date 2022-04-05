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
}

module.exports = Company;
