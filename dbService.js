const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const { USER, PASSWORD, DB_PORT, HOST } = process.env;

class DbService {
  get connection() {
    return this._connection;
  }

  connect() {
    this._connection = mysql.createConnection({
      host: HOST,
      user: USER,
      password: PASSWORD,
      port: DB_PORT,
    });

    this._connection.connect((err) => {
      if (err) console.log(err.message);
      console.log(`DB Status: ` + this._connection.state);
    });
  }

  close() {
    if (this._connection)
      this._connection.end(() => console.log("Connection closed..."));
  }

  async getAll(database, table) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${database}.${table}`;
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

  async getOne(id, database, table) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${database}.${table} WHERE id = ?`;
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

module.exports = DbService;
