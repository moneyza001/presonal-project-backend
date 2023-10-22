const createError = require("../Utilities/createError");
const prisma = require("../model/prisma");
const { makeBookingSchema } = require("../validators/bookValidator");
const { bookingItemScehema } = require("../validators/bookValidator");

exports.createBooking = async (req, res, next) => {
    try {
        const { value, error } = makeBookingSchema().validate(req.body);
        if (error) {
            return next(error);
        }
        value.userId = req.user.id;
        const { serviceId, ...bookingDetail } = value;

        const findBooked = await prisma.booking.findFirst({
            where: bookingDetail,
        });

        if (!findBooked) {
            const booking = await prisma.booking.create({
                data: bookingDetail,
            });

            await prisma.bookService.create({
                data: {
                    bookId: booking.id,
                    serviceId,
                },
            });
            return res.status(200).json({ message: "Create success" });
        }
    } catch (error) {
        next(error);
    }
};

exports.getBooking = async (req, res, next) => {
    try {
        const targetBooking = await prisma.booking.findMany({
            where: {
                userId: req.user.id,
            },
            include: {
                hairStylist: {
                    select: {
                        hairStylistName: true,
                    },
                },
                bookService: {
                    include: {
                        service: {
                            select: {
                                serviceName: true,
                            },
                        },
                    },
                },
                bookTime: {
                    select: { bookTime: true },
                },
            },
        });
        res.status(200).json(targetBooking);
    } catch (error) {
        next(error);
    }
};

exports.getBookingForAdmin = async (req, res, next) => {
    try {
        const targetBooking = await prisma.booking.findMany({
            where: {
                hairStylistId: req.user.id,
            },
            include: {
                hairStylist: {
                    select: {
                        hairStylistName: true,
                    },
                },
                bookService: {
                    include: {
                        service: {
                            select: {
                                serviceName: true,
                            },
                        },
                    },
                },
                user: {
                    include: {
                        memberInfomation: true,
                    },
                },
                bookTime: {
                    select: { bookTime: true },
                },
            },
            orderBy: {
                bookDate: "asc",
            },
        });
        res.status(200).json(targetBooking);
    } catch (error) {
        next(error);
    }
};

exports.findBookedWithTimeAndHairStylistId = async (req, res, next) => {
    const { bookDate, hairStylistId } = req.body;
    try {
        const newBookDate = new Date(bookDate);
        const bookedItem = await prisma.booking.findMany({
            where: {
                AND: [
                    { bookDate: newBookDate },
                    { hairStylistId: +hairStylistId },
                ],
            },
        });
        res.status(200).json(bookedItem);
    } catch (error) {
        next(error);
    }
};

exports.deleteBooking = async (req, res, next) => {
    try {
        const { value, error } = bookingItemScehema.validate(req.params);
        console.log(value);
        if (error) {
            return next(error);
        }
        const bookedItem = await prisma.booking.findFirst({
            where: {
                id: value.bookId,
                userId: req.user.id,
            },
        });
        if (!bookedItem) {
            return next(createError("can not delete booking "));
        }

        await prisma.booking.delete({
            where: {
                id: bookedItem.id,
            },
        });
        res.status(200).json({ message: "delete success" });
    } catch (error) {
        next(error);
    }
};

exports.editBookingForUser = async (req, res, next) => {
    try {
        const { value, error } = bookingItemScehema.validate(req.params);
        if (error) {
            return next(createError("Can not edit this booking"));
        }
        const bookedItem = await prisma.booking.findFirst({
            where: {
                id: value.bookId,
                userId: req.user.id,
            },
        });
        res.status(200).json(bookedItem);
    } catch (error) {
        next(error);
    }
};
