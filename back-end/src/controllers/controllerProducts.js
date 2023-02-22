const ServiceProducts = require('../services/serviceProducts');

const getAll = async (_req, res) => {
  try {
    const products = await ServiceProducts.getAllService();
    return res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

module.exports = {
  getAll,
};