
import e from "express"
import db from "../models"

const createNewClinic = inputData => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.image || !inputData.address || !inputData.name
                || !inputData.descriptionHTML || !inputData.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'missing param (!data.imageBase64 || !data.address || !data.name || !data.descriptionHTML || !data.descriptionMarkdown)'
                })
            } else {
                let data = await db.Clinic.create({
                    name: inputData.name,
                    address: inputData.address,
                    image: inputData.image,
                    descriptionHTML: inputData.descriptionHTML,
                    descriptionMarkdown: inputData.descriptionMarkdown,
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Successfully created Clinc',
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll()
            if (data && data.length > 0) {
                data.map((item) => {
                    item.image = new Buffer(item.image, 'base64').toString('binary')
                    return (
                        item
                    )
                })
                resolve({
                    errCode: 0,
                    errMessage: 'successfully get all clinics',
                    data
                })
            } else {
                resolve({
                    errCode: 0,
                    errMessage: 'failed get all clinics',
                    data
                })

            }
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'missing req.query.id'
                })
            }
            else {
                let data = await db.Clinic.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkdown', 'image']
                })
                if (data) {
                    if (data && data.image) {
                        data.image = new Buffer(data.image, 'base64').toString('binary')
                    }
                    resolve({
                        errCode: 0,
                        errMessage: `ok success get detail clinicId = ${inputId}`,
                        data: data
                    })
                }
                else {
                    resolve({
                        errCode: 2,
                        errMessage: 'failed, no data found'
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewClinic,
    getAllClinic, getDetailClinicById
}