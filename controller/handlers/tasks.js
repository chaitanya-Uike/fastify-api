const taskService = require("../../services/task");
const HTTPStatus = require("../../lib/HTTPStatus");

async function getAllTasks(request, reply) {
  const tasks = await taskService.getAllTasks();

  reply.status(HTTPStatus.OK.code).send({ tasks });
}

async function getTasksAssignedToAUser(request, reply) {
  const { id } = request.params;
  const tasks = await taskService.getTasksAssignedToAUser(id);

  reply.status(HTTPStatus.OK.code).send({ tasks });
}

async function addTask(request, reply) {
  const { id } = request.user;
  await taskService.addTask(id, request.body.title);

  reply
    .status(HTTPStatus.CREATED.code)
    .send({ message: "task addded successfully" });
}

module.exports = { getAllTasks, getTasksAssignedToAUser, addTask };
