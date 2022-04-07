const DbService = require("../dbService");

class Agenda extends DbService {
  #database = null;
  #table = null;

  constructor(database) {
    super();
    super.connect();

    this.#database = database;
    this.#table = "agendas";
  }

  async getAll() {
    return await super.getAll(this.#database, this.#table);
  }

  async getOne(id) {
    return await super.getOne(id, this.#database, this.#table, "");
  }
}

module.exports = Agenda;
