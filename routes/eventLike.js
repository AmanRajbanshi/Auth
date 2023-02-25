const { ALL_ROLES } = require("../common/Constants");
const { createALike } = require("../controllers/eventLikeController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const verifyRoles = require("../middlewares/roleMiddleware");

const router = require("express").Router();

router.put("/:eventId", authMiddleware, verifyRoles(ALL_ROLES), createALike);
module.exports = router;
