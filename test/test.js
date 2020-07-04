const request = require('supertest');
describe('GET /users', function() {
  it('respond with json to get twitter users', function(done) {
    request('http://localhost:5000/api/users')
      .get('/search/:name')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
describe('GET /tweets', function() {
  it('respond with json to get tweets by userId', function(done) {
    request('http://localhost:5000/api/users')
      .get('/558797310')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});