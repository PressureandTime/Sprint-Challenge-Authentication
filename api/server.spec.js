const request = require('supertest');
const server = require('./server');
const db = require('../database/dbConfig');

beforeEach(async () => {
  await db('users').truncate();
});

describe('server', () => {
  it('[POST /login] - should return 201 because request was successful', async () => {
    const expectedStatusCode = 201;

    let response = await request(server)
      .post('/register')
      .send({ username: 'test', password: '123' });
    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body.message).toEqual('User created successfully');

    response = await request(server)
      .post('/login')
      .send({ username: 'test', password: '123' });
    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('Welcome test!');
  });

  it('[POST /register] - should return 201 because request was successful', async () => {
    const expectedStatusCode = 201;

    const response = await request(server)
      .post('/register')
      .send({ username: 'test', password: '123' });
    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body.message).toEqual('User created successfully');
  });
});
