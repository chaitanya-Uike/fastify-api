const JWT = require("jsonwebtoken");
class JWTService {
  generateToken(id, email) {
    const access_token = JWT.sign(
      { id, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRY, 10),
      }
    );

    const refresh_token = JWT.sign(
      { id, email },
      process.env.REFRESH_TOKEN_SECRET
    );

    return { access_token, refresh_token };
  }

  verifyAccessToken(token) {
    try {
      return JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      return null;
    }
  }

  verifyRefreshToken(token) {
    try {
      return JWT.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
      return null;
    }
  }
}

module.exports = new JWTService();
