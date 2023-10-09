import db from '../models/index'
import specialtyService from '../services/specialtyService.js'

const createNewSpecialty = async (req, res) => {
    try {
        let response = await specialtyService.createNewSpecialty(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    createNewSpecialty
}