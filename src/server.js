require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routes/index");
const server = express();
const { conn } = require("./DB_connection");
const PORT = process.env.PORT || 3001;

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", router);

const startSever = async () => {
  try {
    await conn.sync({ force: false });
    console.log("Sequelize synced successfully");
    server.listen(PORT, () => {
      console.log("Server raised in port " + PORT);
    });
  } catch (err) {
    console.error("Error syncing Sequelize:", err);
  }
};

startSever();
