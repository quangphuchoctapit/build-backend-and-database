import db from '../models/index';
require('dotenv').config()
import _ from 'lodash'
import emailService from './emailService'

const postBookingAppointment = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.timeType || !data.doctorId || !data.date
                || !data.fullName
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing param (!data.email || !data.timeType || !data.doctorId || !data.date || data.fullName)'
                })
            } else {
                await emailService.sendSimpleEmail({
                    email: data.email,
                    fullName: data.fullName,
                    timeString: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: 'ok'
                })
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    roleId: 'R3'
                })
                if (user && user[0]) {
                    await db.booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {

                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            // date: data.date,
                            timeType: data.timeType,
                        }
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'find or create user succeeded'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    postBookingAppointment
}