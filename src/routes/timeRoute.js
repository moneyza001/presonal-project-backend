const express = require("express");

const router = express.Router();

const {
    createBookingTime,
    getBookingTime,
} = require("../controller/timeController");

router.post("/", createBookingTime);

router.get("/", getBookingTime);

module.exports = router;
