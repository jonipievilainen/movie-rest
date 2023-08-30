require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Movies API', () => {
  console.log('Testit käynnissä');
  it('should return all movies', (done) => {
    chai.request(process.env.API_URL)
      .get('/movies')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
  
});
