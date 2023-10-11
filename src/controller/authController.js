const bcrypt = require("bcryptjs");
const prisma = require("../model/prisma");
const createError = require("../Utilities/createError");
const { registerSchema, loginSchema } = require("../validators/authValidator");
const createAccessToken = require("../Utilities/createAccessToken");

exports.register = async (req, res, next) => {
    try {
        const { value, error } = registerSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        const { email, password, role, ...personalInfo } = value;
        const hashPassword = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({
            data: { email, password: hashPassword, role },
        });
        personalInfo.userId = user.id;
        if (role === "USER") {
            await prisma.memberInfomation.create({
                data: personalInfo,
            });
        }
        if (role === "ADMIN") {
            await prisma.hairStyleList.create({
                data: {
                    hairStylistName: personalInfo.firstName,
                    userId: user.id,
                },
            });
        }
        delete user.password;
        const accessToken = createAccessToken(user.id);
        res.status(201).json({ user, personalInfo, accessToken });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { value, error } = loginSchema.validate(req.body);
        if (error) {
            error.statusCode = 400;
            return next(error);
        }
        const user = await prisma.user.findUnique({
            where: { email: value.email },
        });
        if (!user) {
            return next(createError("Invalid creadential", 400));
        }
        const isMatch = await bcrypt.compare(value.password, user.password);
        if (!isMatch) {
            return next(createError("Invalid creadential", 400));
        }
        delete user.password;
        const accessToken = createAccessToken(user.id);
        res.status(200).json({ user, accessToken });
    } catch (error) {
        next(error);
    }
};
