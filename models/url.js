const {Schema, model} = require('mongoose')


const urlSchema = new Schema({
    originalUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true
    },
    uniqueID:{
        type:String,
        required:true
    }
})

module.exports = model('urls',urlSchema)