import LocalStrategy from "passport-local";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models/user.js";

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //Match User
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "That email is not register" });
          }

          //match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
    // process.nextTick(function() {
    //   cb(null, { id: user.id, username: user.username });
    // });
  });

  passport.deserializeUser(function (user, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
