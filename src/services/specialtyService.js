import db from "../models"

const createNewSpecialty = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('check data: ', data)
            if (!data.descriptionHTML || !data.descriptionMarkdown || !data.imageBase64 || !data.name) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing param (!data.descriptionHTML || !data.descriptionMarkdown || !data.imageBase64 || !data.name) '
                })
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessage: 'ok success'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const getAllSpecialties = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll()
            if (data && data.length > 0) {
                data.map((item) => {
                    item.image = new Buffer(item.image, 'base64').toString('binary')
                    return item
                })

            }
            resolve({
                errCode: 0,
                errMessage: 'OK get all specialties',
                data
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailSpecialtyById = (id, location) => {
    return new Promise((async (resolve, reject) => {
        try {
            if (!id || !location) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing (id) || location'
                })
            } else {
                let data = await db.Specialty.findOne({
                    where: { id: id },
                    attributes: ['descriptionHTML', 'descriptionMarkdown', 'name']
                })
                if (data) {
                    let doctorSpecialty = []
                    if (location === 'ALL') {
                        doctorSpecialty = await db.Doctor_Info.findAll({
                            where: {
                                specialtyId: id
                            },
                            attributes: ['provinceId', 'doctorId']
                        })
                    }
                    else {
                        doctorSpecialty = await db.Doctor_Info.findAll({
                            where: {
                                provinceId: location,
                                specialtyId: id
                            },
                            attributes: ['provinceId', 'doctorId']
                        })
                    }
                    data.doctorSpecialty = doctorSpecialty

                } else data = {}
                resolve({
                    errCode: 0,
                    errMessage: `success find a specialty with id = ${id}`,
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    }))
}

module.exports = {
    createNewSpecialty, getAllSpecialties,
    getDetailSpecialtyById
}