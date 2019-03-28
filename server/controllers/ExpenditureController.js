const ExpenditureModel = require('../models/ExpenditureModel');

exports.findAll = async (req, res) => {
    try {
        const result = await ExpenditureModel.find().exec()
        res.send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.findOne = async (req, res) => {
    try {
        const result = await ExpenditureModel.findById(req.params.id).exec()
        res.send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.create = async (req, res) => {
    try {
        const result = await new ExpenditureModel(req.body).save()
        res.status(201).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.update = async (req, res) => {
    try {
        const result = await ExpenditureModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec()
        res.send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.remove = async (req, res) => {
    try {
        const result = await ExpenditureModel.findByIdAndDelete(req.params.id).exec()
        res.send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}