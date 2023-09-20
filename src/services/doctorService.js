import db from '../models/index';
require('dotenv').config()
import _ from 'lodash'

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE

let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleId: 'R2' },
                order: [["createdAt", "DESC"]],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: { exclude: ['password', 'image'] }
            })
            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (e) {
            reject(e)
        }
    })
}

const saveDetailInfoDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(inputData.contentHTML)
            if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown
                || !inputData.action) {
                resolve({
                    errCode: 1,
                    errMessage: 'missing parsams!'
                })
            } else {
                if (inputData.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId,
                    })
                } else if (inputData.action === 'EDIT') {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false,
                    })
                    console.log('check raw true: ', doctorMarkdown)

                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = inputData.contentHTML
                        doctorMarkdown.contentMarkdown = inputData.contentMarkdown
                        doctorMarkdown.description = inputData.description
                        doctorMarkdown.createdAt = new Date()
                        await doctorMarkdown.save()
                    }
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Save details succeeded'
                })
            }
            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailDoctorById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing param id'
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId
                    },
                    include: [{
                        model: db.Markdown,
                        attributes: ['description', 'contentHTML', 'contentMarkdown']
                    },
                    {
                        model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi']
                    }
                    ],
                    attributes: {
                        exclude: ['password']
                    },
                    raw: false,
                    nest: true
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary')


                }
                if (!data) data = {}
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let schedule = data.arrSchedule
            let doctorId = data.doctorId
            let date = data.formattedDate
            if (!schedule || !doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map((item) => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE
                        return item
                    })
                }

                //find existing data
                let existing = await db.Schedule.findAll({
                    where: { doctorId: doctorId, date: date },
                    attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                    raw: true
                })

                //conver date
                if (existing && existing.length > 0) {
                    existing = existing.map((item) => {
                        item.date = new Date(item.date).getTime()
                        return item
                    })
                }

                //compare difference 
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && a.date === b.date
                })

                //if there is difference, create
                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate)
                }
                console.log(toCreate)

                // await db.Schedule.bulkCreate(schedule)
                console.log('check data: ', schedule)
                resolve({
                    errCode: 0,
                    errMessage: 'OK bulk create ok'
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

const getScheduleById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing inputId'
                })
            } else {
                let schedule = await db.Schedule.findAll({
                    where: { doctorId: inputId },
                    // attributes: { exclude: ['password', 'image'] }
                })
                resolve({
                    errCode: 0,
                    data: schedule
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'missing param'
                })
            } else {
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        doctorId, date
                    }
                })
                if (!dataSchedule) dataSchedule = []
                resolve({
                    errCode: 0,
                    data: dataSchedule
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getTopDoctorHome,
    getAllDoctors,
    saveDetailInfoDoctor,
    getDetailDoctorById,
    bulkCreateSchedule,
    getScheduleById,
    getScheduleDoctorByDate
}