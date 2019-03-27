const ExpenditureModel = require('../models/ExpenditureModel');

exports.findAll = (req, res) => {
    ExpenditureModel.find((err, result) => {
        if (err) return console.error(err)
        res.json(result)
    })
}

exports.findOne = (req, res) => {
    ExpenditureModel.findById(req.params.id, (err, result) => {
        if (err) {
            res.status(400)
            res.send(err)
        } else {
            if (result != null) {
                res.status(200)
                res.json(result)
            } else {
                res.status(404)
                res.json({
                    status: 404,
                    message: `Could not find ressource with id ${req.params.id}`
                })
            }
        }
    })
}

exports.create = (req, res) => {
    new ExpenditureModel(req.body).save((err, result) => {
        if (err) {
            res.status(400)
            res.send(err)
        } else {
            res.status(201)
            res.json(result)
        }
    })
}

exports.update = (req, res) => {
    ExpenditureModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (err, result) => {
        if (err) res.send(err)
        res.json(result)
    })
}

exports.remove = (req, res) => {
    ExpenditureModel.findByIdAndDelete(req.params.id, (err, result) => {
        if (result == null) {
            res.status(404)
            return res.json({
                status: 404,
                message: `ressource with id ${req.params.id} not found`
            })            
        }            
        if(err) {
            res.send(err)
        } else {
            res.json({
                message: `Entry with id ${req.params.id} deleted successfully`
            })
        }
    })
}