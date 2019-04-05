const ExpenditureModel = require('../models/ExpenditureModel');
const NOT_FOUND = { status: 'not found', message: `Cannot find requested ressource`}
const Log = require('../config/log')

exports.findAll = async (req, res) => {
    try {
        const result = await ExpenditureModel.find().exec()
        res.send(result)
    } catch (error) {
        Log.error(error.message)
        res.status(500).send(error)
    }
}

exports.findOne = async (req, res) => {
    try {
        const result = await ExpenditureModel.findById(req.params.id).exec()
        result ? res.send(result) : res.status(404).send(NOT_FOUND)
    } catch (error) {
        res.status(500).send(error)
        Log.error(error.message)
    }
}

exports.create = async (req, res) => {
    try {
        req.body.day = new Date().getDate()
        req.body.month = new Date().getMonth() +1
        req.body.year = new Date().getFullYear()
        req.body.created = new Date().toLocaleString()
        const result = await new ExpenditureModel(req.body).save()
        res.status(201).send(result)
    } catch (error) {
        Log.error(error.message)
        res.status(500).send(error)
    }
}

exports.update = async (req, res) => {
    try {
        const result = await ExpenditureModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec()
        result ? res.send(result) : res.status(404).send(NOT_FOUND)
    } catch (error) {
        Log.error(error.message)
        res.status(500).send(error)
    }
}

exports.remove = async (req, res) => {
    try {
        const result = await ExpenditureModel.findByIdAndDelete(req.params.id).exec()
        result ? res.send(result) : res.status(404).send(NOT_FOUND)
    } catch (error) {
        Log.error(error.message)
        res.status(500).send(error)
    }
}
