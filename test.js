const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;
const Movie = require('./models/Movie');

describe('Database Connection', () => {
  it('should get all movies', async () => {
    try {
      const movies = await Movie.findAll();
      expect(movies).to.be.an('array');
    } catch (error) {
      console.error('Database connection error:', error.message);
      throw error;
    }
  }).timeout(5000);
});
