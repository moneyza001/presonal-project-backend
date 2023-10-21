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

exports.getService = async (req, res, next) => {
    try {
        const service = await prisma.service.findMany({
            take: 6,
        });
        res.status(200).json(service);
    } catch (error) {
        next(error);
    }
};

exports.getAllService = async (req, res, next) => {
    try {
        const allService = await prisma.service.findMany({});
        res.status(200).json(allService);
    } catch (error) {
        next(error);
    }
};
