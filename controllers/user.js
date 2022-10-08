const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

//회원가입 기능
const SignUp = async (req, res) => {
  const { userId, passWord, passWordCheck, nickName } = req.body;

  const form = 'webSite';
  const hashed = bcrypt.hashSync(passWord, 10);
  await User.create({
    userId,
    passWord: hashed,
    passWordCheck: hashed,
    nickName,
  });
  res.status(201).json({ result: '회원가입 성공' });
};

//로그인 기능
const login = async (req, res) => {
  const { userId, passWord } = req.body;
  try {
    const user = await User.findOne({ userId });
    const tokenOptions = { expiresIn: '1d', issuer: 'token' };
    const unHashPw = bcrypt.compareSync(passWord, user.passWord);

    const loginToken = jwt.sign(
      { userId: user.userId },
      process.env.KEY,
      tokenOptions
    );

    res.status(200).json({ result: true, loginToken });
  } catch (error) {
    console.log(error, '로그인 실패');
  }
};

// 로그인 체크기능
const loginCheck = async (req, res) => {
  const { user } = res.locals;
  try {
    res.status(200).json({ result: '로그인 체크 성공' });
  } catch (error) {
    console.log(error, '로그인 체크기능 실패!');
  }
};

// 로그아웃 기능
const logOut = async (req, res) => {
  const { userId } = req.query;
  if (userId) {
    return res
      .cookie('x_auth', '')
      .status(200)
      .json({ result: true, msg: '로그아웃 성공', userId });
  } else {
    res.status(400).json({ result: false, msg: '로그아웃 실패' });
  }
};
module.exports = { SignUp, login, logOut, loginCheck };
