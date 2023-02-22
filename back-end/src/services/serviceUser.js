const md5 = require('md5');
const jwt = require("jsonwebtoken");
const { User } = require('../database/models');
const { findUserbyEmail } = require('./serviceLogin');

const jwtKey = require("fs").readFileSync("jwt.evaluation.key", {
  encoding: "utf-8",
});

const jwtConfig = {
  expiresIn: "20d",
  algorithm: "HS256",
};

const createService = async ({ name, email, password, role }) => {
  const user = await findUserbyEmail(email)
  if (user) {
    return { error: 'User already registered'}
  }
  const newPassword = md5(password);
  const { dataValues } = await User.create({ name, email, password: newPassword, role });
  console.log(dataValues);
  const token = jwt.sign(dataValues, jwtKey, jwtConfig);
  return { token };
};

const getAllService = async () => {
  const users = await User.findAll();

  return users;
};

const getByIdService = async (id) => {
  const deleteUserId = await User.destroy({ where: { id } });
  return deleteUserId;
};

module.exports = {
  createService,
  getAllService,
  getByIdService,
};