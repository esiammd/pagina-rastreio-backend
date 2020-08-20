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
          username: "admin",
          password:
            "$argon2i$v=19$m=4096,t=3,p=1$t589Bj7QdK6G9QhnX7vQ8w$f/vAV0bnSlfWPXLj8RZFstQT/4Chp6ZUDG23bUtXk0c",
        });
      }),
  ]);
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("user_admin");
}
