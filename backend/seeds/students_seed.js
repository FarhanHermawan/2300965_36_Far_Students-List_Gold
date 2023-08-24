/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex('students')
    .del()
    .then(function () {
      return knex('students').insert([
        { nim: '022001901077', name: 'Bernando', class: 'A' },
        { nim: '022001901069', name: 'Dimas', class: 'B' },
        { nim: '022001901075', name: 'Farhan Hermawan', class: 'G' },
        { nim: '022001901073', name: 'Ramadika', class: 'F' },
        { nim: '022001901072', name: 'Bian', class: 'A' },
        { nim: '022001901071', name: 'Putu Adi', class: 'B' },
        { nim: '022001901070', name: 'Yudha', class: 'G' },
        { nim: '022001901068', name: 'Rahmat Amin', class: 'F' },
        { nim: '022001901067', name: 'Jonatan Men', class: 'A' },
        { nim: '022001901065', name: 'Amar mahardika', class: 'B' },
        { nim: '022001901064', name: 'Yoanisika', class: 'G' },
        { nim: '022001901063', name: 'Rey Kiyoshi', class: 'F' },
      ]);
    });
};