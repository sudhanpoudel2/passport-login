import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import bodyParser from "body-parser";

const app = express();
app.use(expressEjsLayouts);
app.set("view engine", "ejs");
// app.use(bodyParser.json());

//Route
import indexRouter from "./routes/indexRoute.js";
app.use("/", indexRouter);
import userRouter from "./routes/userRoute.js";
app.use("/user", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
