const express = require("express");
const router = express.Router();
router.post("/", (req, res, next) => {
  res.status(404).end('/user not-found')
});
router.post("/:id", (req, res, next) => {
  res.status(404).end('/user not-found')
});
router.put("/:id", (req, res, next) => {
  res.status(404).end('/user not-found')
});
router.delete("/:id", (req, res, next) => {
  res.status(404).end('/user not-found')
});
module.exports = router