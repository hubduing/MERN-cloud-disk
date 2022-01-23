// npm i mongoose
// npm i config express
// npm i -D nodemon
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.routes");
const fileRouter = require("./routes/file.routes");
const app = express();
// порт получаем с помощью config из файла ../config/default.json обращаясь по полям
const PORT = config.get("serverPort");
// мидлвэр для разрешения cors на сервере
const corsMiddleware = require("./middleware/cors.middleware");

// указываем в методе use() url по которому будет обрабатываться router
app.use(corsMiddleware);
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);

const start = async () => {
  try {
    await mongoose.connect(config.get("dbUrl"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log("Server started on port ", PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
