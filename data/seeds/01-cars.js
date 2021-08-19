// STRETCH
const cars = [
    {
        vin: "1234567890121",
        make: "toyota",
        model: "prius",
        mileage: 25009,
        title: "clean",
        transmission: "manual"
    },{
        vin: "1234567890122",
        make: "ford",
        model: "focus",
        mileage: 25009,
        title: "clean",
    },{
        vin: "1234567890123",
        make: "volkswagon",
        model: "bug",
        mileage: 25009,
    },
];

// exports.seed = function(knex) {
//     return knex('cars')
//     .truncate().then(() => {
//         return knex('cars').insert(cars);
//     });
// };

//OR USE async/await

exports.seed = async function(knex) {
    await knex('cars').truncate();
    await knex('cars').insert(cars);
};
