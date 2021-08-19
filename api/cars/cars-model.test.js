const db = require('../../data/db-config');
const Hobbit = require('./cars-model');

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