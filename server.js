const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const urlRoute = require('./routes/url')

mongoose.set('strictQuery',false)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/api',urlRoute)
app.use((e,req,res,next) => {
    const {statusCode,message,data} = e;
    res.status(statusCode || 500).json({
        message:message,
        data:data
    })
})

async function main() {
    try {
        const db = await mongoose.connect('mongodb://root:root@mongodb:27017/url-shortener?authMechanism=DEFAULT&authSource=admin')
        const server = app.listen(3000)
        if(!db) throw new Error('Database connection failed')
        console.log(`Server is running on port ${server.address().port}`)
    } catch (e) {
        console.log(e)
    }
}

main()