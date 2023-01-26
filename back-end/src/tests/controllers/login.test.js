const chai = require("chai");
const sinon = require("sinon");
const app = require("../../api/app");
const chaiHttp = require("chai-http");
const md5 = require('md5');
const { User } = require('../../database/models');


const { expect } = require("chai");

chai.use(chaiHttp);

describe("testing login endpoint", function () {
  let chaiHttpResponse;

    const fakeValidUser = {
    email: 'qlremail@teste.com',
    password: md5('fulana@123'),
    name: "Fulana Pereira"
  }
  it("its not possible to login with wrong user", async function () {
    chaiHttpResponse = await chai
      .request(app)
      .post("/login")
      .send({ email: "fulano@gmail.com", password: "fulana@123" });
console.log(chaiHttpResponse)
    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: "user not found",
    });
  });

  it("its not possible to login with wrong password", async function () {
    chaiHttpResponse = await chai
      .request(app)
      .post("/login")
      .send({ email: "fulana@deliveryapp.com", password: "1234567" });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: "wrong password",
    });
  });

  it("its not possible to login with invalid email format", async function () {
    chaiHttpResponse = await chai
      .request(app)
      .post("/login")
      .send({ email: ".com@", password: "1234567" });

    expect(chaiHttpResponse.status).to.be.equal(403);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: "bad request" });
  });

  it("its not possible to login with invalid password length", async function () {
    chaiHttpResponse = await chai
      .request(app)
      .post("/login")
      .send({ email: "fulana@deliveryapp.com", password: "123" });

    expect(chaiHttpResponse.status).to.be.equal(403);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: "bad request" });
  });
  it("login successful with correct information", async function () {
   

    sinon.stub(User, 'findOne').resolves(fakeValidUser)
    chaiHttpResponse = await chai
      .request(app)
      .post("/login")
      .send({ email: "fulana@deliveryapp.com", password: "fulana@123" });
   
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.response.name).to.be.equal("Fulana Pereira");
  });
  afterEach(function () {
    sinon.restore();
  });
});
