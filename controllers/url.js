const urls = require('../models/url')
const tools = require('../utils/tools')
const config = require('../config.json')
exports.shortenUrl = async(req,res,next) => {
    try{
        
        const {originalUrl} = req.body
        const url = await urls.findOne({originalUrl:originalUrl})
        if(url){ // Check if the URL already exists in the database
            const error = new Error('Url already exists')
            error.statusCode = 409
            error.data = {
                originalUrl:originalUrl,
                shortUrl:url.shortUrl,
                uniqueID:url.uniqueID
            }
            throw error
        }
        const shortUrl = await tools.uuid(config.SHORT_URL_ID_LENGTH) // Generate a unique ID for the shortened URL
        const newUrl = new urls({
            originalUrl:originalUrl,
            shortUrl:`${req.protocol}://${req.get('host')}/api/urls/${shortUrl}`,
            uniqueID:shortUrl
        })
        await newUrl.save() // Save the new document to the database
        res.status(201).json({
            message:'Url shortened successfully',
            data:{
                originalUrl:originalUrl,
                shortUrl:`${req.protocol}://${req.get('host')}/api/urls/${shortUrl}`,
                uniqueID:shortUrl
            }
        })
    }catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
        }
        next(e)
    }
}

exports.redirectUrl = async(req,res,next) => {
    try {
        const {id} = req.params // Extract the ID parameter from the request
        const url = await urls.findOne({uniqueID:id}) // Find the corresponding document in the URLs collection
        if(!url){ // If the document is not found, return an error response
            const error = new Error('Url not found')
            error.statusCode = 404;
            throw error
        }
        res.redirect(url.originalUrl) // Redirect the user to the original URL
    } catch (e) {
        if(!e.statusCode){
            e.statusCode = 500;
        }
        next(e)
    }
}