'use strict'

const connectDb = require('./db')
const { ObjectID } = require('mongodb')

module.exports = {
    Query: {
        getMalwares: async () => {
            let db 
            let malwares = []
            
            try{
                db = await connectDb()
                malwares = await db.collection('Malwares').find().toArray()
            }
            catch (error){
                console.error(error)
            }

            return malwares
        },

        getMalware: async (root, { id }) => {
            let db 
            let malwares = []
            
            try{
                db = await connectDb()
                malware = await db.collection('Malwares').findOne({ _id: ObjectID(id) })
            }
            catch (error){
                console.error(error)
            }

            return malware
        }
    }   
}