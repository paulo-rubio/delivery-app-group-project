const chai = require("chai");
const sinon = require("sinon");
const app = require("../../api/app");
const chaiHttp = require("chai-http");
const { expect } = require("chai");
const jwt = require("jsonwebtoken");
const { Sale, User, SalesProduct } = require("../../database/models");

chai.use(chaiHttp);

jwtVerifyMock = {
  name: "Dona Tereza",
  email: "adm@hotmail.com",
  role: "administrator",
  id: 4,
  iat: 1677094891,
  exp: 1678822891,
};

jwtVerifySellerMock = {
  name: "Dona Tereza",
  email: "adm@hotmail.com",
  role: "seller",
  id: 4,
  iat: 1677094891,
  exp: 1678822891,
};

userFindOneMock = {
  dataValues: {
    id: 14,
    name: 'Thiago Barbosa',
    email: 'tryber@cliente.com',
    password: 'fb8a178b66eae52f24cd96174a50aac4',
    role: 'customer'
  }
}

const mockSale = [{ id: 1, foo: "bar" }, { id: 2, fizz: "buzz" }];

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRG9uYSBUZXJlemEiLCJlbWFpbCI6ImFkbUBob3RtYWlsLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjc1Mjk2Njg1LCJleHAiOjE2NzcwMjQ2ODV9.RDRygMxjKLNVnPj55AUNAG4wjYxd6MLtNBB4Tg67Eis";


const decodeMock = {
  name: "Cliente zika",
  email: "cliente@hotmail.com",
  role: "customer",
  id: 5,
  iat: 1677099834,
  exp: 1678827834,
};

const findOneUserMock = {
  dataValues: {
    id: 5,
    name: 'Cliente zika',
    email: 'cliente@hotmail.com',
    password: '0dced281d75c3f1d2352bb28454ebc46',
    role: 'customer'
  }
}

const saleCreateMock = {
  dataValues: {
    id: 1,
    deliveryAddress: 'Loteamento Caribe',
    deliveryNumber: '42',
    totalPrice: 17.2,
    sellerId: 2,
    saleDate: "2023-02-22T21:04:21.000Z",
    status: 'Pendente',
    userId: 5
  }
}

const salesProductMockOne = {
  dataValues: { saleId: 1, productId: 1, quantity: 1 }
}
const salesProductMockTwo = {
  dataValues: { saleId: 2, productId: 2, quantity: 2 }
}

const saleBodyMock = {
  deliveryAddress: 'Loteamento Caribe',
  deliveryNumber: '42',
  totalPrice: 17.2,
  products: [
    {
      id: 1,
      name: 'Skol Lata 250ml',
      price: '2.20',
      urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      quantity: 1
    },
    {
      id: 2,
      name: 'Heineken 600ml',
      price: '7.50',
      urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
      quantity: 2
    }
  ],
  sellerId: 2
}

const updateSaleBeforeMock = [
  {
    dataValues: {
      status: 'Pendente',
    }
  }
]

const updateSaleAfterMock = [
  {
    dataValues: {
      status: 'Preparando',
    }
  }
]

describe('Route /checkout', () => {
  afterEach(function () {
    sinon.restore();
  });
  it('GET should bring all sales as non-seller', async () => {
    sinon.stub(jwt, "verify").returns(jwtVerifyMock);
    sinon.stub(Sale, "findAll").resolves(mockSale);
    const chaiHttpResponse = await chai
      .request(app)
      .get('/checkout')
      .set('authorization', token)

    expect(chaiHttpResponse.status).to.be.equal(200);
  });
  it('GET should bring all sales as a seller', async () => {
    sinon.stub(jwt, "verify").returns(jwtVerifySellerMock);
    sinon.stub(Sale, "findAll").resolves(mockSale);
    const chaiHttpResponse = await chai
      .request(app)
      .get('/checkout')
      .set('authorization', token)

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('/customer/orders GET should bring one sale', async () => {
    sinon.stub(Sale, "findAll").resolves(mockSale);
    const chaiHttpResponse = await chai
      .request(app)
      .get("/customer/orders/1")

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it("/customer/orders GET should reject with the appropriate error" , async () => {
    sinon.stub(Sale, "findAll").rejects(mockSale);
    const chaiHttpResponse = await chai.request(app).get("/customer/orders/1");

    expect(chaiHttpResponse.status).to.be.equal(500);
  });

  it("/customer/checkout POST" , async () => {
    sinon.stub(jwt, "decode").returns(decodeMock);
    sinon.stub(User, "findOne").resolves(findOneUserMock);
    sinon.stub(Sale, "create").resolves(saleCreateMock);
    sinon
      .stub(SalesProduct, "create")
      .onCall(1)
      .resolves(salesProductMockOne)
      .onCall(2)
      .resolves(salesProductMockTwo);
    const chaiHttpResponse = await chai
      .request(app)
      .post("/customer/checkout")
      .send(saleBodyMock);
    expect(chaiHttpResponse.status).to.be.equal(201);
  });

  it.only('PUT should work', async () => {
    sinon.stub(Sale, "findByPk").resolves(updateSaleBeforeMock);
    sinon.stub(Sale, "update").resolves({});
    sinon.stub(Sale, "findAll").resolves(updateSaleAfterMock);
    const chaiHttpResponse = await chai
    .request(app)
    .put('/checkout/1')
    .set('Authorization', token)
    .send({ status: "Preparando" });

    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});