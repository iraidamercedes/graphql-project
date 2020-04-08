'use strict'

require('dotenv').config()
const { makeExecutableSchema } = require ('graphql-tools')
const express = require('express')
const gqlMiddleware = require ('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express()
const port = process.env.port || 3000

//definir esquema
const typeDefs = readFileSync(
        join(__dirname, 'lib', 'schema.graphql'),
        'utf-8'
    )
const schema = makeExecutableSchema ({typeDefs, resolvers})


app.use('/api', gqlMiddleware({
    schema : schema,
    rootValue: resolvers,
    graphiql: true
}))

app.listen(port, () => {
    console.log(`server is listening at http://localhost:${port}/api`)
})

//Ejecutar query hello
//graphql(schema, '{ saludo }', resolvers).then((data)=>{
//    console.log(data)
//})