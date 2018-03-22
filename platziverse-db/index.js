'use strict'

const setupDataBase = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupMetricModel = require('./models/metric')

// promesa /promise
module.exports = async function (config) {
  const sequelize = setupDataBase(config)
  const agentModel = setupAgentModel(config)
  const metricModel = setupMetricModel(config)

  agentModel.hasMany(metricModel)// tiene muchas metricas
  metricModel.belongsTo(agentModel)// pertenece a un agente

  // verificar que la base de datos esta bien configurada
  await sequelize.authenticate()

  if (config.setup) { // con setup preguntamos si ya existe la bd, que se borre y se cree denuevo con:
    await sequelize.sync({force: true})// sincronizar la base de datos o crearla en el servidor, con force:true la borra y crea denuevo si existe
  }

  // configuracion de la base de datos
  sequelize.sync()// toda la definicion de los modelos que estan definidas en esta app, si no esta en la bd, las crea

  const Agent = {}
  const Metric = {}

  // ES6, en vez de Agent: Agent, lo asigna automaticamente
  return {
    Agent,
    Metric
  }
}
