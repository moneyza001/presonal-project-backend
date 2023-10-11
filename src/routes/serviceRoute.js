const exprees = require("express");

const { createService } = require("../controller/serviceController");

const router = exprees.Router();

router.post("/", createService);

module.exports = router;
