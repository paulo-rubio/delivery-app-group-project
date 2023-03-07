const chai = require("chai");
const sinon = require("sinon");
const app = require("../../api/app");
const chaiHttp = require("chai-http");
const md5 = require('md5');
const { User } = require('../../database/models');
const jwt = require('jsonwebtoken');

const { expect } = require("chai");

chai.use(chaiHttp);

const successLoginResponse = {
    message: "success",
    response: {
      name: "Dona Tereza",
      email: "adm@hotmail.com",
      role: "administrator",
      id: 4,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRG9uYSBUZXJlemEiLCJlbWFpbCI6ImFkbUBob3RtYWlsLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWQiOjQsImlhdCI6MTY3Njk1NDE4OSwiZXhwIjoxNjc4NjgyMTg5fQ.lKboEAooEJHLUURj_vtoTjliGrdlb-8YJJIzz7n-Dzg",
    },
}

const findOneResponse = {
  id: 4,
  name: "Dona Tereza",
  email: "adm@hotmail.com",
  password: "994242de3894f53ac7bc9d6c56364b2a",
  role: "administrator",
};

describe("Route /login", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("POST should be able to login the user", async function () {
    const login = {
      email: "adm@hotmail.com",
      password: "1234567Aa",
    };
    sinon.stub(User, "findOne").resolves(findOneResponse);
    sinon.stub(jwt, "sign").returns(successLoginResponse.response.token);
    const chaiHttpResponse = await chai.request(app).post("/login").send(login);
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(successLoginResponse);
  });

  it("POST should not log in if email is not in database", async function () {
    const login = {
      email: "not_in_database@hotmail.com",
      password: "1234567Aa",
    };
    sinon.stub(User, "findOne").resolves(null);
    const chaiHttpResponse = await chai.request(app).post("/login").send(login);
    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Not found'});
  });

  it("POST should throw correct error if there is no email in the requisition", async function () {
    sinon.stub(User, "findOne").resolves(null);
    chaiHttpResponse = await chai
      .request(app)
      .post("/login")
      .send({ password: "1234567Aa" });
    expect(chaiHttpResponse.status).to.be.equal(403);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Bad request' });
  });

  it("POST should throw correct error if the email is no in a valid format", async function () {
    sinon.stub(User, "findOne").resolves(findOneResponse);
    chaiHttpResponse = await chai
      .request(app)
      .post("/login")
      .send({ email: "admhotmail.com", password: "1234567Aa" });
    expect(chaiHttpResponse.status).to.be.equal(403);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: "Bad request",
    });
  });

  it("POST should throw correct error if there is no password in the requisition", async function () {
    sinon.stub(User, "findOne").resolves(findOneResponse);
    chaiHttpResponse = await chai
      .request(app)
      .post("/login")
      .send({ email: "adm@hotmail.com" });
    expect(chaiHttpResponse.status).to.be.equal(403);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Bad request' });
  });

  it("POST should throw correct error if the password has invalid length", async function () {
    sinon.stub(User, "findOne").resolves(findOneResponse);
    chaiHttpResponse = await chai
      .request(app)
      .post("/login")
      .send({ email: "adm@hotmail.com", password: "1234567Bb" });
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Wrong password' });
  });

  it("POST should throw correct error if the password is wrong", async function () {
    sinon.stub(User, "findOne").resolves(findOneResponse);
    chaiHttpResponse = await chai
      .request(app)
      .post("/login")
      .send({ email: "adm@hotmail.com", password: "12345" });
    expect(chaiHttpResponse.status).to.be.equal(403);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Bad request' });
  });
});

