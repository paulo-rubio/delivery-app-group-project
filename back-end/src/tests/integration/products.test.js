const chai = require("chai");
const sinon = require("sinon");
const app = require("../../api/app");
const { Product } = require("../../database/models");
const chaiHttp = require("chai-http");

const { allProducts } = require('.././mocks/products');

const { expect } = require("chai");

chai.use(chaiHttp);

describe("Route /product", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("GET returns all products", async function () {
    sinon.stub(Product, "findAll").resolves(allProducts);
    const chaiHttpResponse = await chai.request(app).get("/products");
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allProducts);
  });

  it("GET returns return an error in case of database rejection", async function () {
    sinon.stub(Product, "findAll").rejects({ error: 'Error'});
    const chaiHttpResponse = await chai.request(app).get("/products");
    expect(chaiHttpResponse.status).to.be.equal(500);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Ocorreu um erro' });
  });
});
