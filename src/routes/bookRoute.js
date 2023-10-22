const express = require("express");

const {
    createBooking,
    getBooking,
    getBookingForAdmin,
    findBookedWithTimeAndHairStylistId,
    deleteBooking,
} = require("../controller/bookController");

const router = express.Router();

router.post("/", createBooking);
router.get("/", getBooking);
router.get("/admin", getBookingForAdmin);
router.post("/booked-item", findBookedWithTimeAndHairStylistId);
router.delete("/:bookedId", deleteBooking);

module.exports = router;
