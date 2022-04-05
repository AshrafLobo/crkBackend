const DbService = require("../dbService");

let instance = null;

class AgmModel extends DbService {
  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM company";
        this.connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async getAgmData(id) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM `company` WHERE `id` = ?";
        this.connection.query(query, [id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      return response;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = AgmModel;
