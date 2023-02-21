const fastify = require("fastify")({ logger: true });
const db = require("./models");

const env = process.env.NODE_ENV || "development";
if (env === "development") require("dotenv").config();

const PORT = process.env.port || 5000;

fastify.register(require("@fastify/auth"));
fastify.decorate("verifyJWT", require("./plugins/authorization"));
fastify.register(require("./routes/auth"), { prefix: "/auth" });
fastify.register(require("./routes/tasks"), { prefix: "/tasks" });

const start = async () => {
  try {
    await fastify.listen({ port: PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

db.sequelize
  .sync({ alter: true })
  .then(() => {
    start();
  })
  .catch((err) => {
    console.log("some error occured while connecting to DB", err);
  });
