import knex from "knex";

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "pagina_rastreio",
    password: "pagina_rastreio",
    database: "pagina_rastreio",
  },
});

export default db;
