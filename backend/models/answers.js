/** Import statements */
const Joi = require("joi");

const DbService = require("../dbService");

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
    const date = new Date();
    data["created"] = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDay()} ${date.getHours() + 1}:${date.getMinutes() + 1}:${
      date.getSeconds() + 1
    }`;

    const answers = await this.getAll();
    data["answer_no"] = answers.length + 1;

    return await super.createRecord(data);
  }
}

exports.Answers = Answers;
