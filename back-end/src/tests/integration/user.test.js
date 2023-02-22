const jwt = require('jsonwebtoken');
const chai = require('chai');
const sinon = require("sinon");
const app = require('../../api/app');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const { allUsers } = require('../mocks/user');
const { User } = require("../../database/models");

chai.use(chaiHttp);

describe('Route /users', () => {
  afterEach(function () {
    sinon.restore();
  });

  it('GET is possible to receive the data in the', async () => {
    sinon.stub(User, "findAll").resolves(allUsers);
    const chaiHttpResponse = await chai
      .request(app)
      .get('/users')
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allUsers)
  })

  it('GET returns an error if promise is rejected', async () => {
    sinon.stub(User, "findAll").rejects();
    const chaiHttpResponse = await chai
      .request(app)
      .get('/users')
    expect(chaiHttpResponse.status).to.be.equal(500);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Ocorreu um erro' })
  })

  it('DELETE should work as intended', async () => {
    sinon.stub(User, "destroy").resolves();
    const chaiHttpResponse = await chai
      .request(app)
      .delete('/users')
      .send({ id: '4' })
    expect(chaiHttpResponse.status).to.be.equal(200);
  })

  it('DELETE should throw an error if promise is rejected', async () => {
    sinon.stub(User, "destroy").rejects();
    const chaiHttpResponse = await chai
      .request(app)
      .delete('/users')
      .send({ id: '4' })
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Ocorreu um erro' })
  })
  it('is possible to create an user', async () => {
    sinon.stub(User, "create").resolves({});
    sinon.stub(User, "findOne").resolves(null);
    sinon.stub(jwt, "sign").returns('token_valido');
    const chaiHttpResponse = await chai
      .request(app)
      .post('/users')
      .send({ name: 'Zequinha', email: 'foo@bar.com', password: 'fizzbuzz' })
    expect(chaiHttpResponse.status).to.be.equal(201)
    expect(chaiHttpResponse.body).to.be.deep.equal({ response: { token: 'token_valido'} })
  })

  it('user already exists', async () => {
    sinon.stub(User, "create").resolves({ email: 'foo@bar.com' });
    sinon.stub(User, "findOne").resolves({ email: "foo@bar.com" });
    sinon.stub(jwt, "sign").returns('token_valido');
    const chaiHttpResponse = await chai
      .request(app)
      .post('/users')
      .send({ name: 'Zequinha', email: 'foo@bar.com', password: 'fizzbuzz' })
    expect(chaiHttpResponse.status).to.be.equal(409)
    expect(chaiHttpResponse.body).to.be.deep.equal({ error: "User already registered" })
  })

  it('user already exists', async () => {
    sinon.stub(User, "create").resolves({ email: 'foo@bar.com' });
    sinon.stub(User, "findOne").resolves({ email: "foo@bar.com" });
    sinon.stub(jwt, "sign").returns('token_valido');
    const chaiHttpResponse = await chai
      .request(app)
      .post('/users')
      .send({ name: 'Zequinha', email: 'foo@bar.com', password: 'fizzbuzz' })
    expect(chaiHttpResponse.status).to.be.equal(409)
    expect(chaiHttpResponse.body).to.be.deep.equal({ error: "User already registered" })
  })

  // it('is not possible to create an user that already exists', async () => {

  //   chaiHttpResponse = await chai
  //     .request(app)
  //     .post('/login')
  //     .send({ email: 'adm@deliveryapp.com', password: '--adm2@21!!--' })
  //   expect(chaiHttpResponse.status).to.be.equal(200)

  //  chaiHttpResponse = await chai
  //   .request(app)
  //   .post('/users')
  //   .send( { email: 'fulana@deliveryapp.com', name: "Fulana Pereira", password: 'fulana@123' })
  //   expect(chaiHttpResponse.status).to.be.equal(409);
  // })
  // it('is possible to delete an user', async () => {
  //   sinon.stub(JWT, 'sign').returns('token');
  //   chaiHttpResponse = await chai
  //     .request(app)
  //     .post('/login')
  //     .send({ email: 'adm@deliveryapp.com', password: '--adm2@21!!--' })
  //   expect(chaiHttpResponse.status).to.be.equal(200)

  //   sinon.stub(JWT, 'verify').returns('token');
  //  chaiHttpResponse = await chai
  //    .request(app)
  //    .delete('/users')
  //   .send({
  //     "id": "3"
  //   })
  //   expect(chaiHttpResponse.status).to.be.equal(200);
  // })
  // it('is not possible to create an user without a deafult name', async () => {

  //   chaiHttpResponse = await chai
  //     .request(app)
  //     .post('/login')
  //     .send({ email: 'adm@deliveryapp.com', password: '--adm2@21!!--' })
  //   expect(chaiHttpResponse.status).to.be.equal(200)

  //  chaiHttpResponse = await chai
  //   .request(app)
  //   .post('/users')
  //   .send( { email: 'batata545453@gmail.com', name: "", password: '1234567' })
  //   expect(chaiHttpResponse.status).to.be.equal(409);
  // })
})
