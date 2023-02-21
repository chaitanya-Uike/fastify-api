class ServerError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

class InternalServerError extends ServerError {
  constructor(message) {
    super(500, message || "something went wrong, please try again");
  }
}

class AuthError extends ServerError {
  constructor(message) {
    super(401, message || "Authentication Failed");
  }
}

class NotFoundError extends ServerError {
  constructor(message) {
    super(404, message || "Resource doesn't exist on server");
  }
}

module.exports = { ServerError, AuthError, NotFoundError, InternalServerError };
