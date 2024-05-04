import express from "express";
import { ensureAuthenticate } from "../config/auth.js";
import { name } from "ejs";

const router = express.Router();

//Welcome page
router.get("/", (req, res) => {
  res.render("Welcome");
});

//Dashboard page
router.get("/dashboard", ensureAuthenticate, (req, res) => {
  res.render("dashboard", {
    name: req.user.name,
  });
});

export default router;
