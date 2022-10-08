const express = require("express");
const router = express.Router();
const { SignUp, login, loginCheck, logOut } = require("../controllers/user");
const authMiddleWare = require("../middleware/authMiddleWare");
require("dotenv").config();

//회원가입
router.post("/user/SignUp", SignUp);

// 로그인
router.post("/user/login", login);

// 로그인 체크기능
router.get("/user/loginCheck", authMiddleWare, loginCheck);

//로그아웃
router.get("/user/logOut", authMiddleWare, logOut);

module.exports = router;
