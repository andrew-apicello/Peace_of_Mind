const router = require("express").Router();
const routes = require("./patients");

// Patients routes
router.use("/", routes);

module.exports = router;