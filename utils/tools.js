const crypto = require('crypto')
module.exports = {
    uuid: function (length) {
        return new Promise((resolve, reject) => {
            if (length < 1) {
                throw reject(new Error('uuid length must be greater than 0'))
            }
             resolve(crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length))
        })
    }
}