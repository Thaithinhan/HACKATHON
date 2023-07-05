const dbConfigs = require("../configs/db.configs");
const mysql = require("mysql2");

const connectionMySQL = mysql.createConnection({
  host: dbConfigs.host,
  user: dbConfigs.user,
  password: dbConfigs.password,
  database: dbConfigs.database,
});

connectionMySQL.connect((err) => {
  if (err) throw err;
  console.log("connected");
});

module.exports = connectionMySQL;
