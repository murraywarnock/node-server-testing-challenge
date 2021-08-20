const db = require('../../data/db-config');
const Car = require('./cars-model');

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

describe('Car db access functions', () => {

  describe('Car.getAll', () => {
    it('resolves to all cars in the cars table', async () => {
      const cars = await Car.getAll();
      expect(cars.length).toBe(3);
      expect(cars).toHaveLength(3);
    });
    it('resolves the the correct car structure', async () => {
      const cars = await Car.getAll();
      expect(cars[0]).toHaveProperty('vin', '1FMZU73K33ZA43437');
      expect(cars[0]).toHaveProperty('make', 'toyota');
      expect(cars[0]).toHaveProperty('model', 'prius');
      expect(cars[0]).toHaveProperty('title', 'clean');
      expect(cars[0]).toHaveProperty('mileage', 25009);
      expect(cars[0]).toHaveProperty('transmission', 'manual');
      expect(cars[1]).toMatchObject({
        vin: "2G1WG5E35D1200283",
        make: "ford",
        model: "focus",
        mileage: 25009,
        title: "clean",
        });
      expect(cars[2]).toMatchObject({
        vin: "1ZVBP8AM4C5220105",
        make: "volkswagon",
        model: "bug",
        mileage: 25009,
        });
    });
    });
});