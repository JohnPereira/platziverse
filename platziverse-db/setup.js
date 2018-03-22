'use strict'

const db = require('./')// por defecto llama a index.js
const debug = require('debug')('platziverse:db:setup')
const inquirer = require('inquirer')
const prompt = inquirer.createPromptModule()

async function setup () {
  const answer = await prompt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'This will destroy your Database, are you sure?'
    }
  ])

  if (!answer.setup) {
    return console.log('Nothing happened!!!')
  }

  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    operatorsAliases: false, // quitar los operadores personalizados mejora la seguridad
    loggin: s => debug(s), // arrow function
    setup: true
  }

  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

setup()
