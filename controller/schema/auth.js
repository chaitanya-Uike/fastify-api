const registerSchema = {
  body: {
    type: "object",
    properties: {
      email: {
        type: "string",
        format: "email",
      },
      username: {
        type: "string",
      },
      password: {
        type: "string",
        minLength: 6,
      },
    },
    required: ["email", "username", "password"],
  },
};

const loginSchema = {
  body: {
    type: "object",
    properties: {
      email: {
        type: "string",
        format: "email",
      },
      password: {
        type: "string",
      },
    },
    required: ["email", "password"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        access_token: {
          type: "string",
        },
        refresh_token: {
          type: "string",
        },
      },
    },
  },
};

const refreshSchema = {
  body: {
    type: "object",
    properties: {
      refresh_token: {
        type: "string",
      },
    },
    required: ["refresh_token"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        access_token: {
          type: "string",
        },
      },
    },
  },
};

module.exports = { refreshSchema, registerSchema, loginSchema };
