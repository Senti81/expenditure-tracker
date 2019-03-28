module.exports = () => {
    const mongoose = require('mongoose')

    const URL = 'localhost'
    // const URL = '127.0.0.1'
    const COLLECTION = 'housekeeping'

    mongoose.connect(`mongodb://${URL}/${COLLECTION}`, { useNewUrlParser: true })
}