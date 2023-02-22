const jwt = require('jsonwebtoken');
const { Sale, SalesProduct, User, Product } = require('../database/models');

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
    const {
      dataValues: { id: userId },
    } = await User.findOne({ where: { name: decode.name } });
    const data = await Sale.create({ ...rest, saleDate: date, status: statusMessage, userId });
    await createSaleProducts(products, data.id);
    return { data };
  } catch (err) {
    console.log('err');
  }
};

const getAllService = async (id, role) => {
  try {
    if (role === 'seller') {
      const sales = await Sale.findAll();
      return sales;
    }
    const sales = await Sale.findAll({ where: { userId: id } });
    return sales;
  } catch (error) {
    throw new Error(error);
  }
};

const getOneService = async (id) => {
  const sales = await Sale.findAll({
    where: { id },
    include: [
      { model: Product, as: 'products' },
      { model: User, as: 'seller' },
    ],
  });
  return sales;
};

const updateStatusService = async (id, status) => {
  try {
    const sale = await Sale.findByPk(id);
    await sale.update(
      { status },
      {
        where: { id },
      },
    );
    const updatedSale = await getOneService(id);
    return updatedSale;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createSale,
  getAllService,
  getOneService,
  updateStatusService,
};
