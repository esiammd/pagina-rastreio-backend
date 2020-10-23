import Knex from "knex";

export async function up(knex: Knex) {
  return Promise.all([
    knex.schema
      .createTable("user_admin", (table) => {
        table.increments("id").primary();

        table.string("username").notNullable();
        table.string("password").notNullable();

        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      .then(function () {
        return knex("user_admin").insert({
          username: process.env.USER_USERNAME,
          password: process.env.USER_PASSWORD,
        });
      }),
  ]);
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("user_admin");
}
