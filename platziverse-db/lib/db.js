'use strict'

const Sequelize = require('sequelize')
let sequelize = null

// singleton
module.exports = function setupDataBase (config) {
  // si no existe o es nulo
  if (!sequelize) {
    sequelize = new Sequelize(config)
  }
  return sequelize
}
