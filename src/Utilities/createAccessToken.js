const jwt = require("jsonwebtoken");

module.exports = (id) => {
    return jwt.sign(
        { userLoginId: id },
        process.env.JWT_SECRET_KEY || "vwe5b32523mrlkqmblkerre",
        { expiresIn: process.env.JWT_EXPIRE }
    );
};
