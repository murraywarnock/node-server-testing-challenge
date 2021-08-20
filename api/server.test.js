const request = require('supertest');
const db = require('../data/db-config');
const server = require('./server');

test('it is the correct environment for the tests', () => {
  expect(process.env.DB_ENV).toBe('testing');
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});
afterAll(async () => {
    await db.destroy();
});

describe('[GET] /api/cars', () => {
    it('should return a 200 OK status', async () => {
      const res = await request(server).get('/api/cars');
      expect(res.status).toBe(200);
    });
    it('should return JSON', async () => {
      const res = await request(server).get('/api/cars');
      // console.log(res.header)
      expect(res.type).toBe('application/json');
    });
    it('should return a list of cars', async () => {
      const res = await request(server).get('/api/cars');
      expect(res.body).toHaveLength(3);
    });
});

describe('[POST] /api/cars', () => {
    it('responds with a 422 if no make in payload', async () => {
      const res = await request(server)
      .post('/api/cars')
      .send({
        vin: "1GNLRFEDXAS142337",
        model: "camry",
        mileage: 1234,
        title: "clean",
        transmission: "manual"
    });// json payload
      expect(res.status).toBe(422);
    });
    it('should return a 201 OK status', async () => {
      const res = await request(server)
      .post('/api/cars')
      .send({
        vin: "1GNLRFEDXAS142337",
        make: "toyota",
        model: "camry",
        mileage: 1234,
        title: "clean",
        transmission: "manual"
    });
      expect(res.status).toBe(201);
    });

    it('responds with 422 status for invalid vin', async () => {
        const res = await request(server)
        .post('/api/cars')
        .send({
            vin: "1GNLRFEDXAS142xyz",
            make: "toyota",
            model: "camry",
            mileage: 1234,
            title: "clean",
            transmission: "manual"
        });
        expect(res.status).toBe(422);
        });
    it('should return a 201 OK status', async () => {
      const res = await request(server)
      .post('/api/cars')
      .send({
        vin: "1GNLRFEDXAS142337",
        make: "toyota",
        model: "camry",
        mileage: 1234,
        title: "clean",
        transmission: "manual"
    });
      expect(res.status).toBe(201);
    });

    it('responds with the newly created car', async () => {
      let res = await request(server)
      .post('/api/cars')
      .send({
        vin: "1J4FT48S21L625007",
        make: "toyota",
        model: "camry",
        mileage: 1234,
        title: "clean",
        transmission: "manual"
    });
      expect(res.body).toMatchObject({
        vin: "1J4FT48S21L625007",
        make: "toyota",
        model: "camry",
        mileage: 1234,
        title: "clean",
        transmission: "manual"
    });
      res = await request(server)
      .post('/api/cars')
      .send({
        vin: "1GNLRFEDXAS142337",
        make: "toyota",
        model: "camry",
        mileage: 1234,
        title: "clean",
        transmission: "manual"
    });
      expect(res.body).toMatchObject({
        vin: "1GNLRFEDXAS142337",
        make: "toyota",
        model: "camry",
        mileage: 1234,
        title: "clean",
        transmission: "manual"
    });
    }, 500);
  });

  