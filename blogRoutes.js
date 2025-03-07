const express = require("express");
const router = express.Router();
const blogs = require("./BlogData");

router.get("/blogs", (req, res) => {
  res.json(blogs);
});

module.exports = router;
