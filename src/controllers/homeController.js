import db from '../models/index'
import CRUDService from '../services/CRUDservice'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    }
    catch (e) {
        console.log(e)
    }

}

let getAbout = (req, res) => {
    return res.render('test/about.ejs')
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body)
    // console.log(message)
    return res.send('post crud from server')
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser()
    // console.log('------------------------------')
    // console.log(data)
    // console.log('------------------------------')
    return res.render('displayCRUD', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId)
        console.log('---------------')
        console.log(userData)
        console.log('---------------')
        return res.render('editCRUD.ejs', {
            user: userData
        })

    } else {
        return res.send('User not found')

    }
}

let putCRUD = async (req, res) => {
    let data = req.body
    let allUsers = await CRUDService.updateUserData(data)
    return res.render('displayCRUD', {
        dataTable: allUsers
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id
    if (id) {
        await CRUDService.deleteUserById(id)
        res.send('Successfully deleted user')
    }
    else {
        res.send('Failed to delete user')
    }
}

module.exports = {
    getHomePage: getHomePage,
    getAbout: getAbout,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}