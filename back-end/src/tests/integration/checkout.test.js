// const chai = require("chai");
// const sinon = require("sinon");
// const app = require("../../api/app");
// const chaiHttp = require("chai-http");
// const { expect } = require("chai");
// chai.use(chaiHttp);

// describe('testing checkout endpoint', () => {
//   let chaiHttpResponse;
//   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRG9uYSBUZXJlemEiLCJlbWFpbCI6ImFkbUBob3RtYWlsLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjc1Mjk2Njg1LCJleHAiOjE2NzcwMjQ2ODV9.RDRygMxjKLNVnPj55AUNAG4wjYxd6MLtNBB4Tg67Eis";

//   it('return status 201 if a sale is successfully created', async () => {
//     chaiHttpResponse = await chai
//     .request(app)
//     .post('/customer/checkout')
//     .set('Authorization', token)
//     .send({});

//     expect(chaiHttpResponse.status).to.be.equal(201);
//   });
  
//   it('returns status 200 if sales are retrieved', async () => {
//     chaiHttpResponse = await chai
//     .request(app)
//     .get('/checkout');

//     expect(chaiHttpResponse.status).to.be.equal(200);
//   });

//   it('returns status 200 if status was successfully updated', async () => {
//     chaiHttpResponse = await chai.request(app).put('/checkout/1').send({
//       status: "xablau",
//     });

//     expect(chaiHttpResponse.status).to.be.equal(200);
//   });
// });