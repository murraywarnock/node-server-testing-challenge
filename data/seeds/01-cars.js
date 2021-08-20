// STRETCH
const cars = [
    {
        vin: "1FMZU73K33ZA43437",
        make: "toyota",
        model: "prius",
        mileage: 25009,
        title: "clean",
        transmission: "manual"
    },{
        vin: "2G1WG5E35D1200283",
        make: "ford",
        model: "focus",
        mileage: 25009,
        title: "clean",
    },{
        vin: "1ZVBP8AM4C5220105",
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
