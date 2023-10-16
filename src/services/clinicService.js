
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

// const getDetailClinicById = (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             if (!id) {
//                 resolve({
//                     errCode: 1,
//                     errMessage: 'Missing (id)'
//                 })
//             } else {
//                 let data = await db.Clinic.findOne({
//                     where: { id: id },
//                     attributes: ['descriptionHTML', 'descriptionMarkdown', 'name', 'address']
//                 })
//                 if (data) {
//                     let doctorClinic = []
//                     doctorClinic = await db.Doctor_Info.findAll({
//                         where: {
//                             clinicId: id
//                         },
//                         attributes: ['doctorId']
//                     })
//                     data.doctorClinic = doctorClinic

//                 } else data = {}
//                 resolve({
//                     errCode: 0,
//                     errMessage: `success find a clinic with id = ${id}`,
//                     data: data
//                 })
//             }
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

const getDetailClinicById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'missing param id'
                })
            } else {
                let dataClinic = await db.Clinic.findOne({
                    where: { id: id },
                    attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkdown', 'image']
                })
                if (dataClinic) {
                    if (dataClinic && dataClinic.image) {
                        dataClinic.image = new Buffer(dataClinic.image, 'base64').toString('binary')
                    }

                    let doctorClinic = []
                    doctorClinic = await db.Doctor_Info.findAll({
                        where: {
                            clinicId: id
                        },
                        attributes: ['doctorId']
                    })
                    dataClinic.doctorClinic = doctorClinic
                }
                else dataClinic = {}
                resolve({
                    errCode: 0,
                    errMessage: `ok find all doctos with id = ${id}`,
                    data: dataClinic
                })
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