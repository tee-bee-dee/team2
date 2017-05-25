var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../app');
var should = chai.should();

chai.use(chaiHttp);

describe('register ', function() {
  describe('GET /register', function() {
    it('should render /register', function(done) {
      chai.request(app)
        .get('/register')
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
    });
	});
});
