
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


module.exports = {
    createNewClinic
}