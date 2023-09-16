const { Sequelize } = require('sequelize');

const validateSqliteId = (id) => {
  const isvalid = Number.isInteger(id) && id > 0;
  if (!isvalid) {
    throw new Error("Id is not valid or not found");
  }
};

module.exports = { validateSqliteId };
