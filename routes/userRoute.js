import express from "express";

const router = express.Router();

//Login
router.get("/login", (req, res) => {
  res.send("login");
});

//register
router.get("/register", (req, res) => {
  res.send("register");
});

export default router;
