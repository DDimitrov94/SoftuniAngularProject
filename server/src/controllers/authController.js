const router = require("express").Router();

const { isAuth, isGuest } = require("../middlewares/authMiddleware");
const authService = require("../services/authService");
const userService = require("../services/userService");
const { getErrorMessage } = require("../utils/errorHandle");

router.get("/userInfo", async (req, res) => {
  const userId = req.user?._id;
  
  try {
    const user = await userService.getInfo(userId)

    res.json(user);
  } catch (err) {
    res.json({message: err.message, status: false});
  }
});


router.post("/register", async (req, res) => {
  const userData = req.body;
  console.log(userData);

  try {
    const [token, user] = await authService.register(userData);

    res.cookie("token", token);
    res.json(user);

  } catch (err) {
    res.status(401).json({message: err.message, status: false});
  }
});

router.post("/login", async (req, res) => {
  const loginData = req.body;

  try {
    const [token, user] = await authService.login(loginData);

    res.cookie("token", token);
    res.json(user)

  } catch (err) {
    res.status(401).json({message: err.message, status: false});
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.end()
});

module.exports = router;
