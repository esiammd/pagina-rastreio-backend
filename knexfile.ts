import path from "path";

module.exports = {
  client: "pg",
  connection: {
    host: "localhost",
    user: "pagina_rastreio",
    password: "pagina_rastreio",
    database: "pagina_rastreio",
  },
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations"),
  },
};
