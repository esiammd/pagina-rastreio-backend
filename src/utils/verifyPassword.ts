import argon2 from "argon2";

async function verifyPassword(passwordHash: string, password: string) {
  try {
    if (await argon2.verify(passwordHash, password)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}

export default verifyPassword;
