require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

const authRoute = require("./routes/authRoute");
const serviceRoute = require("./routes/serviceRoute");
const errorMiddleware = require("./middleware/errorMiddleware");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const authenticateMiddleware = require("./middleware/authenticateMiddleware");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRoute);
app.use("/service", authenticateMiddleware, serviceRoute);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server run in port ${PORT} `));
