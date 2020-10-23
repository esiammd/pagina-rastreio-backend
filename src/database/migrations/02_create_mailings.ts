import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("mailings", (table) => {
    table.increments("id").primary();

    table.string("tracking_code").notNullable();
    table.string("product").notNullable();

    table.integer("user_id").notNullable();
    table.foreign("user_id").references("id").inTable("users");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("mailings");
}
