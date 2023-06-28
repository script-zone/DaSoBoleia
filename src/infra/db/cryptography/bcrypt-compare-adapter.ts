import bcrypt from 'bcrypt'

export const bcryptCompareAdapter = (text: string, hash: string) =>
  bcrypt.compare(text, hash)
