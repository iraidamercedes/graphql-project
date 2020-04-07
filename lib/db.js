'use strict'

const { MongoClient } = require('mongodb')
const {
    DB_HOST,
    DB_PORT,
    DB_NAME
} = process.env

const mongoUrl = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
let connection

async function connectDB () {
    if (connection) return connection

    let client
    try {
        client = await MongoClient.connect(mongoUrl, {
            useNewUrlParser: true
        })
        connection = client.db(DB_NAME)
    }
    catch(error) {
        console.error ('No se pude conectar a la bd', mongoUrl, error)
        procces.exit(1)
    }

    return connection
}

module.exports = connectDB