const { ADMIN_ROLE, ALL_ROLES } = require("../common/Constants");
const { createEvent, updateEvent } = require("../controllers/eventController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const verifyRoles = require("../middlewares/roleMiddleware");

const router = require("express").Router();

router.post("/", authMiddleware, verifyRoles(ADMIN_ROLE), createEvent);
router.put("/update/:id", authMiddleware, verifyRoles(ALL_ROLES), updateEvent);

module.exports = router;
