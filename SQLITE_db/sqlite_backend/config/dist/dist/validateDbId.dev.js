"use strict";

var _require = require('sequelize'),
    Sequelize = _require.Sequelize;

var validateSqliteId = function validateSqliteId(id) {
  var isvalid = Number.isInteger(id) && id > 0;

  if (!isvalid) {
    throw new Error("Id is not valid or not found");
  }
};

module.exports = {
  validateSqliteId: validateSqliteId
};