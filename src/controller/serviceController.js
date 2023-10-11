const prisma = require("../model/prisma");

exports.createService = async (req, res, next) => {
    const service = req.body;
    try {
        await prisma.service.create({
            data: service,
        });

        res.status(201).json({ message: "create complete" });
    } catch (error) {
        next(error);
    }
};
