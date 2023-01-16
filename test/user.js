process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("./../index");

let User = require("./../models/Users");
let db = require("./../config/database");

let should = chai.should();

chai.use(chaiHttp);

describe("GET /api/weather", () => {
  it("It should GET all the chosen cities", (done) => {
    chai
      .request(server)
      .get("/api/weather")
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.a("object");
        //   console.log(response.status);
        done();
      });
  });
});

describe("Registration, Login", function () {
  it("should register user, login user, check token", function (done) {
    chai
      .request(server)

      // register request
      .post("/api/users")

      // send user registration details
      .send({
        name: "PaulOluyege",
        email: "tester@gmail.com",
        password: "tester",
      }) // this is like sending $http.post or this.http.post in Angular
      .end((err, res) => {
        // when we get a resonse from the endpoint

        // in other words,
        // the res object should have a status of 200
        res.should.have.status(200);

        // follow up with login
        chai
          .request(server)
          .post("/api/users/login")
          // send user login details
          .send({
            email: "tester@gmail.com",
            password: "tester",
          })
          .end((err, res) => {
            res.body.should.have.property("token");
            done();
          });
      });
  });
});
