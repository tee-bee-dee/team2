var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../app');
var should = chai.should();

chai.use(chaiHttp);

describe('login ', function() {
  describe('GET /login', function() {
    it('should render /login', function(done) {
      chai.request(app)
        .get('/login')
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
    });
	});
});
