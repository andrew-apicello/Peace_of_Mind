const router = require("express").Router();
const controller = require("../../db/controllers/controller");

router.route("/")
  .get(controller.findAll)


module.exports = router;