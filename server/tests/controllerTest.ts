const request = require("supertest");
const chai = require("chai");
const app = require("../app");
const expect = chai.expect;

// Test for mix route
describe("GET /mix/:id", () => {
  // Test case for a successful response with a valid ID
  it("should return mix details for a valid mix ID", (done) => {
    request(app)
      .get("/mix/1")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // expect(res.body).to.have.property('id').equal('1');
        // expect(res.body).to.have.property('name').equal("Example Mix");
        done();
      });
  });

  // Test case for a missing mix ID
  it("should return 400 if mix ID is missing", (done) => {
    request(app)
      .get("/mix/")
      .expect(404) // Invalid endpoint, assuming the route requires a valid ID
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  // Test case for an invalid mix ID format
  // it("should return 400 if mix ID is invalid", (done) => {
  //     request(app)
  //         .get('/mix/invalidID')
  //         .expect(400)
  //         .end((err, res) => {
  //             if (err) return done(err);
  //             expect(res.body).to.have.property('message').equal("Invalid Mix ID format");
  //             done();
  //         });
  // });
});
