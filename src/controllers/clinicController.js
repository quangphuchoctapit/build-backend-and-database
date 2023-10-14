import db from '../models/index'
import clinicService from '../services/clinicService.js'

const createNewClinic = async (req, res) => {
    try {
        let data = await clinicService.createNewClinic(req.body)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Err from server'
        })
    }
}

const getAllClinic = async (req, res) => {
    try {
        let response = await clinicService.getAllClinic()
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: 1,
            errMessage: 'err from server'
        })
    }
}

const getDetailClinicById = async (req, res) => {
    try {
        let response = await clinicService.getDetailClinicById(req.query.id)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: 1,
            errMessage: 'err from server'
        })
    }
}

module.exports = {
    createNewClinic,
    getAllClinic,
    getDetailClinicById
}