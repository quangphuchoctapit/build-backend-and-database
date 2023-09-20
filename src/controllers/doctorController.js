import doctorService from '../services/doctorService.js'

const getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit
    if (!limit) limit = 10
    try {
        let response = await doctorService.getTopDoctorHome(+limit)
        console.log(response)
        return res.status(200).json(response)

    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: 'error from server...'
        })
    }
}

const getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors()
        return res.status(200).json(doctors)
    } catch (e) {
        console.log(e)
        res.status(200).json({
            errCode: -1,
            errMessage: 'error from server...'
        })
    }
}

const postInfoDoctors = async (req, res) => {
    try {
        let response = await doctorService.saveDetailInfoDoctor(req.body)
        return res.status(200).json(response)
    } catch (e) {

        console.log(e)
        res.status(200).json({
            errCode: -1,
            errMessage: 'error from serverdsadsa...'
        })
    }
}

const getDetailDoctorById = async (req, res) => {
    try {
        let info = await doctorService.getDetailDoctorById(req.query.id)
        return res.status(200).json(info)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}

const bulkCreateSchedule = async (req, res) => {
    try {
        let data = await doctorService.bulkCreateSchedule(req.body)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
    }
}

const getScheduleById = async (req, res) => {
    try {
        let response = await doctorService.getScheduleById(req.query.id)
        console.log(req)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
    }
}

const getScheduleDoctorByDate = async (req, res) => {
    try {
        let response = await doctorService.getScheduleDoctorByDate(req.query.doctorId, req.query.date)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getTopDoctorHome,
    getAllDoctors,
    postInfoDoctors,
    getDetailDoctorById,
    bulkCreateSchedule,
    getScheduleById,
    getScheduleDoctorByDate
}