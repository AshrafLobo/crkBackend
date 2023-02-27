/** Import statements */
const Joi = require("joi");

const DbService = require("../dbService");

/** Downloads model */
class Votes extends DbService {
  /** Set database and table name */
  constructor(database) {
    super(database, "votes");
    super.connect();
  }

  async getOne(id) {
    return await super.getOne(id);
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
    return await super.createRecord(data);
  }
}

/** Validate answer credentials */
function validate(data) {
  const schema = Joi.object({
    agenda_id: Joi.number().required(),
    agenda_no: Joi.number().required(),
    agenda_name: Joi.string().required(),
    agenda_question: Joi.string().required(),
    voter_MemberNo: Joi.number().required(),
    full_name: Joi.string().required(),
    phoneNo: Joi.string()
      .pattern(new RegExp("^[0-9]{12}$"))
      .required()
      .messages({
        "string.pattern.base":
          "Phone number should be a valid 12 digit phone number",
      }),
    vote: Joi.string().required(),
    shares: Joi.number().required(),
  });

  return schema.validate(data);
}

exports.Votes = Votes;
exports.validate = validate;
