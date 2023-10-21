const createError = require("../Utilities/createError");
const prisma = require("../model/prisma");

exports.createBookingTime = async (req, res, next) => {
    const time = req.body;
    try {
        if (req.user.role !== "ADMIN") {
            return next(createError("Command denied", 401));
        }
        const bookTime = await prisma.bookTime.create({
            data: time,
        });
        res.status(201).json(bookTime);
    } catch (error) {
        next(error);
    }
};

exports.getBookingTime = async (req, res, next) => {
    try {
        const bookingTime = await prisma.bookTime.findMany();
        res.status(200).json(bookingTime);
    } catch (error) {
        next(error);
    }
};
