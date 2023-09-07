import { Sequelize } from "sequelize";

const db = new Sequelize("news-project", "news-web", "123412122729@!", {
  host: "localhost",
  dialect: "mysql",
});

export default db;