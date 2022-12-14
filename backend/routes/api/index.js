const router = require('express').Router()
// const swaggerUI = require("swagger-ui-express");
// const swaggerDoc = require("../../../swagger.json");

// router.use("/docs", swaggerUI.serve);
// router.get("/docs", swaggerUI.setup(swaggerDoc));

router.use('/user', require('./user'))
router.use('/post', require('./post'))
router.use('/message', require('./message'))
router.use('/notification', require('./notification'))

module.exports = router

