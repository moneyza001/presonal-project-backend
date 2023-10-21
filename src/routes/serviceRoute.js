const exprees = require("express");
const authenticateMiddleware = require("../middleware/authenticateMiddleware");

const {
    createService,
    getService,
    getAllService,
} = require("../controller/serviceController");

const router = exprees.Router();

router.post("/", authenticateMiddleware, createService);
router.get("/", getService);
router.get("/all", getAllService);

module.exports = router;
