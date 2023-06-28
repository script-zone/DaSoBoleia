import jwt from "jsonwebtoken";

export const createTokenJWTAdapter = (payload: string | object) =>
  jwt.sign(payload, `${process.env.JWT_EXPIRES_IN}`, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
