const { ADMIN_ROLE } = require("../common/Constants");
const { createEvent } = require("../controllers/eventController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const verifyRoles = require("../middlewares/roleMiddleware");

const router = require("express").Router();

router.post("/", authMiddleware, verifyRoles(ADMIN_ROLE), createEvent);

module.exports = router;
