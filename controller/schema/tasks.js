const getAllTasksSchema = {
  response: {
    200: {
      tasks: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
          },
        },
      },
    },
  },
};

const getUsersTasksSchema = {
  params: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
    },
  },
  response: {
    200: {
      tasks: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
          },
        },
      },
    },
  },
};

const addTaskSchema = {
  body: {
    type: "object",
    properties: {
      title: {
        type: "string",
      },
    },
    required: ["title"],
  },
};

module.exports = { getAllTasksSchema, getUsersTasksSchema, addTaskSchema };
