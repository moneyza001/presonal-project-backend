const express = require("express");

const {
    createBooking,
    getBooking,
    getBookingForAdmin,
} = require("../controller/bookController");

const router = express.Router();

router.post("/", createBooking);
router.get("/", getBooking);
router.get("/admin", getBookingForAdmin);

module.exports = router;
