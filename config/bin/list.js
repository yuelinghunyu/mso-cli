'use strict'
const table = require('../model/table');
const tpls = require('../model/template');

module.exports = () => {
  table(tpls);
  process.exit();
};