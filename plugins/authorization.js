const jwtService = require("../services/jwt");
const { AuthError } = require("../lib/serverErrors");

function verifyJWT(request, reply, done) {
  try {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) throw new AuthError("No authorization token provided");

    const decode = jwtService.verifyAccessToken(token);

    if (!decode) throw new AuthError();

    request.user = { id: decode.id, email: decode.email };

    done();
  } catch (error) {
    done(error);
  }
}

module.exports = verifyJWT;
