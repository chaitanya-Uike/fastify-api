const { register, login, refresh } = require("../controller/handlers/auth");
const {
  refreshSchema,
  registerSchema,
  loginSchema,
} = require("../controller/schema/auth");

function authRoute(fastify, options, done) {
  fastify.post("/register", { schema: registerSchema, handler: register });
  fastify.post("/login", { schema: loginSchema, handler: login });
  fastify.post("/refresh", { schema: refreshSchema, handler: refresh });

  done();
}

module.exports = authRoute;
