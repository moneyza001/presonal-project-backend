const createError = require("../Utilities/createError");
const prisma = require("../model/prisma");
const { makeBookingSchema } = require("../validators/bookValidator");

exports.createBooking = async (req, res, next) => {
    try {
        const { value, error } = makeBookingSchema().validate(req.body);
        if (error) {
            return next(error);
        }
        console.log(value);
        value.userId = req.user.id;

        const { serviceName, ...bookDetail } = value;

        console.log(bookDetail);
        const booking = await prisma.booking.create({
            data: bookDetail,
        });

        const serviceItem = await prisma.service.findFirst({
            where: {
                serviceName,
            },
        });
        await prisma.bookService.create({
            data: {
                bookId: booking.id,
                serviceId: serviceItem.id,
            },
        });

        res.status(200).json({ message: "create success" });
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
            },
        });
        res.status(200).json({ targetBooking });
    } catch (error) {
        next(error);
    }
};
