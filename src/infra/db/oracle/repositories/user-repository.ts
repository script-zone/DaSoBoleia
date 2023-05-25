import BaseRepository from "./base-repository";

interface UserProps {
  name: string
}

export class UserRepository extends BaseRepository<UserProps> {
  constructor() {
    super('users')
  }

  async all() {
    return this.all()
  }
}
