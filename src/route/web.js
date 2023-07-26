import express from "express"

let router = express.Router()

let initWebRoutes = app => {
    router.get("/", (req, res) => {
        return res.send("Hello world with ok")
    })
    router.get("/hoidanit", (req, res) => {
        return res.send("Hello world with ok hoidanit")
    })
    return app.use("/", router)
}

module.exports = initWebRoutes