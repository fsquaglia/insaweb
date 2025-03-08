import jwt from "jsonwebtoken";

export const generateVerificationToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "30m" });
};
