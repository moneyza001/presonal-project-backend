const createError = require("../Utilities/createError");
const prisma = require("../model/prisma");

exports.createService = async (req, res, next) => {
    const service = req.body;
    try {
        if (req.user.role !== "ADMIN") {
            return next(createError("Command denied", 401));
        }
        await prisma.service.create({
            data: service,
        });

        res.status(201).json({ message: "create complete" });
    } catch (error) {
        next(error);
    }
};
