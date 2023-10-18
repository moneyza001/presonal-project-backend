const exprees = require("express");
const authenticateMiddleware = require("../middleware/authenticateMiddleware");

const {
    createService,
    getService,
} = require("../controller/serviceController");

const router = exprees.Router();

router.post("/", authenticateMiddleware, createService);
router.get("/", getService);

module.exports = router;
