import express from "express";
import { User } from "../models/user.js";
import bcrypt from "bcryptjs";

const router = express.Router();

//Login
router.get("/login", (req, res) => {
  res.render("login");
});

//register
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;

  let error = [];

  if (!name || !email || !password || !password2) {
    error.push({ msg: "Please fill in all fields" });
  }

  if (password !== password2) {
    error.push({ msg: "Password do not match" });
  }

  if (password.length < 6) {
    error.push({ msg: "Password should be at least 6 character" });
  }

  if (error.length > 0) {
    res.render("register", {
      error,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        error.push({ msg: "Email already exist!!" });
        res.render("register", {
          error,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          hashedPassword,
        });

        //hashpassword
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw error;

            newUser.password = hash;
          })
        );
        newUser
          .save()
          .then((user) => {
            res.redirect("/user/login");
          })
          .catch((err) => console.log(err));
      }
    });
  }
});

export default router;
