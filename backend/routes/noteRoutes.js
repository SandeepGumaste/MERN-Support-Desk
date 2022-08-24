const express = require("express");
const { getNotes } = require("../controllers/noteController");
const router = express.Router({ mergeParams: true });
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getNotes);

module.exports = router;
