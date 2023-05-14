const request = require('supertest');
const app = require('../index');
const router = require('../routes/basket');

describe('Test the basket routes', () => {
  let server;

  beforeAll(() => {
    app.use('/basket', router);
    server = app.listen(3001);
  });

  afterAll((done) => {
    server.close(() => {
      server.unref();
      done();
    });
  });

  test('GET /basket should return 200', async () => {
    const response = await request(app).get('/basket');
    expect(response.statusCode).toBe(200);
  });

  test('GET /basket/:userId should return 200', async () => {
    const response = await request(app).get('/basket/1');
    expect(response.statusCode).toBe(200);
  });

  test('DELETE /basket/:userId should return 200', async () => {
    const response = await request(app).delete('/basket/1');
    expect(response.statusCode).toBe(200);
  });

  test('DELETE /basket/:userId/clear should return 200', async () => {
    const response = await request(app).delete('/basket/1/clear');
    expect(response.statusCode).toBe(200);
  });
});