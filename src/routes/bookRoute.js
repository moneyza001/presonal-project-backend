const express = require("express");

const { createBooking, getBooking } = require("../controller/bookController");

const router = express.Router();

router.post("/", createBooking);
router.get("/", getBooking);

module.exports = router;
