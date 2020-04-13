'use strict'

const connectDb = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
    createMalware: async (root, { input }) => {
        const defaults = {
            family: '',
            year: '',
            media: ''
        }

        const newMalware = Object.assign(defaults, input)
        let db
        let malware
        
        try {
            db = await connectDb ()
            malware = await db.collection('Malwares').insertOne(newMalware)
            newMalware._id = malware.insertedId
        }

        catch (error){
            errorHandler(error)
        }

        return newMalware
    },

    createProvider: async (root, { input }) => {
        const defaults = {
            country: ''
        }

        const newCompany = Object.assign(defaults, input)
        let db
        let company
        
        try {
            db = await connectDb ()
            company = await db.collection('Companies').insertOne(newCompany)
            newCompany._id = company.insertedId
        }

        catch (error){
            errorHandler(error)
        }

        return newCompany
    },

    editMalware: async (root, { input }) => {

        let db
        let malware
        
        try {
            db = await connectDb ()
            await db.collection('Malwares').updateOne(
                { _id: ObjectID(_id) },
                { $set: input}
            )
        
            malware = await db.collection('Malwares').findOne(
            { _id: ObjectID(_id) }
        )}

        catch (error){
            errorHandler(error)
        }

        return malware
    },

    editProvider: async (root, { input }) => {

        let db
        let company
        
        try {
            db = await connectDb ()
            await db.collection('Companies').updateOne(
                { _id: ObjectID(_id) },
                { $set: input}
            )
        
            company = await db.collection('Companies').findOne(
            { _id: ObjectID(_id) }
        )} catch (error){
            errorHandler(error)
        }

        return company
    },

    addProvider: async (root, { malwareID, companyID }) => {
        let db
        let malware
        let provider


        try {
                db = await connectDb()
                malware = await db.collection('Malwares').findOne({ 
                    _id: ObjectID(malwareID) 
                })
                provider = await db.collection('Companies').findOne({ 
                    _id: ObjectID(companyID) 
                })
        
        if (!malware || !provider) throw new Error ('La empresa que provee información o el malware no existe')
        
        await db.collection ('Malwares').updateOne(
            { _id: ObjectID(malwareID) },
            { $addToSet: { info_provider: ObjectID(companyID) } }
        )} catch (error){
            errorHandler(error)
        }

        return malware
    }
}