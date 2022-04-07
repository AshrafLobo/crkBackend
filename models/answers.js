/** Import statements */
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("config");

const DbService = require("../dbService");

/** Downloads model */
class Answers extends DbService {
  /** Set database and table name */
  constructor(database) {
    super(database, "answers");
    super.connect();
  }

  async getOne(id) {
    return await super.getOne(id);
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

/** Validate login credentials */
function validate(data) {
  const schema = Joi.object({
    agenda_no: Joi.number().required(),
    answer: Joi.string().required(),
  });

  return schema.validate(data);
}

exports.Answers = Answers;
exports.validate = validate;
