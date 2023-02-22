const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '20d',
  algorithm: 'HS256',
};

const secretKey = 'secret_key';



module.exports = (user) => jwt.sign(user.dataValues, secretKey, jwtConfig);