import express from "express"
import homeController from '../controllers/homeController'
import homeAbout from '../controllers/homeController'

let router = express.Router()

let initWebRoutes = app => {
    router.get("/", homeController.getHomePage)
    router.get('/about', homeAbout.getAbout)
    router.get("/hoidanit", (req, res) => {
        return res.send("Hello world with ok hoidanit")
    })
    router.get('/crud', homeController.getCRUD)
    router.post('/post-crud', homeController.postCRUD)
    router.get('/get-crud', homeController.displayGetCRUD)
    router.get('/edit-crud', homeController.getEditCRUD)
    router.post('/put-crud', homeController.putCRUD)

    return app.use("/", router)
}

module.exports = initWebRoutes