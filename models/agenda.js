const DbService = require("../dbService");

class Agenda extends DbService {
  constructor(database) {
    super(database, "agendas");
    super.connect();
  }

  async getAll() {
    return await super.getAll();
  }

  async getOne(id) {
    return await super.getOne(id);
  }
}

module.exports = Agenda;
