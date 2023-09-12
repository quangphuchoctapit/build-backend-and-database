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

module.exports = {
    getTopDoctorHome,

}