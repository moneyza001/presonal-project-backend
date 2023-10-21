const express = require("express");

const {
    createBooking,
    getBooking,
    getBookingForAdmin,
    findBookedWithTimeAndHairStylistId,
} = require("../controller/bookController");

const router = express.Router();

router.post("/", createBooking);
router.get("/", getBooking);
router.get("/admin", getBookingForAdmin);
router.post("/booked-item", findBookedWithTimeAndHairStylistId);

module.exports = router;
