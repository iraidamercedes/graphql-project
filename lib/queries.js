'use strict'

const connectDb = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
    
    getMalwares: async () => {
        let db 
        let malwares = []
        
        try{
            db = await connectDb()
            malwares = await db.collection('Malwares').find().toArray()
        }
        catch (error){
            errorHandler(error)
        }

        return malwares
    },

    getMalware: async (root, { id }) => {
        let db 
        let malware
        
        try{
            db = await connectDb()
            malware = await db.collection('Malwares').findOne({ _id: ObjectID(id) })
        }
        catch (error){
            errorHandler(error)
        }

        return malware
    },

    getCompanies: async () => {
        let db 
        let companies = []
        
        try{
            db = await connectDb()
            companies = await db.collection('Companies').find().toArray()
        }
        catch (error){
            errorHandler(error)
        }

        return companies
    },

    getCompany: async (root, { id }) => {
        let db 
        let company
        
        try{
            db = await connectDb()
            company = await db.collection('Companies').findOne({ _id: ObjectID(id) })
        }
        catch (error){
            errorHandler(error)
        }

        return company
    }    
}
