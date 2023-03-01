/** Import statements */
const Joi = require("joi");

const DbService = require("../dbService");

/** Attendance model */
class Attendance extends DbService {
  /** Set database and table name */
  constructor(database) {
    super(database, "attendance");
    super.connect();
  }

  async getOne(ID_RegCert_No) {
    return await super.getOne(ID_RegCert_No, "ID_RegCert_No");
  }

  async createRecord(data) {
    const date = new Date();
    data["created"] = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDay()} ${date.getHours() + 1}:${date.getMinutes() + 1}:${
      date.getSeconds() + 1
    }`;

    if (data.isProxy) {
      data["type"] = "Proxy";
    } else {
      data["type"] = "Member";
    }

    delete data.isProxy;
    return await super.createRecord(data);
  }

  async updateRecord(data, ID_RegCert_No) {
    return await super.updateRecord(data, ID_RegCert_No, "ID_RegCert_No");
  }

  async deleteRecord(ID_RegCert_No) {
    return await super.deleteRecord(ID_RegCert_No, "ID_RegCert_No");
  }
}

function validate(data) {
  const schema = Joi.object({
    MemberNo: Joi.string().required(),
    ID_RegCert_No: Joi.string().required(),
    email: Joi.string().email(),
  });

  return schema.validate(data);
}

exports.Attendance = Attendance;
exports.validate = validate;
