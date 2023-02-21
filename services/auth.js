const jwtService = require("./jwt");
const redisService = require("./redis");
const db = require("../models");
const { AuthError } = require("../lib/serverErrors");

class AuthService {
  register({ email, username, password }) {
    return db.User.create({ email, username, password });
  }

  async login({ email, password }) {
    const user = await db.User.findOne({ where: { email } });
    const credentialsError = new AuthError("Invalid Credentials");
    if (!user) throw credentialsError;
    const isPasswordMatching = user.comparePassword(password);
    if (!isPasswordMatching) throw credentialsError;
    const { access_token, refresh_token } = jwtService.generateToken(
      user.id,
      email
    );
    redisService.set(
      refresh_token,
      1,
      parseInt(process.env.REFRESH_TOKEN_EXPIRY, 10)
    );
    return { access_token, refresh_token };
  }

  async refresh(refresh_token) {
    const exists = await redisService.exists(refresh_token);
    const tokenError = new AuthError("Invalid Token");
    if (exists !== 1) throw tokenError;
    const decode = jwtService.verifyRefreshToken(refresh_token);
    if (!decode) throw tokenError;

    const { access_token } = jwtService.generateToken(decode.id, decode.email);

    return access_token;
  }
}

module.exports = new AuthService();
