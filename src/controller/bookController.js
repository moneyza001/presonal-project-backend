const createError = require("../Utilities/createError");
const prisma = require("../model/prisma");
const {
    makeBookingSchema,
    makeBookingSchemaForEdit,
} = require("../validators/bookValidator");
const { bookingItemScehema } = require("../validators/bookValidator");

exports.createBooking = async (req, res, next) => {
    try {
        const { value, error } = makeBookingSchema().validate(req.body);
        if (error) {
            return next(error);
        }
        value.userId = req.user.id;
        const { serviceId, ...bookingDetail } = value;

        bookingDetail.hairStylistId = +bookingDetail.hairStylistId;

        const findBooked = await prisma.booking.findFirst({
            where: bookingDetail,
        });

        if (findBooked) {
            return res
                .status(400)
                .json({ message: "วันและเวลาดังกล่าวได้ภูกจองไว้แล้ว" });
        }

        if (!findBooked && req.user.role === "USER") {
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
        return res.status(400).json({ message: "ADMIN CANT BOOK!!" });
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
            orderBy: {
                bookDate: "asc",
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
                bookTimeId: "desc",
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

        if (error) {
            return next(error);
        }

        const bookedItem = await prisma.booking.findFirst({
            where: {
                id: value.bookedId,
                userId: req.user.id,
            },
        });

        if (!bookedItem) {
            return next(createError("can not delete booking "));
        }

        if (bookedItem.status === "ACCEPTED") {
            return res.status(400).json({ message: "can not delete booked" });
        }

        if (bookedItem.status !== "ACCEPTED") {
            await prisma.booking.delete({
                where: {
                    id: bookedItem.id,
                },
            });
            return res.status(200).json({ message: "delete success" });
        }
    } catch (error) {
        next(error);
    }
};

exports.editBookingForUser = async (req, res, next) => {
    try {
        if (new Date(req.body.bookDate) < new Date()) {
            next(createError("exist date"));
        }
        const { value, error } = bookingItemScehema.validate(req.params);
        const { value: value2, error: error2 } =
            makeBookingSchemaForEdit().validate(req.body);

        const { serviceId } = value2;
        delete value2.serviceId;

        if (error) {
            return next(createError("Can not edit this booking"));
        }
        if (error2) {
            return next(createError("โปรดกรอกข้อมูลให้ครบถ้วน"), 400);
        }

        const bookedItem = await prisma.booking.findFirst({
            where: {
                id: value.bookedId,
                userId: req.user.id,
            },
        });

        if (!bookedItem) {
            return next(createError("can not edit booking "));
        }

        if (
            bookedItem.status === "ACCEPTED" ||
            bookedItem.status === "DENINED"
        ) {
            return res.status(400).json({ message: "can not edit booked" });
        }

        const newBookedItem = await prisma.booking.update({
            data: value2,
            where: {
                id: bookedItem.id,
            },
        });

        const findBookServiceWithBookId = await prisma.bookService.findFirst({
            where: {
                bookId: bookedItem.id,
            },
        });

        await prisma.bookService.update({
            data: {
                serviceId: serviceId,
            },
            where: {
                id: findBookServiceWithBookId.id,
            },
        });

        res.status(200).json(newBookedItem);
    } catch (error) {
        next(error);
    }
};

exports.editStatusBookingForAdmin = async (req, res, next) => {
    try {
        const { value, error } = bookingItemScehema.validate(req.params);
        const { status } = req.body;
        if (error) {
            return next(error);
        }
        const bookedItem = await prisma.booking.findFirst({
            where: {
                id: value.bookedId,
                hairStylistId: req.user.id,
            },
        });

        if (!bookedItem) {
            return next(createError("can not edit booking "));
        }

        await prisma.booking.update({
            data: { status },
            where: bookedItem,
        });

        res.status(200).json({ message: "Edit Success" });
    } catch (error) {
        next(error);
    }
};
