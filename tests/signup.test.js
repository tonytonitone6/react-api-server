const server = require('../server');
const request = require('supertest');

describe('user signup', () => {

  test('should response as expected', async () => {
    const response = await request(server.setTimeout(1000)).post('/v1/userSignup');
    expect(response.status).toEqual(404);
  })
});