const {
  getAllTasks,
  getTasksAssignedToAUser,
  addTask,
} = require("../controller/handlers/tasks");
const {
  getAllTasksSchema,
  addTaskSchema,
  getUsersTasksSchema,
} = require("../controller/schema/tasks");

module.exports = (fastify, options, done) => {
  fastify.get("/", {
    schema: getAllTasksSchema,
    preHandler: fastify.auth([fastify.verifyJWT]),
    handler: getAllTasks,
  });

  fastify.get("/:id", {
    schema: getUsersTasksSchema,
    preHandler: fastify.auth([fastify.verifyJWT]),
    handler: getTasksAssignedToAUser,
  });

  fastify.post("/addTask", {
    schema: addTaskSchema,
    preHandler: fastify.auth([fastify.verifyJWT]),
    handler: addTask,
  });

  done();
};
