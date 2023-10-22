const Joi = require("joi");

const makeBookingSchema = () => {
    const now = new Date();
    const bookingSchema = Joi.object({
        bookDate: Joi.date().min(
            now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()
        ),
        bookTimeId: Joi.number().required(),
        serviceId: Joi.number().required(),
    }).options({ allowUnknown: true });
    return bookingSchema;
};

exports.makeBookingSchema = makeBookingSchema;

const bookingItemScehema = Joi.object({
    bookedId: Joi.number().required(),
});

exports.bookingItemScehema = bookingItemScehema;
