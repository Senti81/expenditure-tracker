const log = require('log4js')
log.configure({
    appenders: { expenditures: { type: 'file', filename: 'logs/expenditures.log' } },
    categories: { default: { appenders: ['expenditures'], level: 'error' } }
});

const logger = log.getLogger()
logger.level = 'info'

module.exports = logger