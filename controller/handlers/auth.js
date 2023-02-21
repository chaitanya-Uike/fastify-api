const authService = require("../../services/auth");
const HTTPStatus = require("../../lib/HTTPStatus");

async function register(request, reply) {
  await authService.register({ ...request.body });
  reply
    .status(HTTPStatus.CREATED.code)
    .send({ messsage: "user created successfully" });
}

async function login(request, reply) {
  const { access_token, refresh_token } = await authService.login({
    ...request.body,
  });

  reply.status(HTTPStatus.OK.code).send({ access_token, refresh_token });
}

async function refresh(request, reply) {
  const { refresh_token } = request.body;
  access_token = await authService.refresh(refresh_token);

  reply.status(HTTPStatus.OK.code).send({ access_token });
}

module.exports = { register, login, refresh };
