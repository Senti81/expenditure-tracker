module.exports = (app) => {
    const ExpenditureController = require('../controllers/ExpenditureController')
    
    app.route('/expenditures')
        .get(ExpenditureController.findAll)
        .post(ExpenditureController.create)
    
    app.route('/expenditures/:id')
        .get(ExpenditureController.findOne)
        .put(ExpenditureController.update)
        .delete(ExpenditureController.remove)
}
