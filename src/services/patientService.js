import db from '../models/index';
require('dotenv').config()
import _ from 'lodash'
import emailService from './emailService'
import { v4 as uuidv4 } from 'uuid'

let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result
}

const postBookingAppointment = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.timeType || !data.doctorId || !data.date
                || !data.fullName || !data.address || !data.selectedGender
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing param (!data.email || !data.timeType || !data.doctorId || !data.date || data.fullName)'
                })
            } else {
                let token = uuidv4()

                await emailService.sendSimpleEmail({
                    email: data.email,
                    fullName: data.fullName,
                    timeString: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)
                })
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        roleId: 'R3',
                        address: data.address,
                        gender: data.selectedGender,
                        firstName: data.fullName
                    }
                })
                if (user && user[0]) {
                    await db.booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {

                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
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

const postVerifyBookingAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'missing param(!data.token || !data.doctorId)'
                })
            } else {
                let appointment = await db.booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = 'S2'
                    await appointment.save()
                    resolve({
                        errCode: 0,
                        errMessage: 'Successfully update statusId appointment'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Appointment is not exists or duplicated'
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    postBookingAppointment,
    postVerifyBookingAppointment
}