const ExpenditureModel = require('../models/ExpenditureModel');
const NOT_FOUND = { status: 'not found', message: `Cannot find requested ressource`}

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
        result ? res.send(result) : res.status(404).send(NOT_FOUND)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.create = async (req, res) => {
    try {
        const result = await new ExpenditureModel(req.body).save()
        res.status(201).send(result)
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error)
    }
}

exports.update = async (req, res) => {
    try {
        const result = await ExpenditureModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec()
        result ? res.send(result) : res.status(404).send(NOT_FOUND)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.remove = async (req, res) => {
    try {
        const result = await ExpenditureModel.findByIdAndDelete(req.params.id).exec()
        result ? res.send(result) : res.status(404).send(NOT_FOUND)
    } catch (error) {
        res.status(500).send(error)
    }
}