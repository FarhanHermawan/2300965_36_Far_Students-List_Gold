/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("students", function (table) {
    table.increments("id").primary();
    table.string("nim").notNullable();
    table.string("name").notNullable();
    table.string("class").notNullable();
    table.timestamps(true, true);
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("students");
};
