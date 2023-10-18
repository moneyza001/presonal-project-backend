const Joi = require("joi");

const bookingSchema = Joi.object({
    bookDate: Joi.date().min("now"),
    bookTime: Joi.string().required(),
    serviceName: Joi.string().required(),
}).options({ allowUnknown: true });

exports.bookingSchema = bookingSchema;
