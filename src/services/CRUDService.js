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
            let hashUserPassword = await bcrypt.hashSync(password, salt);
            resolve(hashUserPassword);
        } catch (e) {
            reject(e)
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({ raw: true })
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }, raw: true
            })
            if (user) {
                resolve(user)
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address
                await user.save()

                let allUsers = await db.User.findAll()
                resolve(allUsers)
            } else {
                resolve()
            }
            await db.User.update({

            })
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                await user.destroy()
            }
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}