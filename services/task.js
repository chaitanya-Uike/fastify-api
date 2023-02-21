const db = require("../models");
const { InternalServerError, NotFoundError } = require("../lib/serverErrors");

class TaskService {
  async getAllTasks() {
    return db.Task.findAll();
  }

  async getTasksAssignedToAUser(userId) {
    const user = await db.User.findByPk(userId, {
      include: "Tasks",
    });

    if (!user) throw new NotFoundError("User not found");

    return user.Tasks;
  }

  async addTask(userId, title) {
    const user = await db.User.findByPk(userId);
    /* 
        the userId will be provided by the controller from the request object
        so if user is not found that means some problem occured while setting
        it in autorizationPlugin
    */
    if (!user) throw new InternalServerError();

    return user.createTask({ title });
  }
}

module.exports = new TaskService();
