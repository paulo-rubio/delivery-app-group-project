const jwt = require('jsonwebtoken');
const { Sale, SalesProduct, User } = require('../database/models');

const decodeToken = async (token) => {
  const decodedToken = jwt.decode(token);
  return decodedToken;
};

const createSaleProducts = async (products, saleId) => {
  Promise.all(
    products.map(async ({ id, quantity }) => {
      await SalesProduct.create({ saleId, productId: id, quantity });
    }),
  );
};

const createSale = async (body, token) => {
  try {
    const decode = await decodeToken(token);
    const { products, ...rest } = body;
    const date = new Date();
    const statusMessage = rest.status || 'Pendente';
    const { dataValues: { id: userId } } = await User
      .findOne({ where: { name: decode.name } });
    const data = await Sale.create({
      ...rest,
      saleDate: date,
      status: statusMessage,
      userId,
    });
    await createSaleProducts(products, data.id);
    return { data };
  } catch (err) {
    console.log(err);
  }
};

const getAllService = async () => {
  const sales = await Sale.findAll();

  return sales;
};

module.exports = {
  createSale,
  getAllService,
};