const express = require('express');
const app = require('express')();
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
app.use(cors());

// DB 연결 확인
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터 베이스 연결 성공');
  })
  .catch((error) => {
    console.log(error);
    console.log('데이터 베이스 연결 실패...');
  });

// 라우터 불러오기
const userRouter = require('./routers/user');

// 각종 미들웨어
app.use(express.json());
app.use(express.urlencoded());
app.use(express.urlencoded({ extends: false }));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(helmet());

//라우터 연결하기
app.use('/api', [userRouter]);

app.get('/', (req, res) => {
  res.status(200).json({ result: '조회성공' });
});

app.listen(3000, () => {
  console.log('3000포트로 서버가 켜졌습니다.');
});
