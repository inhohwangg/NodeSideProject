const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || "").split(" ");

  if (!authToken || authType !== "Bearer") {
    res.status(400).send({
      errorMessage: "로그인 후 이용 가능합니다.",
    });
    return;
  }
  try {
    const { userId } = jwt.verify(authToken, process.env.KEY);
    User.findByPk(userId).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (error) {
    console.log(error, "사용자 인증 미들웨어 오류");
    res.status(401).json({ result: "토큰이 유효하지 않습니다." });
    return;
  }
};
