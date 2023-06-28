import bcrypt from 'bcrypt'

export const bcryptHashAdapter = (text: string, salt = 8) =>
  bcrypt.hash(text, salt);
