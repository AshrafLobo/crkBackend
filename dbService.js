const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const { USER, PASSWORD, DATABASE, DB_PORT, HOST } = process.env;

class DbService {
  constructor(database = DATABASE) {
    this._connection = mysql.createConnection({
      host: HOST,
      user: USER,
      password: PASSWORD,
      database: database,
      port: DB_PORT,
    });

    this._connection.connect((err) => {
      if (err) console.log(err.message);
      console.log("DB Status: " + this._connection.state);
    });
  }

  get connection() {
    return this._connection;
  }

  close() {
    if (this._connection)
      this._connection.end(() => console.log("Connection closed..."));
  }
}

module.exports = DbService;
