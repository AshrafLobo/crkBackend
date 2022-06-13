/** Import statements */
const Joi = require("joi");

const DbService = require("../dbService");

/** Downloads model */
class Answers extends DbService {
  /** Set database and table name */
  constructor(database) {
    super(database, "answers");
    super.connect();
  }

  async getOne(agenda_no) {
    return await super.getOne(agenda_no, "agenda_no");
  }

  async getAll() {
    return await super.getAll();
  }

  async createRecord(data) {
    data["created"] = new Date();
    data["created"] = data["created"].toISOString();

    const answers = await this.getAll();
    data["answer_no"] = answers.length + 1;

    return await super.createRecord(data);
  }
}

exports.Answers = Answers;
