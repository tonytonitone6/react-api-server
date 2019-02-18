const request = require('supertest');
const app = require('../server');


test('signup', async () => {
  const serverStart = await request(app);
  // const response = serverStart.post('/v1/userSignup');
  // expect(response.status).toEqual(200);
});