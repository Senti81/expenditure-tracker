module.exports = (app) => {
    const morgan = require('morgan')    
    const path = require('path')
    const fs = require('fs')

    const logStream = fs.createWriteStream(path.join(__dirname, '../logs/expenditures.log'), { flags: 'a'})
    
    morgan.token('date', () => { return new Date().toLocaleString() })
    app.use(morgan('[:date] :method :url :status :response-time ms', { stream: logStream }));
}