const {
  ADMIN_ROLE,
  ALL_ROLES,
  USER_ROLE,
  MERCHANT_ROLE,
} = require("../common/Constants");
const { generateOtp } = require("../common/generalHelpers");
const {
  registerUser,
  loginUser,
  findAUser,
} = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const verifyRoles = require("../middlewares/roleMiddleware");

const router = require("express").Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getUser").get(findAUser);

router
  .route("/all")
  .get(authMiddleware, verifyRoles([ADMIN_ROLE, MERCHANT_ROLE]), (req, res) => {
    res.send("jkdfkdjhjk");
  });
module.exports = router;
