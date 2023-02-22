const ServiceLogin = require('../services/serviceLogin');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const newLogin = await ServiceLogin.loginService({ email, password });
    if (newLogin.error) {
      return res
        .status(newLogin.error.status)
        .json({ message: newLogin.error.message });
    }
  return res.status(200).json({ message: 'success', response: newLogin });
};

module.exports = { login };
