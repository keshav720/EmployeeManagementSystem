const oracledb = require("oracledb");
const dbConfig = require("../config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.db.DB,
  dbConfig.db.USER,
  dbConfig.db.PASSWORD,
  {
    dialect: dbConfig.db.dialect,
    dialectModule: oracledb,
    operatorsAliases: "0",
    host: process.env.PGHOST,
    port: 1521,
    pool: dbConfig.db.pool,
    dialectOptions: dbConfig.db.dialectOptions,
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.DepartmentDetails=require("./department")(
    sequelize,
    Sequelize
);
db.EmployeeDetails=require("./employee")(
    sequelize,
    Sequelize
);
db.User=require("./user")(
  sequelize,
  Sequelize
);

//mapping department to employees
db.DepartmentDetails.hasMany(db.EmployeeDetails, {
  foreignKey: "department-id",
  as: "employees",
});
db.EmployeeDetails.belongsTo(db.DepartmentDetails, {
  foreignKey: "department-id",
});

module.exports = { db };
