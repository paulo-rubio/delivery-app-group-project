const jwt = require('jsonwebtoken');
const md5 = require('md5');
const jwtKey = require('fs').readFileSync('jwt.evaluation.key', {
  encoding: 'utf-8',
});
const { User } = require('../database/models/index');

const jwtConfig = {
  expiresIn: '20d',
  algorithm: 'HS256',
};

const secretKey = jwtKey;

const findUserbyEmail = async (email) => User.findOne({
  where: { email },
});

const isBadRequest = ({ email, password }) => {
  const isEmailValid = email && /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = password && password.length >= 6;
  return !(isEmailValid && isPasswordValid);
};

const loginService = async ({ email, password }) => {
  if (isBadRequest({ email, password })) {
    return { error: { message: 'Bad request', status: 403 } };
  }

  const user = await findUserbyEmail(email);

  if (!user) {
    return { error: { message: 'Not found', status: 404 } };
  }

  if (user.password !== md5(password)) {
    return { error: { message: 'Wrong password', status: 401 } };
  }

  const response = {
    name: user.name, email: user.email, role: user.role, id: user.id,
  };
  
  const token = jwt.sign(response, secretKey, jwtConfig);

  return { ...response, token };
};

module.exports = {
  loginService,
  findUserbyEmail,
};
