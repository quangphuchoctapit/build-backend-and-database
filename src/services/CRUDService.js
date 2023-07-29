import bcrypt from "bcryptjs"
const salt = bcrypt.genSaltSync(10);
import db from '../models/index'


let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashUserPasswordFromBcrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashUserPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            })

            resolve('ok successfull created new user')

        } catch (e) {
            reject(e)
        }
    })
    console.log('data from service ')
    console.log(data)
    console.log(hashUserPasswordFromBcrypt)
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashUserPassword = await bcrypt.hashSync("password", salt);
            resolve(hashUserPassword);
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewUser: createNewUser
}