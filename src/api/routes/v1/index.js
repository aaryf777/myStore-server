const express = require("express");
const router = express.Router();
const productRoute = require('./product.route')


router.get("/status", (req, res) =>
  res.json({
    success: true,
    data: {
      message: "Everything is working fine",
    },
  })
);

router.use("/product", productRoute);

module.exports = router;