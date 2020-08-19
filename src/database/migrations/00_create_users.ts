import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.integer("age").notNullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("users");
}
