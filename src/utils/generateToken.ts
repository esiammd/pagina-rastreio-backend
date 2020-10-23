import jwt from "jsonwebtoken";
import authConfig from "../config/auth";

function generateToken(params = {}) {
  const { secret, expiresIn } = authConfig.jwt;

  const token = jwt.sign(params, secret, {
    expiresIn,
  });

  return token;
}

export default generateToken;
