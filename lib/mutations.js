'use strict'

const connectDb = require('./db')

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
            console.error(error)
        }

        return newMalware
    },

    createCompany: async (root, { input }) => {
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
            console.error(error)
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
            console.error(error)
        }

        return malware
    },

    editCompany: async (root, { input }) => {

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
        )}

        catch (error){
            console.error(error)
        }

        return company
    }
}