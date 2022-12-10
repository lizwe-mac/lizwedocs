const express = require("express");
const router = express.Router();
const { setInfo } = require("../controllers/infoController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, setInfo);

module.exports = router;
