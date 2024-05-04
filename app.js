import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import bodyParser from "body-parser";
import { dbConnection } from "./database/db.js";
import flash from "connect-flash";
import session from "express-session";

const app = express();

//EJS
app.use(expressEjsLayouts);
app.set("view engine", "ejs");
// app.use(bodyParser.json());

// Bodyparser
app.use(express.urlencoded({ extended: false }));

//Express Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//connect flash
app.use(flash());

//global variable
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//password middleware
app.use(passport.initialize());
app.use(passport.session());

//Route
import indexRouter from "./routes/indexRoute.js";
app.use("/", indexRouter);
import userRouter from "./routes/userRoute.js";
import passport from "passport";
app.use("/users", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
