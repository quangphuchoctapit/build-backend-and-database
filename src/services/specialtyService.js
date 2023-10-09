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

module.exports = {
    createNewSpecialty
}