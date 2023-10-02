import patientService from '../services/patientService'

const postBookingAppointment = async (req, res) => {
    try {
        let response = await patientService.postBookingAppointment(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    postBookingAppointment
}