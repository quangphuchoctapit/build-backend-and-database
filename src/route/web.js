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
    return app.use("/", router)
}

module.exports = initWebRoutes