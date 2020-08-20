import argon2 from "argon2";

const verifyPassword = async (passwordHash: string, password: string) => {
  try {
    if (await argon2.verify(passwordHash, password)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return "Error function verifyPassword";
  }
};

export default verifyPassword;
